let products = [];
let productsReady = null;

const categoryMap = {
  'BEBES': 'babies',
  'HOGAR': 'home',
  'COCINA': 'kitchen',
  'ENERGÍA SOLAR': 'solar',
  'ENERGIA SOLAR': 'solar',
  'MASCOTAS': 'pets',
  'BELLEZA': 'beauty',
  'ENTRETENIMIENTO': 'entertainment',
  'FITNESS': 'fitness',
  'HERRAMIENTAS': 'tools',
  'SONIDO': 'audio',
  'TECNOLOGÍA': 'tech',
  'TECNOLOGIA': 'tech',
  'ELECTRODOMÉSTICOS': 'appliances',
  'ELECTRODOMESTICOS': 'appliances',
};

const subcategoryMap = {
  'coches': 'coches',
  'montables': 'montables',
  'andaderas y caminadores': 'andaderas',
  'andaderas': 'andaderas',
  'descanso': 'descanso',
  'maternidad': 'maternidad',
  'seguridad': 'seguridad',
  'higiene': 'higiene',
  'juguetes': 'juguetes',
  'construcción': 'construccion',
  'construccion': 'construccion',
  'muebles': 'muebles',
  'comederos': 'comederos',
  'organizadores': 'organizadores',
  'limpieza': 'limpieza',
  'humificadores': 'humificadores',
  'iluminación': 'iluminacion',
  'iluminacion': 'iluminacion',
  'decoración y bienestar': 'decoracion',
  'decoracion y bienestar': 'decoracion',
  'herramientas y utensilios': 'herramientas',
  'oster': 'oster',
  'alimentación': 'alimentacion',
  'alimentacion': 'alimentacion',
  'paseo': 'paseo',
  'cuidado gatos': 'cuidado_gatos',
  'cabello': 'cabello',
  'depilación y afeitado': 'depilacion',
  'depilacion y afeitado': 'depilacion',
  'espejos': 'espejos',
  'maquillaje': 'maquillaje',
  'masajeadores': 'masajeadores',
  'bienestar': 'bienestar',
  'cuidado personal': 'cuidado_personal',
  'juegos de mesa': 'juegos_mesa',
  'vehículos': 'vehiculos',
  'vehiculos': 'vehiculos',
  'arte y creatividad': 'arte_creatividad',
  'música': 'musica',
  'roles e imaginación': 'roles_imaginacion',
  'roles e imaginacion': 'roles_imaginacion',
  'deportivos': 'deportivos',
  'coleccionables': 'coleccionables',
  'cardio': 'cardio',
  'fuerza': 'fuerza',
  'abdominales': 'abdominales',
  'yoga': 'yoga',
  'resistencia': 'resistencia',
  'equipamiento': 'equipamiento',
  'cabinas': 'cabinas',
  'parlantes y barras de sonido': 'parlantes',
  'audio': 'audio',
  'drones y cámaras': 'drones_camaras',
  'tv y streaming': 'tv_streaming',
  'computación': 'computacion',
  'computacion': 'computacion',
  'iluminación y contenido': 'iluminacion_contenido',
  'proyectores': 'proyectores',
  'smartwatch y gadets': 'smartwatch_gadgets',
  'energía y bienestar': 'energia_bienestar',
  'energia y bienestar': 'energia_bienestar',
  'accesorios': 'accesorios',
  'preparación': 'preparacion',
  'preparacion': 'preparacion',
  'cafeteras': 'cafeteras',
  'cocción y hornos': 'coccion_hornos',
  'coccion y hornos': 'coccion_hornos',
  'sanduchera y desayunos': 'sanducheras',
  'sanducheras y desayunos': 'sanducheras',
  'ollas': 'ollas',
  'cubiertos y utensilios': 'cubiertos_utensilios',
};

function normalizeCategory(cat) {
  const key = cat.trim().toUpperCase();
  return categoryMap[key] || key.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
}

