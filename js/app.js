/**
 * ============================================================================
 * MEHFIL CAFE - ULTRA-LEVEL ANIMATED INTERACTIVE ENGINE
 * GSAP 3, ScrollTrigger, Cursor Glow, Dynamic Parallax & Native Fallbacks
 * Built for Mehfil Cafe | InnoApp Technologies
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndScroll();
  initDynamicMenu();
  initSectionSlideController();
  initAmbienceCarousel();
  initWhatsAppReservation();
  initMobileNav();
  initEntranceInteractions();
  initScrollProgressBar();
  initCursorGlowFollower();
  initSiteLoader();
  initHighLevelAnimations();
  initResponsiveAnimations();
  initServiceWorker();
  initNetworkStatusMonitor();
});

/* ==========================================================================
   1. HEADER SCROLL & PROGRESS BAR
   ========================================================================== */
function initHeaderAndScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initScrollProgressBar() {
  const progressLine = document.getElementById('scrollProgressLine');
  if (!progressLine) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressLine.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* ==========================================================================
   2. INTERACTIVE CURSOR GLOW FOLLOWER (Ultra Animation)
   ========================================================================== */
function initCursorGlowFollower() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) {
    if (glow) glow.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderGlow);
  }
  requestAnimationFrame(renderGlow);
}

/* ==========================================================================
   3. DYNAMIC MENU RENDERING & SEARCH ENGINE
   ========================================================================== */
