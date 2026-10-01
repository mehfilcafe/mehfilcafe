/**
 * ============================================================================
 * MEHFIL CAFE - SERVICE WORKER (ALL-NETWORK RESILIENCE ENGINE)
 * Offline-first, fast caching, low-data mobile resilience
 * ============================================================================
 */

const CACHE_NAME = 'mehfil-cache-v6';

// Critical core assets to pre-cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/menu-data.js',
  './site.webmanifest',
  './assets/logo.png',
  './assets/favicon.png',
  './assets/entrence-bg-opt.jpg',
  './assets/entrence-bg-mobile-opt.jpg',
  './assets/home-bg.jpg',
  './assets/menu-bg.jpg',
  './assets/ambiance-bg.jpg',
  './assets/contact-bg.jpg',
  './assets/ambience/1.png',
  './assets/ambience/2.png',
  './assets/ambience/3.png',
  './assets/menu/tea.jpg',
  './assets/menu/classic%20fries.jpg',
  './assets/menu/frankie.jpg',
  './assets/menu/sandwich.jpg',
  './assets/menu/milkshakes.jpg',
  './assets/menu/mojito.jpg',
  './assets/menu/ufo-burger.jpg',
  './assets/menu/combo-offers-opt.jpg'
];

// Install Event: Pre-cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use catch on each individual item to avoid one failing resource blocking install
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[Mehfil SW] Pre-cache item skipped: ${url}`, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Smart network caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip chrome-extension or external analytics if any
  if (!url.protocol.startsWith('http')) return;

  // Strategy A: HTML navigation requests (Stale-While-Revalidate with fallback)
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // If network is offline, return cached page or root
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('./index.html') || caches.match('./');
          });
        })
    );
    return;
  }

  // Strategy B: Static assets (CSS, JS, Fonts, Images) - Cache First with Network Fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached immediately; optionally revalidate in background
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        // Cache valid responses for next time
        if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // If image fails and offline, return null or fallback
        if (request.destination === 'image') {
          return caches.match('./assets/logo.png');
        }
        throw err;
      });
    })
  );
});
