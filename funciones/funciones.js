document.addEventListener("DOMContentLoaded", iniciarPagina);
 
let indiceSlideActual = 0;
let slides = [];
let dots = [];
let intervaloSlider = null;
const tiempoSlider = 5000;
let paisActual = "argentina"; // Guarda el país activo para el botón volver
 
// ============================================================
//  DATOS DE BODEGAS — toda la info en un objeto central
// ============================================================
const bodegas = {
    // ARGENTINA
    chacra: {
        nombre: "Bodega Chacra",
        region: "Mainqué · Río Negro · Patagonia",
        pais: "argentina",
        logo: "./img/bodegas/chacra.png",
        descripcion: [
            "Fundada en 2004 por Piero Incisa della Rocchetta, nieto del creador de Sassicaia, Bodega Chacra es el referente indiscutido del Pinot Noir en Sudamérica. Sus viñedos sin injertar en el Valle del Río Negro, plantados en 1932 y 1955, producen vinos de pureza extraordinaria bajo principios biodinámicos y orgánicos certificados.",
            "El terroir de Mainqué, con suelos de caliza, arena y arcilla, amplitud térmica extrema y humedad máxima del 30%, genera condiciones únicas que eliminan naturalmente la filoxera y las enfermedades de la vid. Cada cosecha comienza en las primeras horas de la madrugada para aprovechar el frío patagónico, seleccionando únicamente los mejores racimos con mínima intervención humana."
        ],
        tags: ["Pinot Noir", "Chardonnay", "Biodinámico", "Orgánico", "Old Vines"]
    },
    noemia: {
        nombre: "Bodega Noemía",
        region: "Mainqué · Río Negro · Patagonia",
        pais: "argentina",
        logo: "./img/bodegas/noemia.png",
        descripcion: [
            "Nacida de la visión compartida entre la condesa italiana Noemi Marone Cinzano y el enólogo danés Hans Vinding-Diers, Bodega Noemía es uno de los proyectos vinícolas más apasionantes de Argentina. Todo comenzó con el descubrimiento de un viñedo de 1.5 hectáreas plantado en 1932 en Mainqué, Río Negro: viñas sin injertar, de selección massal, certificadas orgánicas y nunca tratadas con químicos.",
            "Sus Malbec, elaborados desde viñedos de hasta 90 años de edad, han alcanzado 98 puntos en Vinous y figuran consistentemente entre los más valorados del mundo. El 85% de su producción se exporta a Estados Unidos, Inglaterra, Canadá y Europa. A 39° de latitud sur, Noemía es una de las bodegas más australes del planeta."
        ],
        tags: ["Malbec", "Old Vines 1932", "Orgánico", "98 pts Vinous"]
    },
    riccitelli: {
        nombre: "Matías Riccitelli Wines",
        region: "Las Compuertas · Luján de Cuyo · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/riccitelli.png",
        descripcion: [
            "Fundada en 2009 por Matías Riccitelli, enólogo de segunda generación nacido en Cafayate, Salta. La bodega se ubica en Las Compuertas, a 1.100 msnm, en la zona más alta del tradicional Luján de Cuyo. Cuenta con viñedos en los mejores terroirs de Mendoza: 20 hectáreas de viñas viejas sin injertar en Las Compuertas, 20 hectáreas en Gualtallary a 1.400 msnm, y parcelas en Chacayes y Altamira.",
            "La filosofía es clara: micro-vinificación, cosecha manual en cajas de 20 kg y fermentación en hormigón para preservar la pureza del terroir. En 2015 extendió el proyecto a la Patagonia, recuperando viñas de los años 50 en Río Negro. En 2025 el Riccitelli Bistró, ubicado en la bodega, fue galardonado con una Estrella Michelin."
        ],
        tags: ["Malbec", "Bonarda", "Old Vines", "Estrella Michelin 2025"]
    },
    padrillos: {
        nombre: "Finca de los Padrillos",
        region: "Valle de Uco · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/padrillos.png",
        descripcion: [
            "Creada por Ernesto Catena, enólogo de cuarta generación de ascendencia italiana, Finca de los Padrillos nació de su pasión por los caballos: más de 30 ejemplares retirados del polo conviven hoy con las vides en sus fincas mendocinas. El nombre 'Padrillos' hace referencia a los sementales, símbolos del espíritu salvaje e indomable del varietal más auténtico de Argentina.",
            "Es la línea de entrada al universo Ernesto Catena: Malbec expresivo, frutal y accesible, elaborado con uvas del Valle de Uco. Refleja la filosofía de Ernesto de convertir cada aspecto del mundo del vino en una obra de arte, desde el viñedo hasta la etiqueta."
        ],
        tags: ["Malbec", "Valle de Uco", "Ernesto Catena"]
    },
    animal: {
        nombre: "Animal Natural Vineyards",
        region: "Vista Flores · Valle de Uco · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/animal.png",
        descripcion: [
            "Animal es la línea orgánica y biodinámica del universo Ernesto Catena. Sus vinos nacen en Tikal Natural Vineyards, finca certificada Demeter desde 2012, ubicada a 1.090 msnm en Vista Flores, al sur de Mendoza, a los pies de los Andes.",
            "La producción se basa en levaduras nativas, vendimia manual, sin uso de agroquímicos y siguiendo los ciclos lunares. Los vinos expresan la conexión con la naturaleza y el terroir andino, con la misma filosofía artística que caracteriza a toda la producción de Ernesto Catena."
        ],
        tags: ["Malbec", "Orgánico", "Biodinámico", "Demeter", "Ernesto Catena"]
    },
    almanegra: {
        nombre: "Domaine Alma Negra",
        region: "Vista Flores · Valle de Uco · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/almanegra.png",
        descripcion: [
            "Alma Negra es el arte del blend de Malbec elevado a su máxima expresión. En lugar de analizar o comparar el vino de forma técnica, Ernesto Catena propone cerrar los ojos y dejarse llevar por los aromas y sabores de las uvas: 'un secreto que se descubre a través de los sentidos.'",
            "Sus cuvées, elaboradas en la finca orgánica y biodinámica de Vista Flores, combinan elegancia y misterio. La etiqueta, con su imagen icónica del caballero oscuro, se ha convertido en un símbolo del vino argentino de autor y en una referencia visual reconocida a nivel mundial."
        ],
        tags: ["Malbec Blend", "Espumante", "Orgánico", "Ernesto Catena"]
    },
    tikal: {
        nombre: "Tikal Natural Vineyards",
        region: "Vista Flores · Valle de Uco · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/tikal.png",
        descripcion: [
            "Tikal Natural Vineyards es el corazón del universo de Ernesto Catena: 48 hectáreas donde el vino, el arte y la espiritualidad conviven en perfecta armonía. Primera bodega biodinámica del Valle de Uco abierta al público y certificada Demeter desde 2012. La finca está inspirada en las culturas Maya e Inca, con edificios de arquitectura precolombina y el laberinto de Malbec más grande del mundo.",
            "La filosofía de Ernesto: 'la perfección no seduce, hay algo interesante en la imperfección que tiene que ver con el carácter y el misterio.' La tierra se trabaja sin agroquímicos, siguiendo los ciclos de la luna y la lógica del alma."
        ],
        tags: ["Malbec", "Biodinámico", "Demeter", "Arte", "Ernesto Catena"]
    },
    siesta: {
        nombre: "Siesta en el Tahuantinsuyu",
        region: "Vista Flores · Valle de Uco · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/siesta.png",
        descripcion: [
            "Siesta en el Tahuantinsuyu es la línea que más profundamente abraza la inspiración en las culturas originarias andinas. El nombre hace referencia al Tahuantinsuyu, el nombre quechua del Imperio Inca, que significa 'las cuatro regiones del mundo.'",
            "Elaborada en la finca orgánica y biodinámica de Vista Flores, esta línea produce varietales como Cabernet Franc y Malbec de gran delicadeza. Las etiquetas, diseñadas por Ernesto Catena con su sensibilidad artística, son piezas de colección que reflejan la conexión entre el vino, la tierra y el universo."
        ],
        tags: ["Cabernet Franc", "Malbec", "Orgánico", "Biodinámico", "Ernesto Catena"]
    },
    tukma: {
        nombre: "Bodega Tukma",
        region: "Cafayate · Valle Calchaquí · Salta",
        pais: "argentina",
        logo: "./img/bodegas/tukma.png",
        descripcion: [
            "Su nombre proviene del vocablo diaguita 'Tukma', que denominaba al cacique de la región del Tukmanao en el noroeste argentino. Fundada en Cafayate con viñedos que se extienden por tres zonas de los Valles Calchaquíes — Tolombón, Angastaco y Huacalera — a alturas que van de 1.700 a 2.670 msnm, es pionera del Torrontés de alta gama en Argentina.",
            "El enólogo principal, José Luis Mounier, se formó junto a Michel Rolland en Pomerol, Francia. La filosofía de Tukma es producir vinos con identidad propia, respetando la historia y las tradiciones de la región, combinándola con técnicas de vinificación de primer nivel."
        ],
        tags: ["Torrontés", "Malbec", "Tannat", "Alta Altura", "Cafayate"]
    },
    perse: {
        nombre: "PerSe Vines",
        region: "Gualtallary · Valle de Uco · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/perse.png",
        descripcion: [
            "Fundada en 2012 por Edgardo del Popolo y David Bonomi, con el objetivo de elaborar vinos de montaña de absoluta pureza. Sus viñedos, plantados en tierras que cultivan junto a los Monjes del Monasterio del Cristo Orante, se ubican a 1.500 msnm en la zona de Gualtallary, con suelos de caliza intensa y granito descompuesto.",
            "Las producciones son ínfimas: el vino más pequeño proviene de apenas 312 vides, equivalente a unas 300 botellas. Vinificación con levaduras nativas y mínima intervención. Sus etiquetas son referentes absolutos del nuevo Malbec argentino de autor, aclamados por la crítica internacional."
        ],
        tags: ["Malbec", "Cabernet Franc", "Gualtallary", "Producción Mínima", "Alta Montaña"]
    },
    escalahumana: {
        nombre: "Escala Humana Wines",
        region: "Gualtallary · Tupungato · Mendoza",
        pais: "argentina",
        logo: "./img/bodegas/escalahumana.png",
        descripcion: [
            "Fundada en 2015 por el matrimonio Ayelén y Germán Massera, Escala Humana nació de una profunda curiosidad por la historia del Valle de Uco y sus lugares y varietales olvidados. Germán se enamoró de viñedos de 4ta y 5ta generación plantados por inmigrantes europeos en el siglo pasado.",
            "La bodega trabaja con variedades poco convencionales en Argentina: Malvasia, Bequignol (varietal del suroeste de Francia), Sangiovese, Semillón de 122 años. Viticultura ecológica, fermentación con levaduras nativas en huevos de concreto, mínima intervención. Una interpretación sensible y genuina del terroir andino."
        ],
        tags: ["Malvasia", "Semillón", "Sangiovese", "Varietales Olvidados", "Ecológico"]
    },
    // CHILE
    demartino: {
        nombre: "De Martino",
        region: "Isla de Maipo · Chile",
        pais: "chile",
        logo: "./img/bodegas/demartino.png",
        descripcion: [
            "Fundada en 1934 por el inmigrante italiano Pietro De Martino en el Valle del Maipo, la bodega es hoy uno de los nombres más progresistas e influyentes de Chile, conducida por la tercera y cuarta generación de la familia. Fue la primera bodega chilena en etiquetar y exportar Carmenère en 1996.",
            "Con vinificación de más de 350 viñedos distintos a lo largo de todo Chile — desde Limarí y Elqui en el norte hasta Itata y Malleco en el sur — De Martino fue también la primera bodega carbono neutral de Sudamérica. Practica viticultura orgánica desde 1998. Premio Bodega del Año 2011, Wines of Chile."
        ],
        tags: ["Carmenère", "Carignan", "Cinsault", "Orgánico", "Carbono Neutral"]
    },
    // ESPAÑA
    cuzcurrita: {
        nombre: "Castillo de Cuzcurrita",
        region: "Rioja Alta · La Rioja · España",
        pais: "espana",
        logo: "./img/bodegas/cuzcurrita.png",
        descripcion: [
            "Una de las bodegas más singulares de Rioja: la bodega y sus viñedos están íntegramente dentro del recinto amurallado de un castillo del siglo XIV en Cuzcurrita de Río Tirón, en la zona más occidental y fría de la Rioja Alta. Los viñedos amurallados —los 'cerrados'— suman 7 hectáreas con cepas de más de 40 años, cultivadas en ecológico desde 2016.",
            "Solo produce 100% Tempranillo, sin mezcla de otras variedades. Todo el movimiento de mosto se realiza por gravedad, sin bombas. Produce únicamente dos vinos: Señorío de Cuzcurrita y Cerrado del Castillo, este último elaborado solo en las mejores añadas con uvas de las parcelas más antiguas del recinto."
        ],
        tags: ["Tempranillo", "100% Ecológico", "Castillo Siglo XIV", "Rioja Alta"]
    },
    // ITALIA
    casenuove: {
        nombre: "Tenuta Casenuove",
        region: "Panzano in Chianti · Toscana · Italia",
        pais: "italia",
        logo: "./img/bodegas/casenuove.png",
        descripcion: [
            "Finca histórica de 120 hectáreas ubicada en el corazón del Chianti Classico DOCG, en Panzano in Chianti, a una altitud de entre 370 y 490 metros. Adquirida en 2015 por Philippe Austruy — también propietario de Château Peyrassol y Château Malescasse — quien inició una profunda renovación del viñedo y la bodega con un equipo joven de talentos locales.",
            "La producción es íntegramente orgánica, vinificada en depósitos de hormigón y guiada por el consultor Stéphane Derenoncourt. El Sangiovese es el varietal principal. Sus etiquetas incluyen el Chianti Classico (90 pts Wine Enthusiast), el Chianti Classico Riserva (93 pts Suckling) y el espumante orgánico Ziik Rosé."
        ],
        tags: ["Sangiovese", "Chianti Classico DOCG", "Orgánico", "93 pts Suckling", "Derenoncourt"]
    },
    // FRANCIA
    peyrassol: {
        nombre: "Château Peyrassol",
        region: "Côtes de Provence · Francia",
        pais: "francia",
        logo: "./img/bodegas/peyrassol.png",
        descripcion: [
            "Con casi 800 años de historia, la Commanderie de Peyrassol es un monumento vivo de Provenza. Fundada por los Caballeros Templarios en 1204, ha producido vino ininterrumpidamente durante siglos. Ubicada en las estribaciones del Massif des Maures, a 15 kilómetros del Mediterráneo entre Cannes y Marsella, cuenta con 95 hectáreas de viñedos sobre suelos arcillo-calcáreos del Triásico.",
            "Desde 2001 bajo la dirección de Philippe Austruy, Peyrassol es hoy una de las referencias mundiales del rosé de Provenza. La cosecha es nocturna para preservar aromática y frescura. Sus rosés han obtenido 92 puntos Robert Parker y figuran en las mejores cartas del mundo."
        ],
        tags: ["Rosé", "Cinsault", "Grenache", "92 pts Parker", "Caballeros Templarios"]
    },
    bonpas: {
        nombre: "Bonpas",
        region: "Côtes-du-Rhône · Aviñón · Francia",
        pais: "francia",
        logo: "./img/bodegas/bonpas.png",
        descripcion: [
            "Desde 1318, la fortaleza de Bonpas — cuyo nombre proviene del francés 'Bon Passage' — ha custodiado el cruce histórico del río Durance, sobre la ruta que unía Roma con Aviñón. Hoy forma parte del grupo Boisset y actúa como puerta de entrada al Côtes-du-Rhône meridional.",
            "Sus vinos, elaborados principalmente con Grenache, Syrah y Mourvèdre, reflejan el carácter mediterráneo del sur del Valle del Ródano: cálidos, especiados, con fruta madura y taninos aterciopelados. La bodega incluye una capilla del siglo XII y jardines históricos."
        ],
        tags: ["Grenache", "Syrah", "Mourvèdre", "Côtes-du-Rhône", "Desde 1318"]
    },
    malescasse: {
        nombre: "Château Malescasse",
        region: "Haut-Médoc · Lamarque · Bordeaux",
        pais: "francia",
        logo: "./img/bodegas/malescasse.png",
        descripcion: [
            "Fundado en 1824 por la familia Renouil, Château Malescasse se encuentra en la localidad de Lamarque, exactamente a mitad de camino entre las apelaciones de Margaux y Saint-Julien. Sus 40 hectáreas de viñedos descansan sobre las famosas colinas de grava del Médoc.",
            "Adquirido en 2012 por Philippe Austruy — también propietario de Peyrassol y Tenuta Casenuove — con el consultor Stéphane Derenoncourt, el château fue completamente renovado. En 2020 obtuvo la distinción de Cru Bourgeois Exceptionnel, una categoría que solo comparten 14 de los 300 châteaux del Haut-Médoc. Sus mejores añadas han alcanzado 97 puntos en Decanter."
        ],
        tags: ["Cabernet Sauvignon", "Merlot", "Petit Verdot", "Cru Bourgeois Exceptionnel", "97 pts Decanter"]
    },
    ramospinto: {
        nombre: "Ramos Pinto",
        region: "Douro · Portugal",
        pais: "portugal",
        logo: "./img/bodegas/ramospinto.png",
        descripcion: [
            "Fundada en 1880 por Adriano Ramos Pinto, es una de las casas históricas más reconocidas de Portugal. Su trabajo en Oporto y en el valle del Douro la convirtió en una referencia internacional por su estilo elegante, consistente y profundamente ligado al territorio.",
            "Hoy su portafolio combina vinos de Oporto y tintos del Douro con una identidad moderna, manteniendo el legado de la casa y una presencia fuerte en mercados internacionales."
        ],
        tags: ["Porto", "Douro", "Portugal", "Casa Histórica"]
    }
};
 
