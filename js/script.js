// ========== TOP BAR ==========
function initTopBar() {
  const slideEl = document.getElementById('topBarSlide');
  const prevBtn = document.getElementById('topBarPrev');
  const nextBtn = document.getElementById('topBarNext');
  if (!slideEl) return;

  const phrases = [
    '💜 Innovación para cada espacio de tu vida',
    '🔥 Ofertas todos los días en tecnología, hogar, bebés y más',
    '✨ Envíos seguros a todo el país',
    '📦 Productos de la mejor calidad para tu familia',
    '🎉 Nuevos productos cada semana',
  ];

  let current = 0;

  function animateTo(idx, fromLeft) {
    const next = (idx + phrases.length) % phrases.length;

    slideEl.style.transition = 'none';
    slideEl.style.transform = fromLeft ? 'translateX(-30px)' : 'translateX(30px)';
    slideEl.textContent = phrases[next];

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slideEl.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        slideEl.style.transform = 'translateX(0)';
      });
    });

    current = next;
  }

  slideEl.textContent = phrases[0];

  if (prevBtn) prevBtn.addEventListener('click', () => animateTo(current - 1, true));
  if (nextBtn) nextBtn.addEventListener('click', () => animateTo(current + 1, false));
}

// ========== CART STATE ==========
let cart = JSON.parse(localStorage.getItem('bloopiaCart')) || [];

function saveCart() {
  localStorage.setItem('bloopiaCart', JSON.stringify(cart));
}

const categoryNames = {
  babies: 'Bebés',
  home: 'Hogar',
  kitchen: 'Cocina',
  solar: 'Energía Solar',
  pets: 'Mascotas',
  beauty: 'Belleza',
  entertainment: 'Entretenimiento',
  fitness: 'Fitness',
  tools: 'Herramientas',
  audio: 'Sonido',
  tech: 'Tecnología',
};

function formatPrice(amount) {
  return '$' + Math.round(amount).toLocaleString('es-CO') + ' COP';
}

// ========== RENDER PRODUCTS ==========
function renderProducts(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  if (!items || items.length === 0) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = items.map((p, i) => `
    <div class="product-card reveal-stagger reveal-up" data-category="${p.category}" data-id="${p.id}" style="transition-delay:${i * 80}ms">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"${i < 4 ? ' fetchpriority="high"' : ''} class="product-img-default" onerror="this.style.display='none'" />
        ${p.hoverImage ? `<img src="${p.hoverImage}" alt="${p.name}" loading="lazy" decoding="async" class="product-img-hover" onerror="this.style.display='none'" />` : ''}
        ${p.badge ? `<span class="product-badge ${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name} <span class="product-codigo">${p.codigo || ''}</span></h3>
        <span class="product-category-tag">${categoryNames[p.category] || p.category}</span>
        <span class="product-price">${formatPrice(p.price)}</span>
        <button class="add-to-cart" data-id="${p.id}">
          <i class="fas fa-plus"></i> Agregar al Carrito
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) return;
      const cat = card.dataset.category;
      window.location.href = `detalle.html?id=${card.dataset.id || ''}`;
    });
  });

  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
  });
}

// ========== INIT PRODUCTS ==========
function initProducts() {
  const featured = getFeaturedProducts();
  renderProducts('featuredGrid', featured);
  initFeaturedCarousel();
}

function initFeaturedCarousel() {
  const grid = document.getElementById('featuredGrid');
  const dotsContainer = document.getElementById('featuredDots');
  const hint = document.getElementById('swipeHint');
  if (!grid || !dotsContainer) return;

  const cards = grid.querySelectorAll('.product-card');
  const pages = Math.ceil(cards.length / 2);

  if (pages <= 1) {
    dotsContainer.style.display = 'none';
    if (hint) hint.style.display = 'none';
    return;
  }

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }

  grid.addEventListener('scroll', () => {
    const scrollLeft = grid.scrollLeft;
    const scrollWidth = grid.scrollWidth - grid.clientWidth;
    const progress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;
    const activeIndex = Math.min(Math.round(progress * (pages - 1)), pages - 1);

    if (hint) {
      hint.style.display = activeIndex === 0 ? 'flex' : 'none';
    }

    dotsContainer.querySelectorAll('span').forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  });
}