function initDynamicMenu() {
  const categoriesRail = document.getElementById('menuCategoriesRail');
  const menuGrid = document.getElementById('menuGrid');
  const searchInput = document.getElementById('menuSearchInput');

  if (!menuGrid || typeof MEHFIL_MENU_DATA === 'undefined') return;

  // Default to 'all' so all menu images are displayed first, or tea-coffee
  let activeCategory = 'all';
  let searchTerm = '';

  // Render Category Tabs
  if (categoriesRail && typeof MEHFIL_CATEGORIES !== 'undefined') {
    categoriesRail.innerHTML = MEHFIL_CATEGORIES.map(cat => {
      const count = cat.id === 'all'
        ? MEHFIL_MENU_DATA.length
        : MEHFIL_MENU_DATA.filter(item => item.category === cat.id).length;

      return `
        <button class="menu-cat-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
          <i class="${cat.icon}"></i>
          <span>${cat.label}</span>
          <small style="opacity: 0.7; font-size: 0.76rem;">(${count})</small>
        </button>
      `;
    }).join('');

    // Category click handler
    categoriesRail.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-cat-btn');
      if (!btn) return;

      if (searchInput) searchInput.value = '';
      searchTerm = '';

      categoriesRail.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      renderMenuItems();
    });
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderMenuItems();
    });
  }

  // Listen to window layout changes
  window.addEventListener('mehfil:layout-change', () => {
    renderMenuItems();
  });

  // Switch to specific category helper
  function switchToCategory(catId) {
    activeCategory = catId;
    if (searchInput) searchInput.value = '';
    searchTerm = '';
    if (categoriesRail) {
      categoriesRail.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
      const targetBtn = categoriesRail.querySelector(`.menu-cat-btn[data-cat="${catId}"]`);
      if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    renderMenuItems();
    const menuSec = document.getElementById('menu');
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Render items function
  function renderMenuItems() {
    const isSearchActive = Boolean(searchTerm);

    // If searching, search across all items
    let filtered = MEHFIL_MENU_DATA.filter(item => {
      const matchesCat = isSearchActive || activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTerm) || 
        item.ingredients.toLowerCase().includes(searchTerm) ||
        (item.badge && item.badge.toLowerCase().includes(searchTerm));
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div class="menu-empty-state">
          <i class="ri-cup-line"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-cream); margin-bottom: 8px;">No Items Found</h3>
          <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 20px;">We couldn't find anything matching "${searchTerm}". Try searching for "Tea", "Fries", "Burgers", "Frankie", "Mojito", or "Combos".</p>
          <button class="btn-secondary" id="resetMenuFilter">View All Categories</button>
        </div>
      `;

      const resetBtn = document.getElementById('resetMenuFilter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          switchToCategory('all');
        });
      }
      return;
    }

    // SCENARIO 1: "ALL ITEMS" SELECTED (Display all menu images in menu section)
    if (activeCategory === 'all' && !isSearchActive) {
      const subCategories = MEHFIL_CATEGORIES.filter(c => c.id !== 'all');

      const showcaseCardsHtml = subCategories.map(cat => {
        const catItemsCount = MEHFIL_MENU_DATA.filter(item => item.category === cat.id).length;

        return `
          <div class="menu-cat-showcase-card" data-category="${cat.id}">
            <div class="menu-cat-showcase-img-wrap">
              <img class="menu-cat-showcase-img" 
                   src="${cat.featuredImage}" 
                   alt="${cat.label} at Mehfil Cafe" 
                   loading="lazy"
                   onerror="this.onerror=null; this.src='assets/menu-bg.jpg';">
              <span class="menu-cat-showcase-badge"><i class="${cat.icon}"></i> ${catItemsCount} Offerings</span>
            </div>
            <div class="menu-cat-showcase-body">
              <h4 class="menu-cat-showcase-title">${cat.label}</h4>
              <p class="menu-cat-showcase-desc">${cat.description}</p>
              <div class="menu-cat-showcase-footer">
                <span>View Ingredients & Menu</span>
                <i class="ri-arrow-right-line"></i>
              </div>
            </div>
          </div>
        `;
      }).join('');

      menuGrid.innerHTML = `
        <div class="menu-all-categories-grid">
          ${showcaseCardsHtml}
        </div>
      `;

      // Attach click listeners to showcase cards
      menuGrid.querySelectorAll('.menu-cat-showcase-card').forEach(card => {
        card.addEventListener('click', () => {
          const targetCat = card.dataset.category;
          if (targetCat) switchToCategory(targetCat);
        });
      });

      // Animate cards smoothly
      if (typeof gsap !== 'undefined' && !document.body.classList.contains('is-loading')) {
        gsap.fromTo('.menu-cat-showcase-card',
          { opacity: 0, y: 18, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
        );
      }
      return;
    }

    // SCENARIO 2: SPECIFIC CATEGORY SELECTED OR SEARCH ACTIVE
    // Left: Single local menu image | Right: Scrollable items list (strictly bounded to image height)
    const activeCatObj = MEHFIL_CATEGORIES.find(c => c.id === activeCategory) || MEHFIL_CATEGORIES[1];
    const cat = isSearchActive
      ? {
          label: `Search Results`,
          icon: "ri-search-2-line",
          tagline: `${filtered.length} Dishes Found`,
          description: `Handcrafted selections matching "${searchTerm}". Prepared fresh with authentic ingredients.`,
          featuredImage: (filtered[0] ? (MEHFIL_CATEGORIES.find(c => c.id === filtered[0].category) || activeCatObj).featuredImage : activeCatObj.featuredImage)
        }
      : activeCatObj;

    // Generate items HTML with allotted price slot & order action
    const itemsHtml = filtered.map(item => {
      const waOrderText = encodeURIComponent(`Hi Mehfil Cafe! I'd like to order or enquire about: *${item.name}*.`);
      const waOrderUrl = `https://wa.me/919790744378?text=${waOrderText}`;
      const isNonVeg = item.diet === 'non-veg';

      return `
        <article class="menu-item-row" data-category="${item.category}">
          <div class="menu-item-indicator">
            <span class="fssai-symbol ${isNonVeg ? 'nonveg' : 'veg'}" title="${isNonVeg ? 'Non-Vegetarian' : 'Vegetarian'}">
              <span class="fssai-core"></span>
            </span>
          </div>
          <div class="menu-item-content">
            <div class="menu-item-headline">
              <h4 class="menu-item-name">${item.name}</h4>
              ${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}
            </div>
            <p class="menu-item-ingredients">
              <span class="ingredients-label">Ingredients:</span> ${item.ingredients}
            </p>
          </div>
          <div class="menu-item-action">
            <a href="${waOrderUrl}" target="_blank" rel="noopener noreferrer" class="btn-item-wa" title="Enquire or Order ${item.name} on WhatsApp">
              <i class="ri-whatsapp-line"></i>
              <span>Enquire</span>
            </a>
          </div>
        </article>
      `;
    }).join('');

    menuGrid.innerHTML = `
      <div class="menu-editorial-layout">
        <!-- Left Side: Single Featured Image for this Subsection -->
        <aside class="menu-featured-pane">
          <div class="menu-featured-card">
            <div class="menu-featured-img-wrap">
              <img class="menu-featured-img" 
                   src="${cat.featuredImage}" 
                   alt="${cat.label} at Mehfil Cafe" 
                   loading="lazy"
                   onerror="this.onerror=null; this.src='assets/menu-bg.jpg';">
              <div class="menu-featured-overlay">
                <span class="menu-featured-tag"><i class="${cat.icon}"></i> ${cat.label}</span>
                <h3 class="menu-featured-title">${cat.tagline}</h3>
                <p class="menu-featured-desc">${cat.description}</p>
              </div>
            </div>
          </div>
        </aside>

        <!-- Right Side: Types of Items / Scrollable Ingredients List -->
        <main class="menu-items-pane">
          <div class="menu-items-header">
            <div class="menu-items-count-badge">
              <i class="${cat.icon}"></i>
              <span>${filtered.length} Offerings</span>
            </div>
            <div class="menu-diet-legend">
              <span class="legend-pill veg">
                <span class="fssai-symbol veg"><span class="fssai-core"></span></span> Veg
              </span>
              <span class="legend-pill nonveg">
                <span class="fssai-symbol nonveg"><span class="fssai-core"></span></span> Non-Veg
              </span>
            </div>
          </div>

          <!-- Internal Scrollable Container (Does Not Extend Past Image Height) -->
          <div class="menu-items-list" id="menuItemsScrollList">
            ${itemsHtml}
          </div>
        </main>
      </div>
    `;

    // Trigger butter-smooth GPU animations
    if (typeof gsap !== 'undefined' && !document.body.classList.contains('is-loading')) {
      const isDesktop = window.innerWidth >= 992;
      gsap.fromTo('.menu-featured-card', 
        { opacity: 0, x: isDesktop ? -18 : 0, y: isDesktop ? 0 : -12 },
        { opacity: 1, x: 0, y: 0, duration: 0.42, ease: 'power2.out' }
      );
      gsap.fromTo('.menu-item-row', 
        { opacity: 0, y: 12, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32, stagger: 0.025, ease: 'power2.out' }
      );
    }
  }

  // Initial render
  renderMenuItems();
}

