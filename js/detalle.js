let currentProduct = null;
let currentColor = null;
let currentQty = 1;

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function initDetailPage() {
  const id = parseInt(getUrlParam('id'));
  if (!id) {
    window.location.href = 'index.html';
    return;
  }

  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) {
    window.location.href = 'index.html';
    return;
  }

  document.title = `BLOOPIA — ${currentProduct.name}`;
  renderBreadcrumb();
  renderGallery();
  renderInfo();
  renderAccordion();
  renderRelated();
}

function renderBreadcrumb() {
  const cat = document.getElementById('detBreadCat');
  const name = document.getElementById('detBreadName');
  if (cat) {
    const catName = categoryNames[currentProduct.category] || currentProduct.category;
    cat.textContent = catName;
    cat.href = `categoria.html?category=${currentProduct.category}`;
  }
  if (name) name.textContent = currentProduct.name;
}

function renderGallery() {
  const mainImg = document.getElementById('detMainImg');
  const thumbs = document.getElementById('detThumbs');
  const zoomBtn = document.getElementById('detZoomBtn');
  if (!mainImg || !thumbs) return;

  const images = currentProduct.images && currentProduct.images.length > 0
    ? currentProduct.images
    : [currentProduct.image];

  mainImg.src = images[0].includes('w=') ? images[0].replace(/w=\d+/, 'w=800') : images[0];
  mainImg.alt = currentProduct.name;

  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => openModal(mainImg.src));
  }

  mainImg.addEventListener('click', () => openModal(mainImg.src));

  thumbs.innerHTML = images.map((img, i) => `
    <div class="det-thumb${i === 0 ? ' active' : ''}" data-index="${i}">
      <img src="${img}" alt="${currentProduct.name}" loading="lazy" decoding="async" />
    </div>
  `).join('');

  const mainImageWrap = document.getElementById('detMainImage');

  // Magnifier lens (desktop only)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice && mainImageWrap) (function initMagnifier() {
    const lens = document.getElementById('detLens');
    const result = document.getElementById('detZoomResult');
    if (!lens || !result) return;

    const ZOOM = 3;

    function moveLens(e) {
      const rect = mainImageWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const lensHalf = lens.offsetWidth / 2;
      let lx = x - lensHalf;
      let ly = y - lensHalf;
      lx = Math.max(0, Math.min(lx, rect.width - lens.offsetWidth));
      ly = Math.max(0, Math.min(ly, rect.height - lens.offsetHeight));

      lens.style.left = (lx + lensHalf) + 'px';
      lens.style.top = (ly + lensHalf) + 'px';

      const cx = lx + lens.offsetWidth / 2;
      const cy = ly + lens.offsetHeight / 2;

      result.style.backgroundImage = `url('${mainImg.src}')`;
      result.style.backgroundSize = `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;
      result.style.backgroundPosition = `-${cx * ZOOM - result.offsetWidth / 2}px -${cy * ZOOM - result.offsetHeight / 2}px`;
      result.classList.add('active');
      lens.style.display = 'block';
    }

    mainImageWrap.addEventListener('mouseenter', () => {
      lens.style.display = 'block';
      result.classList.add('active');
    });

    mainImageWrap.addEventListener('mousemove', moveLens);

    mainImageWrap.addEventListener('mouseleave', () => {
      lens.style.display = 'none';
      result.classList.remove('active');
    });
  })();

  bindThumbClicks();

  // Touch swipe on main image
  if (mainImageWrap) {
    let touchStartX = 0;
    let touchEndX = 0;

    mainImageWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImageWrap.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        const curThumbs = document.getElementById('detThumbs');
        const activeThumb = curThumbs?.querySelector('.det-thumb.active');
        const allThumbs = curThumbs?.querySelectorAll('.det-thumb') || [];
        const idx = activeThumb ? parseInt(activeThumb.dataset.index) : 0;
        if (diff > 0 && idx < allThumbs.length - 1) {
          const nextThumb = curThumbs?.querySelector(`.det-thumb[data-index="${idx + 1}"]`);
          if (nextThumb) nextThumb.click();
        } else if (diff < 0 && idx > 0) {
          const prevThumb = curThumbs?.querySelector(`.det-thumb[data-index="${idx - 1}"]`);
          if (prevThumb) prevThumb.click();
        }
      }
    }, { passive: true });
  }
}

function bindThumbClicks() {
  const thumbs = document.getElementById('detThumbs');
  const mainImg = document.getElementById('detMainImg');
  if (!thumbs || !mainImg) return;
  thumbs.querySelectorAll('.det-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.index);
      thumbs.querySelectorAll('.det-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const imgSrc = thumb.querySelector('img')?.src || '';
      mainImg.src = imgSrc.includes('w=') ? imgSrc.replace(/w=\d+/, 'w=800') : imgSrc;

      // Select corresponding color
      const colors = currentProduct.colors || [];
      const matchedColor = colors.find(c => c.images && c.images.includes(imgSrc));
      if (matchedColor) {
        const colorIdx = colors.indexOf(matchedColor);
        const colorBtns = document.querySelectorAll('.det-color-btn');
        colorBtns.forEach(b => b.classList.remove('active'));
        if (colorBtns[colorIdx]) {
          colorBtns[colorIdx].classList.add('active');
        }
        const colorName = document.getElementById('detColorName');
        if (colorName) colorName.textContent = matchedColor.name;
        currentColor = matchedColor;
      }
    });
  });
}

function renderInfo() {
  const p = currentProduct;

  const badgeWrap = document.getElementById('detBadgeWrap');
  const title = document.getElementById('detTitle');
  const pricing = document.getElementById('detPricing');
  const colorOptions = document.getElementById('detColorOptions');
  const colorName = document.getElementById('detColorName');
  const desc = document.getElementById('detDesc');
  const qtyValue = document.getElementById('detQtyValue');

  if (badgeWrap) {
    badgeWrap.innerHTML = p.badge
      ? `<span class="product-badge">${p.badge}</span>`
      : '';
  }

  if (title) title.textContent = (p.colors && p.colors[0] && p.colors[0].title) || p.name;

  if (pricing) {
    let html = '';
    if (p.originalPrice && p.originalPrice > p.price) {
      html += `<span class="det-original-price">${formatPrice(p.originalPrice)}</span>`;
    }
    html += `<span class="det-current-price">${formatPrice(p.price)}</span>`;
    pricing.innerHTML = html;
  }

  if (colorOptions && colorName) {
    const colors = p.colors || [];
    if (colors.length > 0) {
      currentColor = colors[0];
      colorName.textContent = currentColor.name;
      updateGalleryForColor(currentColor);
      colorOptions.innerHTML = colors.map((c, i) => `
        <button class="det-color-btn${i === 0 ? ' active' : ''}" data-color="${i}"
          style="background:${c.hex}" title="${c.name}">
        </button>
      `).join('');

      function updateGalleryForColor(color) {
        const cImages = color.images && color.images.length > 0 ? color.images : [color.image || currentProduct.image];
        const thumbs = document.getElementById('detThumbs');
        const mainImg = document.getElementById('detMainImg');
        if (!thumbs || !mainImg) return;
        thumbs.innerHTML = cImages.map((img, i) => `
          <div class="det-thumb${i === 0 ? ' active' : ''}" data-index="${i}">
            <img src="${img}" alt="${currentProduct.name}" loading="lazy" decoding="async" />
          </div>
        `).join('');
        mainImg.src = cImages[0].includes('w=') ? cImages[0].replace(/w=\d+/, 'w=800') : cImages[0];
        bindThumbClicks();
      }
      colorOptions.querySelectorAll('.det-color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.color);
          const color = colors[idx];
          if (!color) return;
          currentColor = color;
          colorOptions.querySelectorAll('.det-color-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (colorName) colorName.textContent = color.name;
          const detTitle = document.getElementById('detTitle');
          if (detTitle) detTitle.textContent = color.title || p.name;
          updateGalleryForColor(color);
        });
      });
    } else {
      colorOptions.innerHTML = '<span class="det-no-colors">Color único</span>';
      if (colorName) colorName.textContent = 'Único';
    }
  }

  if (desc) desc.innerHTML = (p.descripcionUno || p.shortDesc || '').replace(/\n/g, '<br>');

  // Qty buttons
  const minusBtn = document.getElementById('detQtyMinus');
  const plusBtn = document.getElementById('detQtyPlus');
  currentQty = 1;
  if (qtyValue) qtyValue.textContent = '1';

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        if (qtyValue) qtyValue.textContent = currentQty;
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      if (currentQty < 99) {
        currentQty++;
        if (qtyValue) qtyValue.textContent = currentQty;
      }
    });
  }

  // Add to cart
  const addBtn = document.getElementById('detAddCart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const existing = cart.find(item => item.id === p.id);
      if (existing) {
        existing.qty += currentQty;
      } else {
        cart.push({ ...p, qty: currentQty });
      }
      saveCart();
      updateCartUI();
      showNotification(`${p.name} agregado al carrito`);
    });
  }
}

function renderAccordion() {
  const p = currentProduct;

  const descEl = document.getElementById('detDescription');
  if (descEl) descEl.innerHTML = (p.description || '').replace(/\n/g, '<br>');

  const specsEl = document.getElementById('detSpecifications');
  if (specsEl) {
    specsEl.innerHTML = (p.especificaciones || '').replace(/\n/g, '<br>');
  }

  const shipEl = document.getElementById('detShipping');
  if (shipEl) shipEl.innerHTML = (p.envios || '').replace(/\n/g, '<br>');

  // Accordion toggle
  document.querySelectorAll('.det-acc-header').forEach(header => {
    header.addEventListener('click', () => {
      const isActive = header.classList.contains('active');
      document.querySelectorAll('.det-acc-header').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.det-acc-body').forEach(b => b.style.maxHeight = '0');

      if (!isActive) {
        header.classList.add('active');
        const body = header.nextElementSibling;
        if (body) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });
  });

  // Open first accordion by default
  const firstHeader = document.querySelector('.det-acc-header');
  if (firstHeader) {
    firstHeader.classList.add('active');
    const firstBody = firstHeader.nextElementSibling;
    if (firstBody) {
      firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }
  }
}

function renderRelated() {
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;

  const related = products.filter(p =>
    p.category === currentProduct.category &&
    p.id !== currentProduct.id
  ).slice(0, 4);

  if (related.length === 0) {
    const section = grid.closest('section');
    if (section) section.style.display = 'none';
    return;
  }

  grid.innerHTML = related.map((p, i) => `
    <div class="product-card reveal-stagger reveal-up" data-id="${p.id}" style="transition-delay:${i * 80}ms">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" class="product-img-default" onerror="this.style.display='none'" />
        ${p.hoverImage ? `<img src="${p.hoverImage}" alt="${p.name}" loading="lazy" decoding="async" class="product-img-hover" onerror="this.style.display='none'" />` : ''}
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
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
}