// ========== CART FUNCTIONS ==========
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showNotification(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// ========== UPDATE CART UI ==========
function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  if (countEl) countEl.textContent = getCartCount();

  if (cart.length === 0) {
    if (itemsEl) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>Tu carrito está vacío</p>
          <span>Agrega algunos productos para empezar</span>
        </div>
      `;
    }
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" decoding="async" />
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-price">${formatPrice(item.price)}</span>
          <div class="cart-item-qty">
            <button onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `).join('');
  }

  if (totalEl) totalEl.textContent = `${formatPrice(getCartTotal())}`;
}

// ========== NOTIFICATION ==========
function showNotification(message) {
  let notif = document.querySelector('.notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'notification';
    document.body.appendChild(notif);
  }
  notif.textContent = message;
  notif.classList.add('show');
  clearTimeout(notif._timeout);
  notif._timeout = setTimeout(() => notif.classList.remove('show'), 2400);
}

// ========== WHATSAPP CHECKOUT ==========
function checkoutWhatsApp() {
  if (cart.length === 0) {
    showNotification('¡Tu carrito está vacío!');
    return;
  }

  const phone = '573102898133';
  let message = '¡Hola! Me gustaría pedir lo siguiente de BLOOPIA:\n\n';

  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} — ${formatPrice(item.price * item.qty)}\n`;
  });

  message += `\nTotal: ${formatPrice(getCartTotal())}`;
  message += '\n\nPor favor confirma disponibilidad y envío. ¡Gracias!';

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ========== NAVBAR SCROLL ==========
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backBtn = document.getElementById('backToTop');
  const current = window.scrollY;

  if (current > 100) {
    navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  if (backBtn) {
    backBtn.classList.toggle('visible', current > 400);
  }

  lastScroll = current;
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const mobMenu = document.getElementById('mobMenu');
const mobOverlay = document.getElementById('mobMenuOverlay');
const mobClose = document.getElementById('mobMenuClose');

function openMobMenu() {
  hamburger?.classList.add('active');
  mobMenu?.classList.add('active');
  mobOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobMenu() {
  hamburger?.classList.remove('active');
  mobMenu?.classList.remove('active');
  mobOverlay?.classList.remove('active');
  document.body.style.overflow = '';
  const catToggle = mobMenu?.querySelector('.mob-cat-toggle');
  const catSection = mobMenu?.querySelector('.mob-menu-categories');
  catToggle?.classList.remove('open');
  catSection?.classList.remove('open');
}

if (hamburger && mobMenu) {
  hamburger.addEventListener('click', () => {
    if (mobMenu.classList.contains('active')) {
      closeMobMenu();
    } else {
      openMobMenu();
    }
  });

  if (mobClose) mobClose.addEventListener('click', closeMobMenu);
  if (mobOverlay) mobOverlay.addEventListener('click', closeMobMenu);

  const catToggle = mobMenu.querySelector('.mob-cat-toggle');
  const catSection = mobMenu.querySelector('.mob-menu-categories');
  if (catToggle && catSection) {
    catToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      catToggle.classList.toggle('open');
      catSection.classList.toggle('open');
    });
  }

  mobMenu.querySelectorAll('a:not(.mob-cat-toggle)').forEach(link => {
    link.addEventListener('click', closeMobMenu);
  });
}

// ========== SEARCH TOGGLE ==========
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

if (searchToggle && searchOverlay) {
  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
      setTimeout(() => searchInput?.focus(), 100);
    }
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
  });
}

// ========== CART SIDEBAR ==========
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');

function openCart() {
  if (!cartSidebar || !cartOverlay) return;
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (!cartSidebar || !cartOverlay) return;
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (cartToggle) cartToggle.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartSidebar?.classList.contains('active')) closeCart();
});

// ========== CHECKOUT BUTTON ==========
document.getElementById('checkoutBtn')?.addEventListener('click', checkoutWhatsApp);

// ========== HERO SLIDER ==========
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  if (!slides.length) return;

  let current = 0;
  let interval = null;
  const DELAY = 5000;

  function goTo(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    current = index;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(next, DELAY);
  }

  function stopAuto() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  function scrollToHero(index) {
    const hs = document.getElementById('heroSlides');
    if (hs && window.innerWidth <= 768) {
      hs.scrollTo({ left: hs.children[index]?.offsetLeft || 0, behavior: 'smooth' });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); scrollToHero(current); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); scrollToHero(current); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (idx !== current) {
        goTo(idx);
        restartAuto();
        scrollToHero(idx);
      }
    });
  });

  const heroSlides = document.getElementById('heroSlides');
  if (heroSlides) {
    heroSlides.addEventListener('scroll', () => {
      if (window.innerWidth > 768) return;
      const slideWidth = heroSlides.children[0]?.offsetWidth || 1;
      const idx = Math.round(heroSlides.scrollLeft / slideWidth);
      if (idx !== current && slides[idx]) {
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        current = idx;
      }
    });
  }

  slides.forEach(slide => {
    slide.style.cursor = 'pointer';
    slide.addEventListener('click', () => {
      const categoriesSection = document.getElementById('categories');
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  startAuto();
}

// ========== PROMO SLIDER ==========
function initPromoSlider() {
  const slides = document.querySelectorAll('.promo-slide');
  const dots = document.querySelectorAll('.promo-dot');
  const prevBtn = document.getElementById('promoPrev');
  const nextBtn = document.getElementById('promoNext');
  if (!slides.length) return;

  let current = 0;
  let interval = null;
  const DELAY = 6000;
  const swipeHint = document.querySelector('.promo-swipe-hint');

  function goTo(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    current = index;
    if (swipeHint) {
      swipeHint.style.display = index === 0 ? 'flex' : 'none';
    }
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(next, DELAY);
  }

  function stopAuto() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (idx !== current) {
        goTo(idx);
        restartAuto();
        const slider = document.getElementById('promoSlides');
        if (slider && window.innerWidth <= 768) {
          slider.scrollTo({ left: slider.children[idx].offsetLeft, behavior: 'smooth' });
        }
      }
    });
  });

  const promoSlider = document.getElementById('promoSlides');
  if (promoSlider) {
    promoSlider.addEventListener('scroll', () => {
      if (window.innerWidth > 768) return;
      const slideWidth = promoSlider.children[0]?.offsetWidth || 1;
      const idx = Math.round(promoSlider.scrollLeft / slideWidth);
      if (idx !== current && slides[idx]) {
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        current = idx;
        if (swipeHint) {
          swipeHint.style.display = idx === 0 ? 'flex' : 'none';
        }
      }
    });
  }

  function scrollToSlide(index) {
    if (promoSlider && window.innerWidth <= 768) {
      promoSlider.scrollTo({ left: promoSlider.children[index].offsetLeft, behavior: 'smooth' });
    }
  }

  const origNext = next;
  next = function() {
    origNext();
    scrollToSlide(current);
  };

  const origPrev = prev;
  prev = function() {
    origPrev();
    scrollToSlide(current);
  };

  startAuto();
}

// ========== HERO CURSOR EFFECT ==========
function initHeroCursor() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const hero = document.getElementById('heroSlider');
  const canvas = document.getElementById('heroCursorCanvas');
  if (!hero || !canvas) return;

  const originalOverlay = 'transparent';
  const ctx = canvas.getContext('2d');
  let mouseX = 0, mouseY = 0;
  let orbX = 0, orbY = 0;
  let spotX = 0, spotY = 0;
  let isInside = false;
  let orbRadius = 6;
  let targetRadius = 6;
  let particles = [];
  let animFrame;

  function getActiveOverlay() {
    const active = hero.querySelector('.hero-slide.active .hero-overlay');
    return active || hero.querySelector('.hero-overlay');
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if (!isInside) {
      orbX = mouseX;
      orbY = mouseY;
      spotX = mouseX;
      spotY = mouseY;
    }
    isInside = true;

    const target = e.target;
    targetRadius = target.closest('.btn, .hero-arrow, .hero-dot') ? 11 : 6;
  });

  hero.addEventListener('mouseleave', () => {
    isInside = false;
    const overlay = getActiveOverlay();
    if (overlay) overlay.style.background = originalOverlay;
  });

  function spawnParticles() {
    if (!isInside) return;
    for (let i = 0; i < 2; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.6;
      particles.push({
        x: orbX, y: orbY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 3 + Math.random() * 4,
        color: Math.random() > 0.5 ? '88,197,175' : '116,112,229'
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isInside && particles.length === 0) {
      animFrame = requestAnimationFrame(draw);
      return;
    }

    orbX = lerp(orbX, mouseX, 0.1);
    orbY = lerp(orbY, mouseY, 0.1);
    orbRadius = lerp(orbRadius, targetRadius, 0.08);

    spotX = lerp(spotX, mouseX, 0.06);
    spotY = lerp(spotY, mouseY, 0.06);
    const overlay = getActiveOverlay();
    if (overlay) {
      overlay.style.background = isInside
        ? `radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(88,197,175,0.35) 0%, rgba(116,112,229,0.2) 30%, rgba(88,197,175,0.08) 55%, transparent 80%)`
        : originalOverlay;
    }

    spawnParticles();

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.018;
      p.vx *= 0.97;
      p.vy *= 0.97;

      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.5})`;
      ctx.fill();
    }

    if (isInside) {
      const glow = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbRadius * 10);
      glow.addColorStop(0, 'rgba(88,197,175,0.25)');
      glow.addColorStop(0.3, 'rgba(116,112,229,0.15)');
      glow.addColorStop(0.6, 'rgba(88,197,175,0.06)');
      glow.addColorStop(1, 'rgba(116,112,229,0)');
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbRadius * 10, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      const orbGrad = ctx.createRadialGradient(
        orbX - orbRadius * 0.25, orbY - orbRadius * 0.25, 0,
        orbX, orbY, orbRadius
      );
      orbGrad.addColorStop(0, 'rgba(88,197,175,0.9)');
      orbGrad.addColorStop(0.4, 'rgba(116,112,229,0.7)');
      orbGrad.addColorStop(1, 'rgba(88,197,175,0.05)');
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
      ctx.fillStyle = orbGrad;
      ctx.fill();
    }

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

