import React, { useState, useEffect, useRef } from "react";
import { getLatestArticles } from "../../services/index";
import ArticleGrid from "./ArticleGrid";
import LoadingSpinner from "./LoadingSpinner";

const LatestArticles = ({ limit = 20, excludeIds = [] }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevExcludeIdsRef = useRef(excludeIds);

  useEffect(() => {
    // Verificar si excludeIds ha cambiado
    const excludeIdsChanged =
      JSON.stringify(prevExcludeIdsRef.current) !== JSON.stringify(excludeIds);
    prevExcludeIdsRef.current = excludeIds;

    const fetchLatestArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener los últimos artículos
        const latestArticles = await getLatestArticles(
          limit + excludeIds.length
        );

        // Filtrar artículos excluidos
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

    // Solo ejecutar si excludeIds ha cambiado o es la primera carga
    if (excludeIdsChanged || articles.length === 0) {
      fetchLatestArticles();
    }
  }, [limit, articles.length]);

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
};

export default React.memo(LatestArticles);