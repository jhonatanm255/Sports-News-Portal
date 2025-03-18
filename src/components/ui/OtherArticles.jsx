// import React, { useState, useEffect } from 'react'
// import { getLatestArticles } from '../../services/articleService'
// import ArticleGrid from './ArticleGrid'
// import LoadingSpinner from './LoadingSpinner'
// import LoginPage from '../../pages/LoginPage'

// const OtherArticles = ({ limit = 6, excludeIds = [] }) => {
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
//   }, [limit]); // AQUI VA ESTA DEPENDENCIA EN EL CODIGO ORIGINAL (excludeIds) PERO ESTA GENERANDO RECARGAS CONSTANTES ASI QUE LA QUITE

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
//       <h2 className="text-2xl font-bold mb-6">Otras Noticias</h2>
//       <ArticleGrid articles={articles} columns={1} />
//     </section>
//   );
// }

// export default OtherArticles;









import React, { useState, useEffect, useRef } from "react";
import { getComplementaryArticles } from "../../services/articleService";
import ArticleGrid from "./ArticleGrid";
import LoadingSpinner from "./LoadingSpinner";

const OtherArticles = ({ limit = 6, excludeIds = [] }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevExcludeIdsRef = useRef();

  useEffect(() => {
    // Evitar recarga si excludeIds no ha cambiado
    if (prevExcludeIdsRef.current === excludeIds) return;
    prevExcludeIdsRef.current = excludeIds;

    const fetchComplementaryArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const complementaryArticles = await getComplementaryArticles(
          limit + excludeIds.length
        );
        console.log("Complementary Articles:", complementaryArticles); // Depuración

        const filteredArticles = complementaryArticles
          .filter((article) => !excludeIds.includes(article.id))
          .slice(0, limit);

        setArticles(filteredArticles);
      } catch (err) {
        console.error("Error fetching complementary articles:", err);
        setError("No se pudieron cargar los artículos complementarios");
      } finally {
        setLoading(false);
      }
    };

    fetchComplementaryArticles();
  }, [limit]);

  if (loading) return <LoadingSpinner />;

  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  if (articles.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No hay artículos complementarios
      </div>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Tendencias del día</h2>
      <ArticleGrid articles={articles} columns={1} />
    </section>
  );
};

export default React.memo(OtherArticles);