// ============================================================
//  INIT
// ============================================================
function iniciarPagina() {
    const botonesMenu = document.querySelectorAll(".menu-btn");
    const tarjetasNavegacion = document.querySelectorAll(".card-clickable");
    const logo = document.getElementById("btnInicio");
    const botonAnterior = document.getElementById("prevSlide");
    const botonSiguiente = document.getElementById("nextSlide");
 
    botonesMenu.forEach((boton) => {
        boton.addEventListener("click", manejarNavegacion);
    });
 
    tarjetasNavegacion.forEach((tarjeta) => {
        tarjeta.addEventListener("click", manejarNavegacionTarjeta);
    });
 
    if (logo) {
        logo.addEventListener("click", function () {
            mostrarSeccion("inicio");
        });
    }
 
    if (botonAnterior) {
        botonAnterior.addEventListener("click", function () {
            mostrarSlideAnterior();
            reiniciarIntervaloSlider();
        });
    }
 
    if (botonSiguiente) {
        botonSiguiente.addEventListener("click", function () {
            mostrarSlideSiguiente();
            reiniciarIntervaloSlider();
        });
    }
 
    mostrarSeccion("inicio");
    iniciarSliderHero();
    iniciarSidebarPaises();
    iniciarCardsBodegas();
    iniciarFormularioContacto();
    aplicarFondosPaises();
}
 