function normalizeSubcategory(sub) {
  if (!sub || !sub.trim()) return '';
  const key = sub.trim().toLowerCase();
  return subcategoryMap[key] || key.replace(/[^a-z0-9áéíóúñ]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').replace(/[á]/g, 'a').replace(/[é]/g, 'e').replace(/[í]/g, 'i').replace(/[ó]/g, 'o').replace(/[ú]/g, 'u').replace(/[ñ]/g, 'n');
}

const colorHexMap = {
  'negro': '#1a1a1a',
  'blanco': '#ffffff',
  'rosado': '#f5a0b0',
  'rosa': '#f5a0b0',
  'rosa claro': '#fcc',
  'rojo': '#cc3333',
  'rojo oscuro': '#8b0000',
  'azul': '#3b5998',
  'azul claro': '#a8d8ea',
  'azul oscuro': '#1a2a4a',
  'celeste': '#a8d8ea',
  'gris': '#8c8c8c',
  'gris oscuro': '#4a4a4a',
  'gris claro': '#b0b0b0',
  'plateado': '#c0c0c0',
  'beige': '#d4c9b0',
  'marrón': '#6b3a2a',
  'marron': '#6b3a2a',
  'café': '#6b3a2a',
  'verde': '#4a8c5c',
  'verde claro': '#7ec850',
  'naranja': '#f0a030',
  'amarillo': '#ffd700',
  'dorado': '#c9a94e',
  'vino tinto': '#722f37',
  'purpura': '#800080',
  'púrpura': '#800080',
  'morado': '#800080',
  'violeta': '#8a2be2',
  'lavanda': '#b39eb5',
  'terracota': '#c9663e',
  'crema': '#f5f0eb',
  'vainilla': '#f5e6cc',
  'melocotón': '#ffdab9',
  'menta': '#98ff98',
  'mostaza': '#ffdb58',
  'oliva': '#808000',
  'salmón': '#fa8072',
  'fucsia': '#ff00ff',
  'turquesa': '#40e0d0',
  'coral': '#ff7f50',
  'madera': '#c9a94e',
  'natural': '#c9a94e',
  'multicolor': '#f0a030',
  'transparente': '#f0f0f0',
  'rosado mono': '#f5a0b0',
  'verde rana': '#4a8c5c',
  'beige leon': '#d4c9b0',
  'rosado jirafa': '#f5a0b0',
  'niño': '#3b5998',
  'niña': '#f5a0b0',
  'curuba': '#f7c39c',
};

function getColorHex(name) {
  const key = name.trim().toLowerCase().replace(/\s+/g, ' ');
  const direct = colorHexMap[key];
  if (direct) return direct;

  const parts = key.split(/\s+(?:con|y)\s+/);
  if (parts.length === 2) {
    const c1 = colorHexMap[parts[0]];
    const c2 = colorHexMap[parts[1]];
    if (c1 && c2) return `linear-gradient(135deg, ${c2} 50%, ${c1} 50%)`;
  }

  return '#cccccc';
}

function parseRichText(rStr) {
  if (!rStr) return null;
  const simple = rStr.match(/^<t[^>]*>([\s\S]*)<\/t>$/);
  if (simple) return simple[1];
  let result = '';
  const runRegex = /<r>([\s\S]*?)<\/r>/g;
  let match;
  while ((match = runRegex.exec(rStr)) !== null) {
    const content = match[1];
    const isBold = /<b\s*\/>/.test(content);
    const txtMatch = content.match(/<t[^>]*>([\s\S]*)<\/t>/);
    const txt = txtMatch ? txtMatch[1] : '';
    if (isBold) result += '<strong>' + txt + '</strong>';
    else result += txt;
  }
  return result || null;
}

async function loadProductsFromExcel() {
  try {
    const resp = await fetch('BD/Catalogo_Bloopia_Estructurado.xlsx?t=' + Date.now());
    const buffer = await resp.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array' });
    const ws = wb.Sheets['Productos'];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

    const range = XLSX.utils.decode_range(ws['!ref']);
    const richFields = ['Descripcion', 'DescripcionUno', 'Especificaciones', 'Envios'];
    const headerRow = [];
    for (let C = range.s.c; C <= range.e.c; C++) {
      const addr = XLSX.utils.encode_cell({ r: range.s.r, c: C });
      headerRow.push((ws[addr] || {}).v || '');
    }
    const fieldColIdx = {};
    richFields.forEach(f => { const idx = headerRow.indexOf(f); if (idx >= 0) fieldColIdx[f] = idx; });
    const dataStartRow = range.s.r + 1;
    for (let i = 0; i < rows.length; i++) {
      for (const field of richFields) {
        const colIdx = fieldColIdx[field];
        if (colIdx === undefined) continue;
        const addr = XLSX.utils.encode_cell({ r: dataStartRow + i, c: colIdx });
        const cell = ws[addr];
        if (cell && cell.r) {
          const html = parseRichText(cell.r);
          if (html) rows[i][field] = html;
        }
      }
    }

    const active = rows.filter(r => r.Estado === 'Activo' && r.Nombre);

    const groups = {};
    for (const r of active) {
      const key = `${r.Nombre}|${r.Categoria}|${r.Subcategoria}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    }

    products = Object.values(groups).map((g, i) => {
      const first = g[0];
      const seenImages = [];
      const colors = [];
      const medidaVariants = [];
      let descUno = '', especs = '', envs = '';
      for (const r of g) {
        const normalizedImg = r.Imagen ? r.Imagen.toLowerCase() : '';
        if (normalizedImg && !seenImages.includes(normalizedImg)) seenImages.push(normalizedImg);
        if (r.Color) {
          const existing = colors.find(c => c.name === r.Color);
          if (existing) {
            if (normalizedImg && !existing.images.includes(normalizedImg)) existing.images.push(normalizedImg);
          } else {
            colors.push({ name: r.Color, hex: getColorHex(r.Color), codigo: r.Codigo || '', image: normalizedImg, images: [normalizedImg] });
          }
        }
        if (r.medidas) {
          const existing = medidaVariants.find(v => v.name === r.medidas);
          if (!existing) {
            medidaVariants.push({
              name: r.medidas,
              price: Number(r.Precio) || 0,
              codigo: r.Codigo || ''
            });
          }
        }
        if (!descUno && r.DescripcionUno) descUno = String(r.DescripcionUno);
        if (!especs && r.Especificaciones) especs = String(r.Especificaciones);
        if (!envs && r.Envios) envs = String(r.Envios);
      }
      const images = seenImages.length > 0 ? seenImages : colors.map(c => c.image).filter(Boolean);
      const defaultPrice = medidaVariants.length > 0 ? medidaVariants[0].price : (Number(first.Precio) || 0);
      return {
        id: i + 1,
        codigo: first.Codigo || '',
        name: first.Nombre,
        category: normalizeCategory(first.Categoria),
        subcategory: normalizeSubcategory(first.Subcategoria),
        price: defaultPrice,
        originalPrice: null,
        image: images[0] || '',
        hoverImage: images[1] || images[0] || '',
        badge: null,
        images: images,
        colors: colors,
        medidas: medidaVariants,
        shortDesc: first.Descripcion || '',
        description: first.Descripcion || '',
        descripcionUno: descUno,
        especificaciones: especs,
        envios: envs,
        specifications: [],
        shipping: '',
      };
    });
  } catch (e) {
    console.error('Error al cargar el catálogo desde Excel:', e);
  }
}

productsReady = loadProductsFromExcel();

function getFeaturedProducts() {
  const codes = [
    'BLO-BBY-095', 'BLO-BBY-037', 'BLO-PET-011', 'BLO-BBY-066',
    'BLO-OST-014', 'BLO-OST-013', 'BLO-OST-010', 'BLO-OST-015',
    'BLO-OST-009', 'BLO-OST-011', 'BLO-FTNE-021', 'BLO-FTNE-016'
  ];
  return codes.map(code => products.find(p => p.codigo === code)).filter(Boolean);
}
