// Sample data for testing the news portal
// This file contains example articles for each category and subcategory

// export const sampleArticles = [
//   // Noticias - Política
//   {
//     id: 'noticia-politica-1',
//     title: 'Nuevas medidas económicas anunciadas por el gobierno',
//     content: '<p>El gobierno ha anunciado hoy un paquete de medidas económicas destinadas a reactivar la economía tras la recesión. Entre las principales medidas se encuentran reducciones fiscales para pequeñas empresas y un plan de inversión en infraestructura.</p><p>El presidente declaró que estas medidas buscan "generar empleo y mejorar la calidad de vida de todos los ciudadanos". La oposición, por su parte, ha criticado el plan por considerarlo insuficiente.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=2342&auto=format&fit=crop',
//     category: 'noticias',
//     subcategory: 'politica',
//     featured: true,
//     createdAt: new Date(2023, 5, 15)
//   },
  
//   // Noticias - Economía
//   {
//     id: 'noticia-economia-1',
//     title: 'La inflación alcanza su nivel más bajo en cinco años',
//     content: '<p>Según los datos publicados hoy por el Instituto Nacional de Estadística, la inflación ha descendido al 1.2%, su nivel más bajo en los últimos cinco años. Este descenso se debe principalmente a la caída de los precios energéticos y a la estabilización del mercado inmobiliario.</p><p>Los analistas consideran que esta tendencia podría mantenerse durante los próximos meses, lo que beneficiaría a los consumidores y podría impulsar el consumo interno.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2340&auto=format&fit=crop',
//     category: 'noticias',
//     subcategory: 'economia',
//     featured: false,
//     createdAt: new Date(2023, 5, 14)
//   },
  
//   // Noticias - Internacional
//   {
//     id: 'noticia-internacional-1',
//     title: 'Cumbre internacional sobre cambio climático logra acuerdos históricos',
//     content: '<p>La Cumbre Internacional sobre Cambio Climático ha concluido con acuerdos históricos entre las principales potencias mundiales. Los países participantes se han comprometido a reducir sus emisiones de CO2 en un 50% para 2030 y a alcanzar la neutralidad de carbono para 2050.</p><p>Además, se ha creado un fondo de 100.000 millones de dólares para ayudar a los países en desarrollo a implementar tecnologías limpias y adaptarse a los efectos del cambio climático.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2232&auto=format&fit=crop',
//     category: 'noticias',
//     subcategory: 'internacional',
//     featured: true,
//     createdAt: new Date(2023, 5, 13)
//   },
  
//   // Deportes - Fútbol
//   {
//     id: 'deportes-futbol-1',
//     title: 'El Real Madrid se proclama campeón de la Liga de Campeones',
//     content: '<p>El Real Madrid ha conquistado su decimoquinta Copa de Europa tras vencer en la final al Manchester City por 2-1. Los goles de Vinicius Jr. y Benzema dieron la victoria al equipo blanco, que dominó el partido desde el inicio.</p><p>Con este título, el Real Madrid amplía su ventaja como el club más laureado en la historia de la competición. El entrenador Carlo Ancelotti también hace historia al convertirse en el técnico con más Champions League ganadas.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2340&auto=format&fit=crop',
//     category: 'deportes',
//     subcategory: 'futbol',
//     featured: true,
//     createdAt: new Date(2023, 5, 12)
//   },
  
//   // Deportes - Basketball
//   {
//     id: 'deportes-basketball-1',
//     title: 'Los Lakers ganan la NBA tras una emocionante final',
//     content: '<p>Los Angeles Lakers se han proclamado campeones de la NBA tras vencer a los Boston Celtics en el séptimo partido de las finales. LeBron James fue nombrado MVP de las finales tras promediar 28 puntos, 10 rebotes y 8 asistencias por partido.</p><p>Este es el decimoctavo título para la franquicia californiana, que iguala a los Celtics como el equipo más laureado de la historia de la NBA. La celebración en Los Ángeles ha reunido a miles de aficionados.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop',
//     category: 'deportes',
//     subcategory: 'basketball',
//     featured: false,
//     createdAt: new Date(2023, 5, 11)
//   },
  
//   // Deportes - Béisbol
//   {
//     id: 'deportes-beisbol-1',
//     title: 'Los Yankees ganan la Serie Mundial por vigésima octava vez',
//     content: '<p>Los New York Yankees han conquistado su vigésimo octavo título de la Serie Mundial tras vencer a los Los Angeles Dodgers en el sexto partido de la serie. Aaron Judge fue la figura del equipo con tres home runs durante la serie final.</p><p>El manager de los Yankees destacó la unión del equipo y el trabajo realizado durante toda la temporada. La próxima temporada promete ser emocionante con varios equipos reforzándose para destronar a los neoyorquinos.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=2368&auto=format&fit=crop',
//     category: 'deportes',
//     subcategory: 'beisbol',
//     featured: false,
//     createdAt: new Date(2023, 5, 10)
//   },
  
