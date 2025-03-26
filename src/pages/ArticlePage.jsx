import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getArticleById } from "../services/articleService";
import { getCategoryById, getSubcategoryById } from "../utils/categories";
import LatestArticles from "../components/ui/LatestArticles";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const articleData = await getArticleById(id);

        if (!articleData) {
          setError("El artículo no existe o ha sido eliminado");
          return;
        }

        setArticle(articleData);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("No se pudo cargar el artículo");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  if (!article) return null;

  const {
    title,
    content,
    imageUrl,
    category,
    subcategory,
    createdAt,
    featured,
  } = article;

  // Format date
  const formattedDate = createdAt?.toDate
    ? format(createdAt.toDate(), "dd MMMM yyyy, HH:mm", { locale: es })
    : "Fecha no disponible";

  // Get category and subcategory info
  const categoryInfo = getCategoryById(category);
  const subcategoryInfo = subcategory
    ? getSubcategoryById(category, subcategory)
    : null;

  // Function to render content with proper iframe handling
  const renderContent = (htmlContent) => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Find all iframes in the content
    const iframes = tempDiv.querySelectorAll("iframe");

    // Process each iframe
    iframes.forEach((iframe) => {
      // Create a container div for the iframe
      const container = document.createElement("div");
      container.className = "video-container my-8";

      // Set styles for the container
      container.style.width = "100%";
      container.style.maxWidth = "800px";
      container.style.margin = "0 auto";
      container.style.position = "relative";
      container.style.paddingBottom = "56.25%"; // 16:9 aspect ratio

      // Set iframe styles
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.borderRadius = "8px";
      iframe.style.border = "none";

      // Replace iframe with the container containing the iframe
      iframe.parentNode.replaceChild(container, iframe);
      container.appendChild(iframe);
    });

    return tempDiv.innerHTML;
  };

  return (
    <>
      <Helmet>
        <title>{title} - Portal de Noticias</title>
        <meta
          name="description"
          content={
            content
              ? content.substring(0, 160)
              : "Artículo en Portal de Noticias"
          }
        />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={createdAt?.toDate?.().toISOString()}
        />
        <meta
          property="article:section"
          content={categoryInfo?.name || category}
        />
        <style>{`
          .video-container {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            overflow: hidden;
            margin: 2rem auto;
            max-width: 800px;
          }
          
          .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            border: none;
          }
          
          .prose iframe {
            margin: 2rem auto !important;
          }
        `}</style>
      </Helmet>

      <article className="max-w-4xl mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-md">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-8">
            <ol className="flex flex-wrap items-center">
              <li>
                <Link to="/" className="hover:text-primary-600">
                  Inicio
                </Link>
                <span className="mx-2">/</span>
              </li>
              {categoryInfo && (
                <li>
                  <Link
                    to={`/categoria/${category}`}
                    className="hover:text-primary-600"
                  >
                    {categoryInfo.name}
                  </Link>
                  {subcategoryInfo && <span className="mx-2">/</span>}
                </li>
              )}
              {subcategoryInfo && (
                <li>
                  <Link
                    to={`/categoria/${category}/${subcategory}`}
                    className="hover:text-primary-600"
                  >
                    {subcategoryInfo.name}
                  </Link>
                </li>
              )}
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <time dateTime={createdAt?.toDate?.().toISOString()}>
                {formattedDate}
              </time>

              <div className="flex gap-2">
                {categoryInfo && (
                  <Link
                    to={`/categoria/${category}`}
                    className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium"
                  >
                    {categoryInfo.name}
                  </Link>
                )}

                {subcategoryInfo && (
                  <Link
                    to={`/categoria/${category}/${subcategory}`}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium"
                  >
                    {subcategoryInfo.name}
                  </Link>
                )}

                {featured && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Destacado
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <figure className="mb-8">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg"
              />
            </figure>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {/* Render the content with dangerouslySetInnerHTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: renderContent(content),
              }}
            />
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <LatestArticles limit={4} excludeIds={[id]} />
        </div>
      </article>
    </>
  );
};

export default ArticlePage;