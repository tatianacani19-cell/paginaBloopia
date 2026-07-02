const categoryConfig = {
  babies: {
    displayName: 'Bebés',
    description: 'Todo para el cuidado, comodidad y desarrollo de tu bebé, con la mejor calidad y diseño.',
    heroImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' },
      {
        key: 'coches', label: 'Coches',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Coches para Bebés',
          desc: 'Movilidad con estilo y seguridad para tu pequeño. Encuentra coches paseo, travel systems y más.',
          features: ['Diseño ergonómico', 'Sistema de seguridad', 'Plegable y compacto']
        }
      },
      {
        key: 'montables', label: 'Montables',
        banner: {
          image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80&fm=webp',
          title: 'Juguetes Montables',
          desc: 'Diversión y desarrollo motor con nuestros caballos balancín, triciclos y coches eléctricos.',
          features: ['Estimula el equilibrio', 'Materiales seguros', 'Diseños coloridos']
        }
      },
      {
        key: 'andaderas', label: 'Andaderas y Caminadores',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Andaderas y Caminadores',
          desc: 'Apoya sus primeros pasos con nuestras andaderas musicales y caminadores plegables.',
          features: ['Estimula el gateo', 'Música y luces', 'Plegable']
        }
      },
      {
        key: 'descanso', label: 'Descanso',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Descanso para Bebés',
          desc: 'Cunas colecho, colchones viscoelásticos y sábanas de algodón para el descanso perfecto.',
          features: ['Materiales hipoalergénicos', 'Transpirable', 'Máxima comodidad']
        }
      },
      {
        key: 'maternidad', label: 'Maternidad',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Maternidad',
          desc: 'Cojines de lactancia, sillitas para coche y mochilas portabebés para mayor comodidad.',
          features: ['Ergonómico', 'Fácil de usar', 'Seguridad certificada']
        }
      },
      {
        key: 'seguridad', label: 'Seguridad',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Seguridad Infantil',
          desc: 'Protege a tu bebé con nuestras barras de cuna, protectores de enchufes y seguros para puertas.',
          features: ['Fácil instalación', 'Materiales resistentes', 'Diseño discreto']
        }
      },
      {
        key: 'higiene', label: 'Higiene',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Higiene para Bebés',
          desc: 'Kits de higiene, toallitas húmedas y sets de baño completos para el cuidado diario.',
          features: ['Libre de químicos', 'Hipoalergénico', 'Dermatológicamente probado']
        }
      },
      {
        key: 'juguetes', label: 'Juguetes',
        banner: {
          image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80&fm=webp',
          title: 'Juguetes para Bebés',
          desc: 'Juguetes sensoriales, mordederos y bloques apilables para estimular su desarrollo.',
          features: ['Estimulación temprana', 'Materiales seguros', 'Colores vibrantes']
        }
      },
      {
        key: 'construccion', label: 'Construcción',
        banner: {
          image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80&fm=webp',
          title: 'Construcción',
          desc: 'Bloques de construcción y pistas de tren de madera para horas de diversión creativa.',
          features: ['Desarrolla la creatividad', 'Madera sostenible', 'Piezas seguras']
        }
      },
      {
        key: 'muebles', label: 'Muebles',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Muebles Infantiles',
          desc: 'Cunas cama, cambiadores plegables y estantes para juguetes. Muebles diseñados para crecer con ellos.',
          features: ['Diseño funcional', 'Materiales resistentes', 'Fácil montaje']
        }
      },
      {
        key: 'comederos', label: 'Comederos',
        banner: {
          image: 'https://images.unsplash.com/photo-1593359677879-a4ca92ba5acb?w=800&q=80&fm=webp',
          title: 'Comederos',
          desc: 'Sets de comedor infantil y platos de silicona para la hora de comer.',
          features: ['Silicona de grado alimenticio', 'Antideslizante', 'Fácil de limpiar']
        }
      }
    ]
  }
};

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

let currentCategory = 'babies';
let currentSubcategory = 'todos';

function initCategoryPage() {
  const cat = getUrlParam('category') || 'babies';
  currentCategory = cat;

  const config = categoryConfig[cat];
  if (!config) {
    window.location.href = 'index.html';
    return;
  }

  document.title = `BLOOPIA — ${config.displayName}`;
  renderHero(config);
  renderSubcategoryNav(config);
  renderProducts();

  const defaultSub = config.subcategories.find(s => s.key === currentSubcategory) || config.subcategories[0];
  if (defaultSub) activateSubcategory(defaultSub);
}

function renderHero(config) {
  const bg = document.getElementById('catHeroBg');
  const badge = document.getElementById('catHeroBadge');
  const title = document.getElementById('catHeroTitle');
  const desc = document.getElementById('catHeroDesc');

  if (bg) bg.style.backgroundImage = `url('${config.heroImage}')`;
  if (badge) badge.textContent = 'Categoría';
  if (title) title.textContent = config.displayName;
  if (desc) desc.textContent = config.description;
}

