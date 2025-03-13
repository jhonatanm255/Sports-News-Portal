// import React, { useState, useEffect } from 'react'
// import { getFeaturedArticles } from '../../services/articleService'
// import ArticleCard from './ArticleCard'
// import LoadingSpinner from './LoadingSpinner'

// const FeaturedArticles = () => {
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
  
//   useEffect(() => {
//     const fetchFeaturedArticles = async () => {
//       try {
//         setLoading(true)
//         const featuredArticles = await getFeaturedArticles(5)
//         setArticles(featuredArticles)
//       } catch (err) {
//         console.error('Error fetching featured articles:', err)
//         setError('No se pudieron cargar los artículos destacados')
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchFeaturedArticles()
//   }, [])
  
//   if (loading) return <LoadingSpinner />
  
//   if (error) return <div className="text-red-500 text-center py-4">{error}</div>
  
//   if (articles.length === 0) {
//     return <div className="text-gray-500 text-center py-4">No hay artículos destacados</div>
//   }
  
//   // Display the first article as the main featured article
//   const mainArticle = articles[0]
//   const secondaryArticles = articles.slice(1)
  
//   return (
//     <section className="mb-12">
//       <h2 className="text-2xl font-bold mb-6">Destacados</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           {mainArticle && <ArticleCard article={mainArticle} size="featured" />}
//         </div>

//         <div className="lg:col-span-1">
//           <div className="grid grid-cols-1 gap-6">
//             {secondaryArticles.slice(0, 2).map((article) => (
//               <ArticleCard key={article.id} article={article} size="sm" />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeaturedArticles








import React, { useState, useEffect } from "react";
import { getFeaturedArticles } from "../../services/articleService";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true);
        const featuredArticles = await getFeaturedArticles(5); // Obtener 5 artículos destacados
        setArticles(featuredArticles);
      } catch (err) {
        console.error("Error fetching featured articles:", err);
        setError("No se pudieron cargar los artículos destacados");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  if (articles.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No hay artículos destacados
      </div>
    );
  }

  // Dividir los artículos
  const mainArticles = articles.slice(0, 2); // Primeros dos artículos para la columna izquierda
  const secondaryArticles = articles.slice(2); // Resto de los artículos para la columna derecha

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Destacados</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Dos artículos en dos filas */}
        <div className="lg:col-span-2 grid grid-rows-2 gap-6">
          {mainArticles.map((article) => (
            <ArticleCard key={article.id} article={article} size="featured" />
          ))}
        </div>

        {/* Columna derecha: Dos artículos pequeños */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6">
            {secondaryArticles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;