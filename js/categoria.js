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
  },
  home: {
    displayName: 'Hogar',
    description: 'Transforma tu hogar con organización, estilo y confort. Encuentra todo para hacer de tu casa un espacio único.',
    heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' },
      {
        key: 'organizadores', label: 'Organizadores',
        banner: {
          image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80&fm=webp',
          title: 'Organizadores para el Hogar',
          desc: 'Mantén cada espacio en orden con nuestros organizadores versátiles y funcionales.',
          features: ['Aprovecha el espacio', 'Diseño moderno', 'Fácil de armar']
        }
      },
      {
        key: 'limpieza', label: 'Limpieza',
        banner: {
          image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&q=80&fm=webp',
          title: 'Productos de Limpieza',
          desc: 'Equipa tu hogar con las mejores herramientas para mantenerlo impecable.',
          features: ['Alta eficiencia', 'Fáciles de usar', 'Resultados profesionales']
        }
      },
      {
        key: 'humificadores', label: 'Humificadores',
        banner: {
          image: 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=800&q=80&fm=webp',
          title: 'Humificadores',
          desc: 'Crea un ambiente saludable y confortable con nuestros humidificadores.',
          features: ['Silencioso', 'Fácil limpieza', 'Ideal para cualquier espacio']
        }
      },
      {
        key: 'iluminacion', label: 'Iluminación',
        banner: {
          image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80&fm=webp',
          title: 'Iluminación para el Hogar',
          desc: 'Ambienta cada rincón con nuestra colección de lámparas y luces LED.',
          features: ['Diseño único', 'Ahorro energético', 'Fácil instalación']
        }
      },
      {
        key: 'muebles', label: 'Muebles',
        banner: {
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&fm=webp',
          title: 'Muebles',
          desc: 'Sillas, mesas y escritorios diseñados para brindar comodidad y estilo a tu hogar.',
          features: ['Materiales resistentes', 'Diseño ergonómico', 'Estilo moderno']
        }
      },
      {
        key: 'decoracion', label: 'Decoración y Bienestar',
        banner: {
          image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80&fm=webp',
          title: 'Decoración y Bienestar',
          desc: 'Complementa tu hogar con accesorios que aportan personalidad y confort.',
          features: ['Estilo único', 'Bienestar integral', 'Calidad superior']
        }
      }
    ]
  },
  kitchen: {
    displayName: 'Cocina',
    description: 'Equipa tu cocina con los mejores utensilios, electrodomésticos y accesorios. Prepara platillos increíbles con estilo y funcionalidad.',
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' },
      {
        key: 'herramientas', label: 'Herramientas y Utensilios',
        banner: {
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fm=webp',
          title: 'Herramientas y Utensilios',
          desc: 'Todo lo que necesitas para preparar, cocinar y servir. Cuchillos, ollas, sartenes y más.',
          features: ['Materiales de calidad', 'Diseño funcional', 'Fáciles de limpiar']
        }
      },
      {
        key: 'oster', label: 'Oster',
        banner: {
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fm=webp',
          title: 'Electrodomésticos Oster',
          desc: 'Licuadoras, freidoras de aire, cafeteras y más. La mejor tecnología para tu cocina.',
          features: ['Tecnología de punta', 'Durabilidad garantizada', 'Resultados profesionales']
        }
      }
    ]
  },
  solar: {
    displayName: 'Energía Solar',
    description: 'Aprovecha la energía del sol con nuestros paneles solares, reflectores LED y ventiladores solares. Eficiencia energética para tu hogar.',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' }
    ]
  },
  pets: {
    displayName: 'Mascotas',
    description: 'Todo para la felicidad y bienestar de tu mejor amigo. Alimentación, higiene, paseo, seguridad y cuidado para perros y gatos.',
    heroImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' },
      {
        key: 'alimentacion', label: 'Alimentación',
        banner: {
          image: 'https://images.unsplash.com/photo-1565708097881-bbf62e01cfa4?w=800&q=80&fm=webp',
          title: 'Alimentación para Mascotas',
          desc: 'Comederos inteligentes, fuentes de agua y dispensadores automáticos para la alimentación de tus mascotas.',
          features: ['Automático', 'Fácil de limpiar', 'Materiales seguros']
        }
      },
      {
        key: 'higiene', label: 'Higiene',
        banner: {
          image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80&fm=webp',
          title: 'Higiene para Mascotas',
          desc: 'Cepillos removedores de pelo, kits de peluquería y accesorios de aseo para mantener a tu mascota limpia.',
          features: ['Remueve el pelo', 'Fácil de usar', 'Resultados profesionales']
        }
      },
      {
        key: 'paseo', label: 'Paseo',
        banner: {
          image: 'https://images.unsplash.com/photo-1547203664-375c0e6b1db3?w=800&q=80&fm=webp',
          title: 'Paseo y Transporte',
          desc: 'Correas retráctiles, coches, mochilas y bolsos transportadores para pasear con tu mascota cómodamente.',
          features: ['Cómodo', 'Resistente', 'Seguro']
        }
      },
      {
        key: 'seguridad', label: 'Seguridad',
        banner: {
          image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80&fm=webp',
          title: 'Seguridad para Mascotas',
          desc: 'Cercas, corrales plegables y jaulas portátiles para mantener a tu mascota segura en todo momento.',
          features: ['Fácil instalación', 'Portátil', 'Materiales resistentes']
        }
      },
      {
        key: 'cuidado_gatos', label: 'Cuidado Gatos',
        banner: {
          image: 'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?w=800&q=80&fm=webp',
          title: 'Cuidado para Gatos',
          desc: 'Areneros plegables, tapetes entrenadores y accesorios esenciales para el cuidado de tu gato.',
          features: ['Plegable', 'Antiderrames', 'Fácil limpieza']
        }
      }
    ]
  },
  entertainment: {
    displayName: 'Entretenimiento',
    description: 'Vive experiencias únicas desde la comodidad de tu hogar. Juegos de mesa, vehículos, arte, música y mucho más para toda la familia.',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' },
      {
        key: 'juegos_mesa', label: 'Juegos de Mesa',
        banner: {
          image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80&fm=webp',
          title: 'Juegos de Mesa',
          desc: 'Diviértete en familia con nuestra colección de juegos de mesa, cartas y estrategia para todas las edades.',
          features: ['Diversión garantizada', 'Para toda la familia', 'Desarrolla la mente']
        }
      },
      {
        key: 'vehiculos', label: 'Vehículos',
        banner: {
          image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80&fm=webp',
          title: 'Vehículos',
          desc: 'Autos, motos y vehículos a control remoto para grandes y pequeños. Velocidad y diversión asegurada.',
          features: ['Control remoto', 'Alta velocidad', 'Diseños realistas']
        }
      },
      {
        key: 'arte_creatividad', label: 'Arte y Creatividad',
        banner: {
          image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&fm=webp',
          title: 'Arte y Creatividad',
          desc: 'Libera tu imaginación con sets de arte, manualidades y creatividad para todas las edades.',
          features: ['Estimula la creatividad', 'Materiales seguros', 'Horas de diversión']
        }
      },
      {
        key: 'musica', label: 'Música',
        banner: {
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80&fm=webp',
          title: 'Música',
          desc: 'Instrumentos musicales y accesorios para que descubras y disfrutes del mundo de la música.',
          features: ['Calidad de sonido', 'Fáciles de usar', 'Para principiantes y expertos']
        }
      },
      {
        key: 'roles_imaginacion', label: 'Roles e Imaginación',
        banner: {
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&fm=webp',
          title: 'Roles e Imaginación',
          desc: 'Disfraces, accesorios y juguetes de rol para que los pequeños creen sus propias aventuras.',
          features: ['Fomenta la imaginación', 'Juego creativo', 'Disfraces divertidos']
        }
      },
      {
        key: 'deportivos', label: 'Deportivos',
        banner: {
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&fm=webp',
          title: 'Juguetes Deportivos',
          desc: 'Pelotas, aros y accesorios deportivos para mantenerte activo mientras te diviertes.',
          features: ['Actividad física', 'Coordinación', 'Diversión al aire libre']
        }
      },
      {
        key: 'coleccionables', label: 'Coleccionables',
        banner: {
          image: 'https://images.unsplash.com/photo-1566576912321-b58f8b7e3cfe?w=800&q=80&fm=webp',
          title: 'Coleccionables',
          desc: 'Figuras, muñecos y artículos coleccionables que todo fanático debe tener.',
          features: ['Edición especial', 'Detalles únicos', 'Para coleccionistas']
        }
      },
      {
        key: 'construccion', label: 'Construcción',
        banner: {
          image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80&fm=webp',
          title: 'Construcción',
          desc: 'Sets de construcción, bloques y pistas para crear y construir sin límites. Desarrolla habilidades mientras te diviertes.',
          features: ['Estimula la creatividad', 'Piezas ensamblables', 'Horas de construcción']
        }
      }
    ]
  },
  fitness: {
    displayName: 'Fitness',
    description: 'Alcanza tus metas de entrenamiento con equipamiento profesional, pesas, bandas de resistencia y accesorios para cardio, fuerza y yoga.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' },
      {
        key: 'cardio', label: 'Cardio',
        banner: {
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&fm=webp',
          title: 'Cardio',
          desc: 'Equipo cardiovascular para mejorar tu resistencia y quemar calorías de forma eficiente.',
          features: ['Mejora tu condición física', 'Quema calorías', 'Bajo impacto']
        }
      },
      {
        key: 'fuerza', label: 'Fuerza',
        banner: {
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a67?w=800&q=80&fm=webp',
          title: 'Fuerza',
          desc: 'Pesas, mancuernas y equipamiento para desarrollar fuerza y tonificar tus músculos.',
          features: ['Desarrollo muscular', 'Resistencia progresiva', 'Material duradero']
        }
      },
      {
        key: 'abdominales', label: 'Abdominales',
        banner: {
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&fm=webp',
          title: 'Abdominales',
          desc: 'Ruedas abdominales, tablas y accesorios para fortalecer tu core y definir tu abdomen.',
          features: ['Fortalecimiento del core', 'Ejercicios guiados', ' Resultados rápidos']
        }
      },
      {
        key: 'yoga', label: 'Yoga',
        banner: {
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&fm=webp',
          title: 'Yoga y Flexibilidad',
          desc: 'Mat, bloques y accesorios para tu práctica de yoga y estiramientos diarios.',
          features: ['Flexibilidad', 'Relajación', 'Bienestar integral']
        }
      },
      {
        key: 'resistencia', label: 'Resistencia',
        banner: {
          image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&fm=webp',
          title: 'Resistencia',
          desc: 'Bandas, ligas y equipos de resistencia para potenciar tu entrenamiento funcional.',
          features: ['Entrenamiento funcional', 'Portátil', 'Versátil']
        }
      },
      {
        key: 'equipamiento', label: 'Equipamiento',
        banner: {
          image: 'https://images.unsplash.com/photo-1571902943202-025ec1bff0f2?w=800&q=80&fm=webp',
          title: 'Equipamiento',
          desc: 'Bancas, soportes y todo el equipamiento necesario para tu gimnasio en casa.',
          features: ['Estabilidad', 'Resistencia', 'Diseño profesional']
        }
      }
    ]
  },
  beauty: {
    displayName: 'Belleza',
    description: 'Resalta tu belleza natural con productos de alta calidad. Cuidado capilar, maquillaje, masajeadores y bienestar para consentirte.',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' },
      {
        key: 'cabello', label: 'Cabello',
        banner: {
          image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80&fm=webp',
          title: 'Cuidado Capilar',
          desc: 'Planchas, cepillos y masajeadores capilares para un cabello saludable y radiante.',
          features: ['Tecnología cerámica', 'Profesional', 'Resultados duraderos']
        }
      },
      {
        key: 'depilacion', label: 'Depilación y Afeitado',
        banner: {
          image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80&fm=webp',
          title: 'Depilación y Afeitado',
          desc: 'Depiladores IPL, afeitadoras y shavers para una piel suave y libre de vello.',
          features: ['Tecnología IPL', 'Precisión', 'Piel suave']
        }
      },
      {
        key: 'espejos', label: 'Espejos',
        banner: {
          image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&q=80&fm=webp',
          title: 'Espejos de Belleza',
          desc: 'Espejos con luz LED y de mano para tu rutina de maquillaje y cuidado personal.',
          features: ['Luz LED integrada', 'Ampliación', 'Diseño elegante']
        }
      },
      {
        key: 'maquillaje', label: 'Maquillaje',
        banner: {
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&fm=webp',
          title: 'Organizadores y Accesorios',
          desc: 'Organizadores acrílicos y limpiadores de brochas para mantener tus herramientas impecables.',
          features: ['Organización', 'Material acrílico', 'Fácil limpieza']
        }
      },
      {
        key: 'masajeadores', label: 'Masajeadores',
        banner: {
          image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80&fm=webp',
          title: 'Masajeadores',
          desc: 'Masajeadores eléctricos, cojines y ventosas para aliviar tensiones y relajar tu cuerpo.',
          features: ['Multifuncional', 'Relajación profunda', 'Alivio muscular']
        }
      },
      {
        key: 'bienestar', label: 'Bienestar',
        banner: {
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&fm=webp',
          title: 'Bienestar y Salud',
          desc: 'Almohadas ortopédicas, monitores de ultrasonido y accesorios para tu bienestar diario.',
          features: ['Ortopédico', 'Terapéutico', 'Descanso reparador']
        }
      },
      {
        key: 'cuidado_personal', label: 'Cuidado Personal',
        banner: {
          image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80&fm=webp',
          title: 'Cuidado Personal',
          desc: 'Lámparas LED faciales y sets de manicure para tu rutina de cuidado personal.',
          features: ['Tecnología LED', 'Kit completo', 'Uso profesional']
        }
      }
    ]
  },
  tools: {
    displayName: 'Herramientas',
    description: 'Las herramientas perfectas para cada proyecto del hogar. Encuentra calidad, durabilidad y rendimiento en un solo lugar.',
    heroImage: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1200&q=80&fm=webp',
    subcategories: [
      { key: 'todos', label: 'Todos' }
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

  const subParam = getUrlParam('sub');
  currentSubcategory = config.subcategories.find(s => s.key === subParam) ? subParam : 'todos';

  document.title = `BLOOPIA — ${config.displayName}`;
  renderHero(config);
  renderSubcategoryNav(config);
  renderProducts();

  const defaultSub = config.subcategories.find(s => s.key === currentSubcategory) || config.subcategories[0];
  if (defaultSub) activateSubcategory(defaultSub);
  if (subParam && subParam !== 'todos') {
    const activeBtn = document.querySelector(`.subcat-btn[data-sub="${subParam}"]`);
    if (activeBtn) setTimeout(() => activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 100);
  }
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
      window.location.href = `detalle.html?id=${card.dataset.id}&sub=${currentSubcategory}`;
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