function renderSubcategoryNav(config) {
  const track = document.getElementById('subcatTrack');
  if (!track) return;

  track.innerHTML = config.subcategories.map(sub => `
    <button class="subcat-btn${sub.key === currentSubcategory ? ' active' : ''}" data-sub="${sub.key}">
      ${sub.label}
    </button>
  `).join('');

  track.querySelectorAll('.subcat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sub;
      currentSubcategory = key;
      track.querySelectorAll('.subcat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      const subData = config.subcategories.find(s => s.key === key);
      if (subData) activateSubcategory(subData);
      renderProducts();
    });
  });

  initSubcatArrows();
}

function initSubcatArrows() {
  const track = document.getElementById('subcatTrack');
  const leftArrow = document.getElementById('subcatArrowLeft');
  const rightArrow = document.getElementById('subcatArrowRight');
  if (!track || !leftArrow || !rightArrow) return;

  function updateArrows() {
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    leftArrow.classList.toggle('visible', !atStart);
    rightArrow.classList.toggle('visible', !atEnd);
  }

  leftArrow.addEventListener('click', () => {
    track.scrollBy({ left: -280, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    track.scrollBy({ left: 280, behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();
}

function activateSubcategory(subData) {
  const banner = document.getElementById('subcatBanner');
  const bg = document.getElementById('subcatBannerBg');
  const title = document.getElementById('subcatBannerTitle');
  const desc = document.getElementById('subcatBannerDesc');
  const features = document.getElementById('subcatBannerFeatures');

  if (!subData || !subData.banner) {
    if (banner) banner.style.display = 'none';
    return;
  }

  if (banner) banner.style.display = '';
  if (bg) bg.style.backgroundImage = `url('${subData.banner.image}')`;
  if (title) title.textContent = subData.banner.title;
  if (desc) desc.textContent = subData.banner.desc;
  if (features) {
    features.innerHTML = subData.banner.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('');
  }

  if (banner) {
    banner.classList.remove('reveal', 'reveal-up', 'active');
    void banner.offsetWidth;
    banner.classList.add('reveal', 'reveal-up');
    requestAnimationFrame(() => banner.classList.add('active'));
  }
}

function renderProducts() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;

  let filtered;
  if (currentSubcategory === 'todos') {
    filtered = products.filter(p => p.category === currentCategory);
  } else {
    filtered = products.filter(p => p.category === currentCategory && p.subcategory === currentSubcategory);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="cat-empty">
        <i class="fas fa-box-open"></i>
        <p>No hay productos en esta subcategoría</p>
        <span>Pronto tendremos más productos disponibles.</span>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="transition-delay:${i * 80}ms" data-category="${p.category}" data-id="${p.id}">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"${i < 4 ? ' fetchpriority="high"' : ''} class="product-img-default" onerror="this.style.display='none'" />
        ${p.hoverImage ? `<img src="${p.hoverImage}" alt="${p.name}" loading="lazy" decoding="async" class="product-img-hover" onerror="this.style.display='none'" />` : ''}
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
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
      window.location.href = `detalle.html?id=${card.dataset.id}`;
    });
  });

  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
  });

  const label = document.getElementById('productsLabel');
  const pTitle = document.getElementById('productsTitle');
  const pDesc = document.getElementById('productsDesc');

  if (label) label.textContent = 'Productos';
  if (pTitle) {
    const config = categoryConfig[currentCategory];
    const sub = config?.subcategories.find(s => s.key === currentSubcategory);
    const subName = currentSubcategory === 'todos' ? 'Todos' : (sub?.label || '');
    pTitle.textContent = `${subName} — ${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`;
  }
  if (pDesc) {
    pDesc.textContent = currentSubcategory === 'todos'
      ? 'Explora todos nuestros productos para esta categoría.'
      : `Descubre nuestra selección de ${categoryConfig[currentCategory]?.subcategories.find(s => s.key === currentSubcategory)?.label?.toLowerCase() || 'productos'}.`;
  }
}

function initPromoCarousel() {
  const track = document.getElementById('promoCarouselTrack');
  const slides = track?.querySelectorAll('.promo-carousel-slide');
  const dots = document.querySelectorAll('.promo-carousel-dot');
  const prevBtn = document.getElementById('promoCarouselPrev');
  const nextBtn = document.getElementById('promoCarouselNext');
  if (!slides?.length) return;

  let current = 0;
  let interval = null;
  const DELAY = 5000;

  function goTo(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }

  function next() { goTo((current + 1) % slides.length); }
  function prev() { goTo((current - 1 + slides.length) % slides.length); }

  function startAuto() { stopAuto(); interval = setInterval(next, DELAY); }
  function stopAuto() { if (interval) { clearInterval(interval); interval = null; } }
  function restartAuto() { stopAuto(); startAuto(); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (idx !== current) { goTo(idx); restartAuto(); }
    });
  });

  const carousel = document.getElementById('promoCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
  }

  startAuto();
}

document.addEventListener('DOMContentLoaded', async () => {
  initTopBar();
  await productsReady;
  initCategoryPage();
  initPromoCarousel();
});
