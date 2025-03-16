import React, { useState, useEffect } from 'react'
import { getLatestArticles } from '../../services/articleService'
import ArticleGrid from './ArticleGrid'
import LoadingSpinner from './LoadingSpinner'
import LoginPage from '../../pages/LoginPage'

const LatestArticles = ({ limit = 9, excludeIds = [] }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setLoading(true);
        const latestArticles = await getLatestArticles(
          limit + excludeIds.length
        );

        // Filter out excluded articles
        const filteredArticles = latestArticles
          .filter((article) => !excludeIds.includes(article.id))
          .slice(0, limit);

        setArticles(filteredArticles);
      } catch (err) {
        console.error("Error fetching latest articles:", err);
        setError("No se pudieron cargar los artículos recientes");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, [limit]); // AQUI VA ESTA DEPENDENCIA EN EL CODIGO ORIGINAL (excludeIds) PERO ESTA GENERANDO RECARGAS CONSTANTES ASI QUE LA QUITE

  if (loading) return <LoadingSpinner />;

  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  if (articles.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No hay artículos recientes
      </div>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Más Noticias</h2>
      <ArticleGrid articles={articles} columns={2} />
    </section>
  );
}

export default LatestArticles











// import React, { useState, useEffect } from "react";
// import { getLatestArticles } from "../../services/articleService";
// import ArticleGrid from "./ArticleGrid";
// import LoadingSpinner from "./LoadingSpinner";

// const LatestArticles = ({ limit = 9, excludeIds = [] }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLatestArticles = async () => {
//       try {
//         setLoading(true);
//         const latestArticles = await getLatestArticles(
//           limit + excludeIds.length
//         );

//         // Filter out excluded articles
//         const filteredArticles = latestArticles
//           .filter((article) => !excludeIds.includes(article.id))
//           .slice(0, limit);

//         setArticles(filteredArticles);
//       } catch (err) {
//         console.error("Error fetching latest articles:", err);
//         setError("No se pudieron cargar los artículos recientes");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestArticles();
//   }, [limit, excludeIds.length]); // Solo dependemos de limit y la longitud de excludeIds

//   if (loading) return <LoadingSpinner />;

//   if (error)
//     return <div className="text-red-500 text-center py-4">{error}</div>;

//   if (articles.length === 0) {
//     return (
//       <div className="text-gray-500 text-center py-4">
//         No hay artículos recientes
//       </div>
//     );
//   }

//   return (
//     <section className="mb-12">
//       <h2 className="text-2xl font-bold mb-6">Últimas Noticias</h2>
//       <ArticleGrid articles={articles} columns={2} />
//     </section>
//   );
// };

// export default LatestArticles;