// ========== BACK TO TOP ==========
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== TRUST CAROUSEL ==========
function initTrustCarousel() {
  const track = document.getElementById('trustGrid');
  const dots = document.querySelectorAll('.trust-dot');
  const cards = track?.querySelectorAll('.trust-card');
  if (!track || !cards?.length) return;

  let current = 0;

  function syncFromScroll() {
    const idx = Math.round(track.scrollLeft / track.offsetWidth);
    if (idx === current) return;
    current = idx;
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function goTo(index) {
    current = index;
    cards.forEach((c, i) => c.classList.toggle('active', i === index));
    track.scrollTo({ left: track.offsetWidth * index, behavior: 'smooth' });
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  cards[0].classList.add('active');

  track.addEventListener('scroll', syncFromScroll);

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
  });
}

// ========== ANNOUNCEMENT BAR ==========
function initAnnouncementBar() {
  const bar = document.getElementById('announcementBar');
  const closeBtn = document.getElementById('announcementClose');
  if (!bar || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    bar.classList.add('is-hidden');
    document.documentElement.style.setProperty('--announcement-height', '0px');
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    gestureOrientation: 'vertical',
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}

// ========== CATEGORY HOVER DIMMING ==========
function initCategoryDimming() {
  const isDesktop = () => window.innerWidth >= 1025;
  const cards = document.querySelectorAll('.category-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;
      cards.forEach(c => {
        if (c !== card) c.classList.add('is-dimmed');
      });
    });

    card.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;
      cards.forEach(c => c.classList.remove('is-dimmed'));
    });
  });

  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      cards.forEach(c => c.classList.remove('is-dimmed'));
    }
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', async () => {
  initTopBar();
  initSmoothScroll();
  initAnnouncementBar();
  initHeroSlider();
  initHeroCursor();
  initPromoSlider();
  initTrustCarousel();
  await productsReady;
  initProducts();
  updateCartUI();
  initRevealAnimations();
  initCategoryDimming();
  initCounters();
});

// ========== COUNTER ANIMATION ==========
function initCounters() {
  const counters = document.querySelectorAll('.promo-stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();

      function formatNumber(n) {
        return n.toLocaleString('en-US');
      }

      function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        const plusSpan = el.querySelector('.promo-stat-plus');
        const numberText = formatNumber(current);
        if (plusSpan) {
          el.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              node.textContent = numberText;
            }
          });
        } else {
          el.textContent = numberText;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (plusSpan) {
            el.childNodes.forEach((node) => {
              if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = formatNumber(target);
              }
            });
          } else {
            el.textContent = formatNumber(target);
          }
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => observer.observe(el));
}

// ========== REVEAL ANIMATIONS ==========
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('reveal-stagger-children')) {
        el.querySelectorAll(':scope > .reveal-stagger').forEach((child, i) => {
          setTimeout(() => child.classList.add('active'), i * 80);
        });
      }

      el.classList.add('active');
      observer.unobserve(el);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('.reveal:not(.reveal-stagger-children), .reveal-stagger-children').forEach((el) => {
    observer.observe(el);
  });
}
