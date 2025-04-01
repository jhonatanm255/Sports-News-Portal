import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getArticleById } from "../services/index";
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

  // Function to render content with proper formatting
  const renderContent = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Process iframes (videos)
    const iframes = tempDiv.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const container = document.createElement("div");
      container.className = "video-container";
      container.style.paddingBottom = "56.25%";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.parentNode.replaceChild(container, iframe);
      container.appendChild(iframe);
    });

    // Process images
    const images = tempDiv.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.style.margin = "1.5rem auto";
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
          .article-content {
            word-wrap: break-word;
            overflow-wrap: break-word;
            word-break: break-word;
            white-space: pre-wrap;
            max-width: 100%;
            line-height: 1.6;
            font-size: 1.125rem;
            color: #374151;
          }
          
          .article-content p {
            margin-bottom: 1.5rem;
          }
          
          .article-content img {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            margin: 1.5rem auto !important;
            border-radius: 8px;
          }
          
          .article-content ul,
          .article-content ol {
            margin-bottom: 1.5rem;
            padding-left: 2rem;
          }
          
          .article-content li {
            margin-bottom: 0.5rem;
          }
          
          .article-content h2,
          .article-content h3,
          .article-content h4 {
            margin: 2rem 0 1rem;
            font-weight: 600;
            line-height: 1.3;
          }
          
          .article-content h2 {
            font-size: 1.5rem;
          }
          
          .article-content h3 {
            font-size: 1.25rem;
          }
          
          .article-content a {
            color: #3b82f6;
            text-decoration: underline;
          }
          
          .article-content blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: #6b7280;
            font-style: italic;
          }
          
          .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            margin: 2rem auto;
            max-width: 800px;
            width: 100%;
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
          
          @media (max-width: 768px) {
            .article-content {
              font-size: 1rem;
            }
            
            .article-content h2 {
              font-size: 1.3rem;
            }
            
            .article-content h3 {
              font-size: 1.15rem;
            }
          }
        `}</style>
      </Helmet>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 p-4 bg-white rounded-lg shadow-lg">
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
            <h1 className="text-3xl font-bold mb-4 leading-tight">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <time dateTime={createdAt?.toDate?.().toISOString()}>
                {formattedDate}
              </time>

              <div className="flex gap-2">
                {categoryInfo && (
                  <Link
                    to={`/categoria/${category}`}
                    className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {categoryInfo.name}
                  </Link>
                )}

                {subcategoryInfo && (
                  <Link
                    to={`/categoria/${category}/${subcategory}`}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {subcategoryInfo.name}
                  </Link>
                )}

                {featured && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
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
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
              />
            </figure>
          )}

          {/* Article Content */}
          <div className="article-content">
            <div
              dangerouslySetInnerHTML={{
                __html: renderContent(content),
              }}
            />
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Más noticias</h2>
          <LatestArticles limit={4} excludeIds={[id]} />
        </div>
      </article>
    </>
  );
};

export default ArticlePage;