// ========== IMAGE ZOOM MODAL ==========
let modalCurrentIdx = 0;

function getModalImages() {
  return currentProduct && currentProduct.images && currentProduct.images.length > 0
    ? currentProduct.images
    : (currentProduct ? [currentProduct.image] : []);
}

function openModal(src) {
  const modal = document.getElementById('detModal');
  const modalImg = document.getElementById('detModalImg');
  if (!modal || !modalImg) return;
  const images = getModalImages();
  modalCurrentIdx = images.findIndex(img => img === src);
  if (modalCurrentIdx === -1) modalCurrentIdx = 0;
  modalImg.src = images[modalCurrentIdx];
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateModalArrows();
}

function updateModalArrows() {
  const images = getModalImages();
  const prevBtn = document.getElementById('detModalPrev');
  const nextBtn = document.getElementById('detModalNext');
  if (prevBtn) prevBtn.style.display = modalCurrentIdx > 0 ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = modalCurrentIdx < images.length - 1 ? 'flex' : 'none';
}

function modalPrev() {
  const images = getModalImages();
  if (modalCurrentIdx > 0) {
    modalCurrentIdx--;
    const modalImg = document.getElementById('detModalImg');
    if (modalImg) modalImg.src = images[modalCurrentIdx];
    updateModalArrows();
  }
}