// ============================================================
//  NAVEGACIÓN GENERAL
// ============================================================
function manejarNavegacion(evento) {
    const seccion = evento.currentTarget.dataset.seccion;
    mostrarSeccion(seccion);
}
 
function manejarNavegacionTarjeta(evento) {
    const seccion = evento.currentTarget.dataset.seccion;
    mostrarSeccion(seccion);
}
 
function mostrarSeccion(idSeccion) {
    const secciones = document.querySelectorAll(".content-section");
    secciones.forEach((seccion) => seccion.classList.remove("active-section"));
 
    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
        seccionActiva.classList.add("active-section");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
 
    // Si navegamos a Productos, reseteamos la ficha de bodega
    if (idSeccion === "productos") {
        ocultarFichaBodega();
    }
}
 
// ============================================================
//  SIDEBAR DE PAÍSES
// ============================================================
function iniciarSidebarPaises() {
    const botonesPais = document.querySelectorAll(".pais-btn");
    const panelesPais = document.querySelectorAll(".pais-panel");
 
    if (botonesPais.length === 0) return;
 
    botonesPais.forEach((boton) => {
        boton.addEventListener("click", function () {
            const pais = boton.dataset.pais;
            paisActual = pais;
 
            // Ocultar ficha si estaba abierta
            ocultarFichaBodega();
 
            // Activar botón
            botonesPais.forEach((b) => b.classList.remove("active"));
            boton.classList.add("active");
 
            // Mostrar panel del país
            panelesPais.forEach((panel) => panel.classList.remove("active"));
            const panelActivo = document.getElementById("pais-" + pais);
            if (panelActivo) panelActivo.classList.add("active");
        });
    });
}
 
