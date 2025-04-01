import React, { useState, useEffect } from "react";
import { getFeaturedArticles } from "../../services/index";
import LoadingSpinner from "./LoadingSpinner";
import ArticleCard from "./ArticleCard/ArticleCard";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true);
        const featuredArticles = await getFeaturedArticles(4);
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

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Destacados</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Columna izquierda - Artículos principales */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {articles.slice(0, 2).map((article) => (
            <div key={article.id} className="flex-1 min-h-0">
              {" "}
              {/* Contenedor flexible */}
              <ArticleCard
                article={article}
                size="featured"
                featuredTag={true}
                tagPosition="top-right"
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* Columna derecha - Artículos secundarios */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {articles.slice(2, 4).map((article) => (
            <div key={article.id} className="flex-1 min-h-0">
              {" "}
              <ArticleCard
                article={article}
                size="sm"
                featuredTag={true}
                tagPosition="top-right"
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <hr className="mt-8 border-gray-200" />
    </section>
  );
};

export default FeaturedArticles;