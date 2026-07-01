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

function getColorHex(name) {
  const map = {
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
    'negro con rosado': 'linear-gradient(135deg, #f5a0b0 50%, #1a1a1a 50%)',
    'negro con rosa': 'linear-gradient(135deg, #f5a0b0 50%, #1a1a1a 50%)',
    'negro con azul': 'linear-gradient(135deg, #4a5a7a 50%, #1a1a1a 50%)',
    'negro con beige': 'linear-gradient(135deg, #d4c9b0 50%, #1a1a1a 50%)',
    'negro con gris': 'linear-gradient(135deg, #8c8c8c 50%, #1a1a1a 50%)',
    'azul con blanco': 'linear-gradient(135deg, #ffffff 50%, #3b5998 50%)',
    'rojo con negro': 'linear-gradient(135deg, #1a1a1a 50%, #cc3333 50%)',
    'blanco con negro': 'linear-gradient(135deg, #1a1a1a 50%, #ffffff 50%)',
  };
  const key = name.trim().toLowerCase().replace(/\s+/g, ' ');
  return map[key] || '#cccccc';
}

async function loadProductsFromExcel() {
  try {
    const resp = await fetch('BD/Catalogo_Bloopia_Estructurado.xlsx?t=' + Date.now());
    const buffer = await resp.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array' });
    const ws = wb.Sheets['Productos'];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

    const active = rows.filter(r => r.Estado === 'Activo' && r.Nombre);
    const hasColor = active.some(r => r.Color !== undefined && r.Color !== '');

    if (hasColor) {
      const groups = {};
      for (const r of active) {
        const key = `${r.Nombre}|${r.Categoria}|${r.Subcategoria}|${r.Precio}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
      }

      products = Object.values(groups).map((g, i) => {
        const first = g[0];
        const seenImages = [];
        const colors = [];
        let descUno = '', especs = '', envs = '';
        for (const r of g) {
          if (r.Imagen && !seenImages.includes(r.Imagen)) seenImages.push(r.Imagen);
          if (r.Color) {
            if (!colors.find(c => c.name === r.Color)) {
              colors.push({ name: r.Color, hex: getColorHex(r.Color), image: r.Imagen || '' });
            }
          }
          if (!descUno && r.DescripcionUno) descUno = String(r.DescripcionUno);
          if (!especs && r.Especificaciones) especs = String(r.Especificaciones);
          if (!envs && r.Envios) envs = String(r.Envios);
        }
        const images = seenImages.length > 0 ? seenImages : colors.map(c => c.image).filter(Boolean);
        return {
          id: i + 1,
          name: first.Nombre,
          category: normalizeCategory(first.Categoria),
          subcategory: normalizeSubcategory(first.Subcategoria),
          price: Number(first.Precio) || 0,
          originalPrice: null,
          image: images[0] || '',
          hoverImage: images[1] || images[0] || '',
          badge: null,
          images: images,
          colors: colors,
          shortDesc: first.Descripcion || '',
          description: first.Descripcion || '',
          descripcionUno: descUno,
          especificaciones: especs,
          envios: envs,
          specifications: [],
          shipping: '',
        };
      });
    } else {
      products = active.map((r, i) => ({
        id: i + 1,
        name: r.Nombre,
        category: normalizeCategory(r.Categoria),
        subcategory: normalizeSubcategory(r.Subcategoria),
        price: Number(r.Precio) || 0,
        originalPrice: null,
        image: r.Imagen || '',
        hoverImage: '',
        badge: null,
        images: r.Imagen ? [r.Imagen] : [],
        colors: [],
        shortDesc: r.Descripcion || '',
        description: r.Descripcion || '',
        descripcionUno: r.DescripcionUno ? String(r.DescripcionUno) : '',
        especificaciones: r.Especificaciones ? String(r.Especificaciones) : '',
        envios: r.Envios ? String(r.Envios) : '',
        specifications: [],
        shipping: '',
      }));
    }
  } catch (e) {
    console.error('Error al cargar el catálogo desde Excel:', e);
  }
}

productsReady = loadProductsFromExcel();

function getFeaturedProducts() {
  return products.slice(0, 8);
}