// ============================================================
//  CARDS DE BODEGAS → abren ficha inline
// ============================================================
function iniciarCardsBodegas() {
    const cardsBodegas = document.querySelectorAll(".card-bodega");
 
    cardsBodegas.forEach((card) => {
        card.addEventListener("click", function () {
            const idBodega = card.dataset.bodega;
            mostrarFichaBodega(idBodega);
        });
    });
 
    // Botón volver desde ficha
    const btnVolver = document.getElementById("btnVolverPais");
    if (btnVolver) {
        btnVolver.addEventListener("click", function () {
            ocultarFichaBodega();
        });
    }
}
 
function mostrarFichaBodega(idBodega) {
    const bodega = bodegas[idBodega];
    if (!bodega) return;
 
    // Ocultar todos los paneles de países
    document.querySelectorAll(".pais-panel").forEach((panel) => {
        panel.classList.remove("active");
    });
 
    // Construir HTML de la ficha
    const descripcionHTML = bodega.descripcion
        .map((p) => `<p>${p}</p>`)
        .join("");
 
    const tagsHTML = bodega.tags
        .map((tag) => `<span class="ficha-tag">${tag}</span>`)
        .join("");
 
    const fichaContenido = document.getElementById("ficha-bodega-contenido");
    const logoHTML = bodega.logo
        ? `<img src="${bodega.logo}" alt="${bodega.nombre}" class="bodega-ficha-logo-img"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="bodega-ficha-logo-fallback" style="display:none;">${bodega.nombre}</div>`
        : `<div class="bodega-ficha-logo-fallback">${bodega.nombre}</div>`;

    fichaContenido.innerHTML = `
        <div class="bodega-ficha">
            <div class="bodega-ficha-header">
                <div class="bodega-ficha-logo-wrap">
                    ${logoHTML}
                </div>
                <div class="bodega-ficha-titulo">
                    <span class="location-tag">${obtenerNombrePais(bodega.pais)}</span>
                    <h2>${bodega.nombre}</h2>
                    <p class="bodega-ficha-region">${bodega.region}</p>
                </div>
            </div>
            <div class="bodega-ficha-descripcion">
                ${descripcionHTML}
            </div>
            <div class="bodega-ficha-tags">
                ${tagsHTML}
            </div>
        </div>
    `;
 
    // Mostrar panel ficha
    const fichaPanel = document.getElementById("ficha-bodega");
    fichaPanel.style.display = "block";
 
    // Scroll suave al top del contenido
    fichaPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}
 