//   // Farándula - Celebridades
//   {
//     id: 'farandula-celebridades-1',
//     title: 'Jennifer López y Ben Affleck anuncian su compromiso',
//     content: '<p>Los actores Jennifer López y Ben Affleck han anunciado su compromiso 20 años después de su primera relación. La pareja, que retomó su romance el año pasado, ha confirmado la noticia a través de sus redes sociales con una fotografía del anillo de compromiso.</p><p>Según fuentes cercanas, la boda podría celebrarse a finales de este año en una ceremonia íntima. Esta será la cuarta boda para López y la segunda para Affleck.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop',
//     category: 'farandula',
//     subcategory: 'celebridades',
//     featured: true,
//     createdAt: new Date(2023, 5, 9)
//   },
  
//   // Farándula - Cine
//   {
//     id: 'farandula-cine-1',
//     title: '"Dune: Parte 2" arrasa en la taquilla mundial',
//     content: '<p>La segunda parte de "Dune", dirigida por Denis Villeneuve, ha recaudado más de 500 millones de dólares en su primer fin de semana de estreno, convirtiéndose en uno de los mejores estrenos de la historia del cine.</p><p>La película, protagonizada por Timothée Chalamet y Zendaya, ha recibido excelentes críticas y ya se habla de una posible tercera parte para completar la saga basada en las novelas de Frank Herbert.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2340&auto=format&fit=crop',
//     category: 'farandula',
//     subcategory: 'cine',
//     featured: false,
//     createdAt: new Date(2023, 5, 8)
//   },
  
//   // Tendencias - Viral
//   {
//     id: 'tendencias-viral-1',
//     title: 'El nuevo reto viral que está conquistando TikTok',
//     content: '<p>Un nuevo desafío se ha vuelto viral en TikTok y ya cuenta con millones de participantes en todo el mundo. El "Slow Motion Challenge" consiste en grabar vídeos en cámara lenta realizando actividades cotidianas de forma creativa.</p><p>Celebridades como Selena Gomez y Dua Lipa ya se han sumado al reto, aumentando su popularidad. Los expertos en redes sociales predicen que este desafío podría mantenerse en tendencia durante varias semanas.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2374&auto=format&fit=crop',
//     category: 'tendencias',
//     subcategory: 'viral',
//     featured: true,
//     createdAt: new Date(2023, 5, 7)
//   },
  
//   // Tendencias - Gaming
//   {
//     id: 'tendencias-gaming-1',
//     title: 'PlayStation 6 podría llegar antes de lo esperado',
//     content: '<p>Según fuentes cercanas a Sony, la compañía japonesa estaría acelerando el desarrollo de PlayStation 6, que podría llegar al mercado en 2025, antes de lo inicialmente previsto.</p><p>El nuevo sistema promete un salto generacional importante con gráficos fotorrealistas y tiempos de carga prácticamente inexistentes. También se rumorea que incluirá un sistema de realidad virtual mejorado compatible con los juegos tradicionales.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?q=80&w=2338&auto=format&fit=crop',
//     category: 'tendencias',
//     subcategory: 'gaming',
//     featured: false,
//     createdAt: new Date(2023, 5, 6)
//   },
  
//   // Otros - Salud
//   {
//     id: 'otros-salud-1',
//     title: 'Descubren un tratamiento prometedor contra el Alzheimer',
//     content: '<p>Un equipo de investigadores ha descubierto un tratamiento que podría frenar el avance del Alzheimer en sus primeras etapas. El medicamento, que actúa sobre las proteínas beta-amiloides, ha mostrado resultados prometedores en los ensayos clínicos de fase 3.</p><p>Los pacientes tratados mostraron una reducción significativa en el deterioro cognitivo comparado con el grupo de control. Los científicos esperan que el tratamiento esté disponible para el público en los próximos dos años.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2340&auto=format&fit=crop',
//     category: 'otros',
//     subcategory: 'salud',
//     featured: true,
//     createdAt: new Date(2023, 5, 5)
//   }
// ]

// // Function to get sample articles by category
// export const getSampleArticlesByCategory = (category) => {
//   return sampleArticles.filter(article => article.category === category)
// }

// // Function to get sample articles by subcategory
// export const getSampleArticlesBySubcategory = (category, subcategory) => {
//   return sampleArticles.filter(
//     article => article.category === category && article.subcategory === subcategory
//   )
// }

// // Function to get featured sample articles
// export const getSampleFeaturedArticles = () => {
//   return sampleArticles.filter(article => article.featured)
// }

// // Function to get sample article by ID
// export const getSampleArticleById = (id) => {
//   return sampleArticles.find(article => article.id === id)
// }