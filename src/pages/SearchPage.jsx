import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAllArticlesForSearch } from "../services/index";
import ArticleGrid from "../components/ui/ArticleGrid";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        setLoading(true);
        const articles = await getAllArticlesForSearch();
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

  useEffect(() => {
    if (!query.trim()) {
      setFilteredArticles([]);
      return;
    }

    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [query, allArticles]);

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