function ocultarFichaBodega() {
    const fichaPanel = document.getElementById("ficha-bodega");
    if (fichaPanel) fichaPanel.style.display = "none";
 
    // Volver a mostrar el panel del país activo
    const panelActivo = document.getElementById("pais-" + paisActual);
    if (panelActivo) panelActivo.classList.add("active");
}
 
function obtenerNombrePais(id) {
    const nombres = {
        argentina: "Argentina",
        chile: "Chile",
        espana: "España",
        italia: "Italia",
        francia: "Francia",
        portugal: "Portugal"
    };
    return nombres[id] || id;
}
 
// ============================================================
//  SLIDER HERO
// ============================================================
function iniciarSliderHero() {
    slides = document.querySelectorAll(".slide");
    dots = document.querySelectorAll(".slider-dot");
 
    if (slides.length === 0) return;
 
    dots.forEach((dot) => {
        dot.addEventListener("click", function () {
            const indice = parseInt(dot.dataset.slide);
            mostrarSlide(indice);
            reiniciarIntervaloSlider();
        });
    });
 
    mostrarSlide(0);
 
    if (slides.length > 1) {
        intervaloSlider = setInterval(mostrarSlideSiguiente, tiempoSlider);
    }
}
 
function mostrarSlide(indice) {
    slides.forEach((slide) => slide.classList.remove("active-slide"));
    dots.forEach((dot) => dot.classList.remove("active-dot"));
 
    indiceSlideActual = indice;
 
    if (slides[indiceSlideActual]) {
        slides[indiceSlideActual].classList.add("active-slide");
        const img = slides[indiceSlideActual].querySelector(".hero-bg-img");
        if (img) {
            img.style.animation = "none";
            void img.offsetWidth;
            img.style.animation = "";
        }
    }
    if (dots[indiceSlideActual]) dots[indiceSlideActual].classList.add("active-dot");
}
 
