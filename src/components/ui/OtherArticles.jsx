import React, { useState, useEffect, useRef } from "react";
import { getComplementaryArticles } from "../../services/articleService";
import ArticleGrid from "./ArticleGrid";
import LoadingSpinner from "./LoadingSpinner";

const OtherArticles = ({ limit = 60, excludeIds = [] }) => {
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
    <section className="mb-14">
      <h2 className="text-2xl font-bold mb-6">Tendencias del día</h2>
      <ArticleGrid articles={articles} columns={1} />
    </section>
  );
};

export default React.memo(OtherArticles);