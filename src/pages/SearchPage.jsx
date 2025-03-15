// import React, { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { searchArticles } from '../services/articleService'
// import ArticleGrid from '../components/ui/ArticleGrid'
// import SearchBar from '../components/ui/SearchBar'
// import LoadingSpinner from '../components/ui/LoadingSpinner'

// const SearchPage = () => {
//   const [searchParams] = useSearchParams()
//   const query = searchParams.get('q') || ''
  
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
  
//   useEffect(() => {
//     const performSearch = async () => {
//       if (!query.trim()) {
//         setArticles([])
//         return
//       }
      
//       try {
//         setLoading(true)
//         const results = await searchArticles(query)
//         setArticles(results)
//       } catch (err) {
//         console.error('Error searching articles:', err)
//         setError('No se pudieron cargar los resultados de búsqueda')
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     performSearch()
//   }, [query])
  
//   return (
//     <>
//       <Helmet>
//         <title>{query ? `Búsqueda: ${query} - Portal de Noticias` : 'Búsqueda - Portal de Noticias'}</title>
//         <meta 
//           name="description" 
//           content={`Resultados de búsqueda para "${query}" en Portal de Noticias.`} 
//         />
//         <meta name="robots" content="noindex" />
//       </Helmet>
      
//       <div>
//         <h1 className="text-3xl font-bold mb-6">Búsqueda</h1>
        
//         <div className="mb-8">
//           <SearchBar className="max-w-xl mx-auto" />
//         </div>
        
//         {query && (
//           <div className="mb-6">
//             <h2 className="text-xl font-medium">
//               {loading ? 'Buscando...' : `Resultados para "${query}"`}
//             </h2>
//           </div>
//         )}
        
//         {loading ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <div className="text-red-500 text-center py-4">{error}</div>
//         ) : articles.length > 0 ? (
//           <ArticleGrid articles={articles} columns={3} />
//         ) : query ? (
//           <div className="text-gray-500 text-center py-8">
//             <p className="text-lg">No se encontraron resultados para "{query}"</p>
//             <p className="mt-2">Intenta con otros términos de búsqueda</p>
//           </div>
//         ) : (
//           <div className="text-gray-500 text-center py-8">
//             <p className="text-lg">Ingresa un término de búsqueda para encontrar artículos</p>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default SearchPage













// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { getAllArticles } from "../services/articleService"; // Cambiamos a getAllArticles
// import ArticleGrid from "../components/ui/ArticleGrid";
// import SearchBar from "../components/ui/SearchBar";
// import LoadingSpinner from "../components/ui/LoadingSpinner";

// const SearchPage = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q") || "";

//   const [allArticles, setAllArticles] = useState([]); // Estado para todas las noticias
//   const [filteredArticles, setFilteredArticles] = useState([]); // Estado para noticias filtradas
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 1. Descargar todas las noticias al cargar la página
//   useEffect(() => {
//     const fetchAllArticles = async () => {
//       try {
//         setLoading(true);
//         const articles = await getAllArticles(); // Obtener todas las noticias
//         setAllArticles(articles);
//       } catch (err) {
//         console.error("Error fetching articles:", err);
//         setError("No se pudieron cargar las noticias");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllArticles();
//   }, []);

//   // 2. Filtrar las noticias cuando cambia el término de búsqueda
//   useEffect(() => {
//     if (!query.trim()) {
//       setFilteredArticles([]); // Si no hay término de búsqueda, no mostrar resultados
//       return;
//     }

//     // Filtrar noticias en el frontend
//     const filtered = allArticles.filter(
//       (article) =>
//         article.title.toLowerCase().includes(query.toLowerCase()) ||
//         article.content.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredArticles(filtered);
//   }, [query, allArticles]); // Dependencias: query y allArticles

//   return (
//     <>
//       <Helmet>
//         <title>
//           {query
//             ? `Búsqueda: ${query} - Portal de Noticias`
//             : "Búsqueda - Portal de Noticias"}
//         </title>
//         <meta
//           name="description"
//           content={`Resultados de búsqueda para "${query}" en Portal de Noticias.`}
//         />
//         <meta name="robots" content="noindex" />
//       </Helmet>

//       <div>
//         <h1 className="text-3xl font-bold mb-6">Búsqueda</h1>

//         {/* <div className="mb-8">
//           <SearchBar className="max-w-xl mx-auto" />
//         </div> */}

//         {query && (
//           <div className="mb-6">
//             <h2 className="text-xl font-medium">
//               {loading ? "Buscando..." : `Resultados para "${query}"`}
//             </h2>
//           </div>
//         )}

//         {loading ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <div className="text-red-500 text-center py-4">{error}</div>
//         ) : filteredArticles.length > 0 ? (
//           <ArticleGrid articles={filteredArticles} columns={3} />
//         ) : query ? (
//           <div className="text-gray-500 text-center py-8">
//             <p className="text-lg">
//               No se encontraron resultados para "{query}"
//             </p>
//             <p className="mt-2">Intenta con otros términos de búsqueda</p>
//           </div>
//         ) : (
//           <div className="text-gray-500 text-center py-8">
//             <p className="text-lg">
//               Ingresa un término de búsqueda para encontrar artículos
//             </p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchPage;













import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAllArticlesForSearch } from "../services/articleService"; // Cambia la importación
import ArticleGrid from "../components/ui/ArticleGrid";
import SearchBar from "../components/ui/SearchBar";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [allArticles, setAllArticles] = useState([]); // Estado para todas las noticias
  const [filteredArticles, setFilteredArticles] = useState([]); // Estado para noticias filtradas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Descargar todas las noticias al cargar la página
  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        setLoading(true);
        const articles = await getAllArticlesForSearch(); // Usa la nueva función
        setAllArticles(articles);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("No se pudieron cargar las noticias");
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, []);

  // 2. Filtrar las noticias cuando cambia el término de búsqueda
  useEffect(() => {
    if (!query.trim()) {
      setFilteredArticles([]); // Si no hay término de búsqueda, no mostrar resultados
      return;
    }

    // Filtrar noticias en el frontend
    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [query, allArticles]); // Dependencias: query y allArticles

  return (
    <>
      <Helmet>
        <title>
          {query
            ? `Búsqueda: ${query} - Portal de Noticias`
            : "Búsqueda - Portal de Noticias"}
        </title>
        <meta
          name="description"
          content={`Resultados de búsqueda para "${query}" en Portal de Noticias.`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold mb-6">Búsqueda</h1>

        {/* Barra de búsqueda (opcional, si la quieres mostrar) */}
        {/* <div className="mb-8">
          <SearchBar className="max-w-xl mx-auto" />
        </div> */}

        {query && (
          <div className="mb-6">
            <h2 className="text-xl font-medium">
              {loading ? "Buscando..." : `Resultados para "${query}"`}
            </h2>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : filteredArticles.length > 0 ? (
          <ArticleGrid articles={filteredArticles} columns={3} />
        ) : query ? (
          <div className="text-gray-500 text-center py-8">
            <p className="text-lg">
              No se encontraron resultados para "{query}"
            </p>
            <p className="mt-2">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            <p className="text-lg">
              Ingresa un término de búsqueda para encontrar artículos
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;