/* ==========================================================================
   4. SLIDING VIEWPORT & SECTION CONTROLLER
   ========================================================================== */
function initSectionSlideController() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
  const railDots = document.querySelectorAll('.rail-dot');

  // Smooth scroll click handler for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        const mobileDrawer = document.getElementById('mobileNavDrawer');
        if (mobileDrawer) {
          mobileDrawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // IntersectionObserver to highlight active sections on navigation & rail
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        railDots.forEach(dot => {
          if (dot.dataset.target === activeId) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  railDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetSec = document.getElementById(dot.dataset.target);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ==========================================================================
   5. WHATSAPP TABLE RESERVATION BUILDER (WITH ANTI-XSS SANITIZATION)
   ========================================================================== */
function initWhatsAppReservation() {
  const form = document.getElementById('tableReservationForm');
  if (!form) return;

  function sanitizeInput(val, maxLen = 80) {
    if (!val) return '';
    return String(val)
      .replace(/[<>'"`;(){}[\]\\]/g, '') // Strip script and injection characters
      .trim()
      .slice(0, maxLen);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = sanitizeInput(document.getElementById('resName')?.value, 50) || 'Guest';
    const phone = sanitizeInput(document.getElementById('resPhone')?.value, 20) || 'Not provided';
    const date = sanitizeInput(document.getElementById('resDate')?.value, 20) || 'Today';
    const time = sanitizeInput(document.getElementById('resTime')?.value, 20) || 'Evening';
    const guests = sanitizeInput(document.getElementById('resGuests')?.value, 20) || '2 Guests';
    const seating = sanitizeInput(document.getElementById('resSeating')?.value, 40) || 'Any available table';
    const requests = sanitizeInput(document.getElementById('resNotes')?.value, 150) || 'None';

    const message = 
`*TABLE RESERVATION INQUIRY - MEHFIL CAFE*
---------------------------------------
*Guest Name:* ${name}
*Contact Number:* ${phone}
*Date:* ${date}
*Time:* ${time}
*Number of Guests:* ${guests}
*Seating Preference:* ${seating}
*Special Requests:* ${requests}
---------------------------------------
_Looking forward to spending a peaceful time at Mehfil Cafe!_`;

    const waUrl = `https://wa.me/919790744378?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ==========================================================================
   6. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const drawer = document.getElementById('mobileNavDrawer');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.classList.add('is-active');
    }
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('is-active');
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  // Close mobile drawer on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   7. ENTRANCE & INTERACTIVE COFFEE RIPPLE
   ========================================================================== */
function initEntranceInteractions() {
  const enterBtn = document.getElementById('enterMehfilBtn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      const homeSec = document.getElementById('home');
      if (homeSec) {
        homeSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const entranceSec = document.getElementById('entrance');
  if (entranceSec) {
    entranceSec.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;

      const rect = entranceSec.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createFloatingCoffeeDrop(x, y, entranceSec);
    });
  }
}

function createFloatingCoffeeDrop(x, y, container) {
  const drop = document.createElement('div');
  drop.className = 'interactive-drop-ripple';
  drop.style.left = `${x}px`;
  drop.style.top = `${y}px`;
  container.appendChild(drop);

  setTimeout(() => {
    drop.remove();
  }, 1600);
}

function initSiteLoader() {
  const loader = document.getElementById('siteLoader');
  if (!loader) {
    document.body.classList.remove('is-loading');
    return;
  }

  const revealSite = () => {
    loader.classList.add('is-complete');
    document.body.classList.remove('is-loading');
    window.dispatchEvent(new CustomEvent('mehfil:loader-complete'));

    const removeLoader = () => loader.remove();
    loader.addEventListener('transitionend', removeLoader, { once: true });
    window.setTimeout(removeLoader, 1000);
  };

  window.setTimeout(revealSite, 2000);
}

/* ==========================================================================
   8. ULTRA-LEVEL ANIMATIONS (GSAP 3, PARALLAX & 3D TILT ENGINE)
   ========================================================================== */
function initHighLevelAnimations() {
  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
  const isTablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches;
  const canUsePointerEffects = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)').matches;
  const revealDistance = isDesktop ? 35 : isTablet ? 26 : 18;
  const revealDuration = isDesktop ? 0.85 : 0.65;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Entrance Hero Elements Staggered Timeline
  const entranceTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  const entranceScale = isDesktop ? 1 : 0.72;

  if (!prefersReducedMotion) {
    entranceTl
      .fromTo('.coffee-cup-art', { scale: 0.65, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 * entranceScale })
      .fromTo('.entrance-logo-badge', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 * entranceScale }, '-=0.6')
      .fromTo('.entrance-tagline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 * entranceScale }, '-=0.5')
      .fromTo('.entrance-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 * entranceScale }, '-=0.6')
      .fromTo('.entrance-cta-group', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 * entranceScale }, '-=0.5');
  } else {
    gsap.set(['.coffee-cup-art', '.entrance-logo-badge', '.entrance-tagline', '.entrance-desc', '.entrance-cta-group'], {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: 'filter'
    });
  }

  const playEntranceTimeline = () => entranceTl.play();
  if (document.body.classList.contains('is-loading')) {
    window.addEventListener('mehfil:loader-complete', playEntranceTimeline, { once: true });
  } else {
    entranceTl.play();
  }

  if (!prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
    // 2. Section Titles Scroll Reveal Animation
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.fromTo(title, 
        { opacity: 0, y: revealDistance },
        {
          opacity: 1,
          y: 0,
          duration: revealDuration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // 3. Highlight Boxes Stagger
    gsap.fromTo('.highlight-box',
      { opacity: 0, y: revealDistance, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isDesktop ? 0.65 : 0.5,
        stagger: isDesktop ? 0.15 : 0.08,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.home-highlights-row',
          start: 'top 85%'
        }
      }
    );

    // 4. Ambience Items Reveal
    gsap.fromTo('.ambience-item',
      { opacity: 0, y: revealDistance + 8 },
      {
        opacity: 1,
        y: 0,
        duration: isDesktop ? 0.75 : 0.55,
        stagger: isDesktop ? 0.18 : 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ambience-gallery-grid',
          start: 'top 80%'
        }
      }
    );

    // 5. Parallax Background Shift on Desktop
    if (isDesktop) {
      ['#entrance', '#home', '#menu', '#about', '#contact'].forEach(secId => {
        const sec = document.querySelector(secId);
        if (sec) {
          gsap.to(sec, {
            backgroundPositionY: '35%',
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          });
        }
      });
    }
  }

  // 6. 3D Tilt Effect on Visual Card
  const homeCard = document.querySelector('.home-visual-card');
  if (homeCard && canUsePointerEffects && !prefersReducedMotion) {
    homeCard.addEventListener('mousemove', (e) => {
      const rect = homeCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(homeCard, {
        rotationY: x * 12,
        rotationX: -y * 12,
        transformPerspective: 900,
        ease: 'power1.out',
        duration: 0.4
      });
    });

    homeCard.addEventListener('mouseleave', () => {
      gsap.to(homeCard, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.6
      });
    });
  }

  // 7. Magnetic Pull Physics on Dual Floating Buttons
  const floatingBtns = document.querySelectorAll('.floating-fab-btn');
  floatingBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

/* ==========================================================================
   9. RESPONSIVE ANIMATIONS & RESIZE CONTROLLER
   ========================================================================== */
function initResponsiveAnimations() {
  let resizeTimer;
  let lastWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidth) > 30) {
        lastWidth = currentWidth;
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
        window.dispatchEvent(new CustomEvent('mehfil:layout-change'));
      }
    }, 200);
  }, { passive: true });
}

/* ==========================================================================
   10. SERVICE WORKER & OFFLINE PWA ENGINE
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[Mehfil Cafe] Service Worker registered in scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[Mehfil Cafe] Service Worker registration failed:', err);
        });
    });
  }
}

/* ==========================================================================
   11. REAL-TIME NETWORK STATUS MONITOR
   ========================================================================== */
function initNetworkStatusMonitor() {
  const toast = document.createElement('div');
  toast.className = 'network-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  let hideTimeout;

  function showToast(message, type, icon) {
    clearTimeout(hideTimeout);
    toast.className = `network-toast show ${type}`;
    toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
    hideTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  window.addEventListener('offline', () => {
    showToast("You're currently offline. Mehfil menu & details remain fully accessible.", 'offline', 'ri-wifi-off-line');
  });

  window.addEventListener('online', () => {
    showToast("Back online! WhatsApp enquiries & live tables are active.", 'online', 'ri-wifi-line');
  });
}

/* ==========================================================================
   12. INFINITE LOOPING AMBIENCE CAROUSEL
   Scrollable left-to-right and right-to-left with seamless infinite loop
   ========================================================================== */
function initAmbienceCarousel() {
  const track = document.getElementById('ambienceTrack');
  const viewport = document.getElementById('ambienceViewport');
  const slideNumEl = document.getElementById('ambienceSlideNum');
  const dotsContainer = document.getElementById('ambienceDots');
  const prevBtns = [
    document.getElementById('ambienceHeaderPrev'),
    document.getElementById('ambienceFloatPrev')
  ].filter(Boolean);
  const nextBtns = [
    document.getElementById('ambienceHeaderNext'),
    document.getElementById('ambienceFloatNext')
  ].filter(Boolean);

  if (!track || !viewport) return;

  const slidesData = [
    {
      image: 'assets/ambience/1.png',
      tag: 'The Welcome Facade',
      tagIcon: 'ri-door-open-line',
      title: 'Aesthetic Amber Entrance',
      desc: 'Our signature illuminated emblem and warm hanging lanterns welcome friends and families into an intimate haven.'
    },
    {
      image: 'assets/ambience/2.png',
      tag: 'The Artisan Lounge',
      tagIcon: 'ri-brush-line',
      title: 'Illustrated Coffee Mural',
      desc: 'Hand-painted artistic wall mural, warm amber backlighting, and cozy counter seats made for coffee chats.'
    },
    {
      image: 'assets/ambience/3.png',
      tag: 'Friends & Family Dining',
      tagIcon: 'ri-user-heart-line',
      title: 'Cozy Group Chat Tables',
      desc: 'Wooden dining tables, plush chairs, and uplifting wall art curated for memorable group moments and hearty laughs.'
    }
  ];

  const totalUnique = slidesData.length;
  // Build 3 sets: Set 0 (clones: 0,1,2), Set 1 (core: 3,4,5), Set 2 (clones: 6,7,8)
  const allSlides = [...slidesData, ...slidesData, ...slidesData];

  track.innerHTML = allSlides.map((slide, idx) => {
    const realIdx = idx % totalUnique;
    return `
      <div class="ambience-slide ${idx === 3 ? 'active' : ''}" data-index="${idx}" data-real-index="${realIdx}" role="group" aria-roledescription="slide" aria-label="${realIdx + 1} of ${totalUnique}">
        <div class="ambience-slide-inner">
          <img src="${slide.image}" 
               alt="${slide.title} at Mehfil Cafe" 
               class="ambience-slide-img" 
               loading="${idx >= 3 && idx <= 5 ? 'eager' : 'lazy'}">
          <div class="ambience-slide-overlay">
            <span class="ambience-slide-badge">
              <i class="${slide.tagIcon}"></i> ${slide.tag}
            </span>
            <h3 class="ambience-slide-title">${slide.title}</h3>
            <p class="ambience-slide-desc">${slide.desc}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const slideEls = track.querySelectorAll('.ambience-slide');
  let currentIndex = 3; // Start at first slide of middle set
  let isTransitioning = false;
  let autoplayTimer = null;

  function getTargetOffset(index) {
    if (!slideEls[index]) return 0;
    const viewportWidth = viewport.offsetWidth;
    const slide = slideEls[index];
    const slideWidth = slide.offsetWidth;
    const slideLeft = slide.offsetLeft;
    return (viewportWidth - slideWidth) / 2 - slideLeft;
  }

  function updateActiveState() {
    slideEls.forEach((el, idx) => {
      if (idx === currentIndex) {
        el.classList.add('active');
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.classList.remove('active');
        el.setAttribute('aria-hidden', 'true');
      }
    });

    const realIndex = currentIndex % totalUnique;
    if (slideNumEl) {
      slideNumEl.textContent = `0${realIndex + 1}`;
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.ambience-dot');
      dots.forEach((dot, dIdx) => {
        if (dIdx === realIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }
  }

  function setPosition(animate = true) {
    if (animate) {
      track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }
    const offset = getTargetOffset(currentIndex);
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
    updateActiveState();
  }

  function goToSlide(newIndex, animate = true) {
    if (isTransitioning && animate) return;
    if (animate) isTransitioning = true;
    currentIndex = newIndex;
    setPosition(animate);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1, true);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1, true);
  }

  // Infinite boundary loop normalization on transitionend
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    // Core set is [3, 4, 5]
    if (currentIndex >= 6) {
      currentIndex = 3 + (currentIndex % totalUnique);
      setPosition(false);
    } else if (currentIndex < 3) {
      currentIndex = 5 - ((2 - currentIndex) % totalUnique);
      setPosition(false);
    }
  });

  // Prev / Next button clicks
  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      resetAutoplay();
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      resetAutoplay();
    });
  });

  // Dots click
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.ambience-dot');
      if (!dot) return;
      const targetReal = parseInt(dot.dataset.index, 10);
      goToSlide(3 + targetReal, true);
      resetAutoplay();
    });
  }

  // Click on adjacent peeking slide to center it
  track.addEventListener('click', (e) => {
    if (isDragging) return;
    const slide = e.target.closest('.ambience-slide');
    if (!slide) return;
    const slideIdx = parseInt(slide.dataset.index, 10);
    if (slideIdx !== currentIndex) {
      e.preventDefault();
      goToSlide(slideIdx, true);
      resetAutoplay();
    }
  });

  // Gesture Variables
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentTranslate = 0;
  let diffX = 0;
  let isHorizontalSwipe = null;

  // Touch Handlers
  function onTouchStart(e) {
    if (e.touches.length > 1) return;
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isHorizontalSwipe = null;
    diffX = 0;
    currentTranslate = getTargetOffset(currentIndex);
    track.style.transition = 'none';
    stopAutoplay();
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const dx = currentX - startX;
    const dy = currentY - startY;

    if (isHorizontalSwipe === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
      }
    }

    if (isHorizontalSwipe) {
      if (e.cancelable) e.preventDefault();
      diffX = dx;
      track.style.transform = `translate3d(${currentTranslate + diffX}px, 0, 0)`;
    }
  }

  function onTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (isHorizontalSwipe) {
      track.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1)';
      if (diffX < -45) {
        nextSlide();
      } else if (diffX > 45) {
        prevSlide();
      } else {
        setPosition(true);
      }
    } else {
      setPosition(false);
    }
    diffX = 0;
    isHorizontalSwipe = null;
    startAutoplay();
  }

  viewport.addEventListener('touchstart', onTouchStart, { passive: true });
  viewport.addEventListener('touchmove', onTouchMove, { passive: false });
  viewport.addEventListener('touchend', onTouchEnd, { passive: true });

  // Mouse Drag Handlers
  function onMouseDown(e) {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX;
    diffX = 0;
    currentTranslate = getTargetOffset(currentIndex);
    track.style.transition = 'none';
    viewport.style.cursor = 'grabbing';
    stopAutoplay();
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    diffX = e.clientX - startX;
    track.style.transform = `translate3d(${currentTranslate + diffX}px, 0, 0)`;
  }

  function onMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    viewport.style.cursor = 'grab';
    track.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1)';
    if (diffX < -50) {
      nextSlide();
    } else if (diffX > 50) {
      prevSlide();
    } else {
      setPosition(true);
    }
    diffX = 0;
    startAutoplay();
  }

  viewport.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  // Keyboard navigation
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      resetAutoplay();
    }
  });

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  viewport.addEventListener('mouseenter', stopAutoplay);
  viewport.addEventListener('mouseleave', startAutoplay);

  // Resize and load handlers
  window.addEventListener('resize', () => {
    setPosition(false);
  });

  window.addEventListener('load', () => {
    setPosition(false);
  });

  // Initial layout
  setTimeout(() => {
    setPosition(false);
    startAutoplay();
  }, 120);
}