function modalNext() {
  const images = getModalImages();
  if (modalCurrentIdx < images.length - 1) {
    modalCurrentIdx++;
    const modalImg = document.getElementById('detModalImg');
    if (modalImg) modalImg.src = images[modalCurrentIdx];
    updateModalArrows();
  }
}

function closeModal() {
  const modal = document.getElementById('detModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', async () => {
  initTopBar();
  await productsReady;
  initDetailPage();
  updateCartUI();

  const modalClose = document.getElementById('detModalClose');
  const modal = document.getElementById('detModal');
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.getElementById('detModalPrev')?.addEventListener('click', (e) => { e.stopPropagation(); modalPrev(); });
  document.getElementById('detModalNext')?.addEventListener('click', (e) => { e.stopPropagation(); modalNext(); });

  // Touch swipe in modal
  const modalImg = document.getElementById('detModalImg');
  if (modalImg) {
    let modalTouchX = 0;
    modalImg.addEventListener('touchstart', (e) => {
      modalTouchX = e.changedTouches[0].screenX;
    }, { passive: true });
    modalImg.addEventListener('touchend', (e) => {
      const diff = modalTouchX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) modalNext();
        else modalPrev();
      }
    }, { passive: true });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalPrev();
    if (e.key === 'ArrowRight') modalNext();
  });
});