function mostrarSlideSiguiente() {
    let nuevoIndice = indiceSlideActual + 1;
    if (nuevoIndice >= slides.length) nuevoIndice = 0;
    mostrarSlide(nuevoIndice);
}
 
function mostrarSlideAnterior() {
    let nuevoIndice = indiceSlideActual - 1;
    if (nuevoIndice < 0) nuevoIndice = slides.length - 1;
    mostrarSlide(nuevoIndice);
}
 
// ============================================================
//  FONDOS DE PANELES POR PAIS
// ============================================================
function aplicarFondosPaises() {
    const overlay = "linear-gradient(160deg, rgba(252,248,242,0.82) 0%, rgba(246,238,229,0.88) 100%)";
    const fondos = {
        "pais-argentina": { img: "./img/bodegas/fotoUva.png", pos: "center 60%" },
        "pais-chile":     { img: "./img/bodegas/fotoUva.png", pos: "center 50%" },
        "pais-espana":    { img: "./img/bodegas/fotoUva.png", pos: "center 55%" },
        "pais-italia":    { img: "./img/bodegas/fotoUva.png", pos: "center 40%" },
        "pais-francia":   { img: "./img/bodegas/fotoUva.png", pos: "center 65%" },
        "pais-portugal":  { img: "./img/bodegas/fotoUva.png", pos: "center 50%" }
    };

    Object.entries(fondos).forEach(function(entry) {
        var id = entry[0], cfg = entry[1];
        var el = document.getElementById(id);
        if (!el) return;
        el.style.background = overlay + ", url('" + cfg.img + "') " + cfg.pos + " / cover no-repeat";
        el.style.borderRadius = "16px";
        el.style.overflow = "hidden";
        el.style.position = "relative";
        el.style.padding = "28px 28px 32px";
    });
}

// ============================================================
//  FORMULARIO CONTACTO
// ============================================================
function iniciarFormularioContacto() {
    const form = document.querySelector(".contact-form");
    if (!form) return;
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const btn = form.querySelector("button[type='submit']");
        btn.textContent = "Enviado ✓";
        btn.disabled = true;
        btn.style.background = "linear-gradient(135deg, #2a7a2a, #3d9c3d)";
        setTimeout(function () {
            form.reset();
            btn.textContent = "Enviar";
            btn.disabled = false;
            btn.style.background = "";
        }, 3500);
    });
}

function reiniciarIntervaloSlider() {
    if (intervaloSlider) clearInterval(intervaloSlider);
    if (slides.length > 1) {
        intervaloSlider = setInterval(mostrarSlideSiguiente, tiempoSlider);
    }
}
