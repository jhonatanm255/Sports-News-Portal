import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticlesBySubcategory } from "../services/index";
import { getCategoryById, getSubcategoryById } from "../utils/categories";
import ArticleGrid from "../components/ui/ArticleGrid";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import TwitterFeed from "../components/ui/TwitterFeed";
import Pagination from "../components/ui/Pagination";
import useMediaQuery from "../hooks/useMediaQuery";

const ARTICLES_PER_PAGE = 9;

const sportsTwitterAccounts = {
  basketball: ["@LAClippers", "@Lakers", "@NBA"],
  futbol: ["@FIFAcom", "@USMNT", "@ESPNFC"],
  beisbol: ["@Angels", "@LosDodgers", "@MLB"],
  otros: ["@NFL", "@F1", "@LoMejorDelBoxeo"],
};

const SubcategoryPage = () => {
  const { category, subcategory } = useParams();
  const [articles, setArticles] = useState({
    featured: [],
    normal: [],
    complementary: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastDoc, setLastDoc] = useState(null);
  const [pageCache, setPageCache] = useState({});

  const isMobile = useMediaQuery("(max-width: 1023px)");
  const categoryInfo = getCategoryById(category);
  const subcategoryInfo = getSubcategoryById(category, subcategory);

  // Twitter accounts only for sports subcategories
  const twitterAccounts =
    category === "deportes" && sportsTwitterAccounts[subcategory]
      ? sportsTwitterAccounts[subcategory]
      : [];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        if (pageCache[currentPage]) {
          setArticles(pageCache[currentPage].articles);
          setLastDoc(pageCache[currentPage].lastDoc);
          setLoading(false);
          return;
        }

        let lastDocToUse = currentPage === 1 ? null : lastDoc;
        const { articles: fetchedArticles, lastVisible } =
          await getArticlesBySubcategory(
            category,
            subcategory,
            ARTICLES_PER_PAGE,
            lastDocToUse
          );

        const featured = fetchedArticles.filter(
          (article) => article.is_featured
        );
        const normal = fetchedArticles.filter(
          (article) => !article.is_featured && !article.is_complementary
        );
        const complementary = fetchedArticles.filter(
          (article) => article.is_complementary
        );

        setArticles({ featured, normal, complementary });
        setLastDoc(lastVisible);

        setPageCache((prev) => ({
          ...prev,
          [currentPage]: {
            articles: { featured, normal, complementary },
            lastDoc: lastVisible,
          },
        }));

        setTotalPages(Math.max(currentPage, totalPages));
      } catch (err) {
        console.error("Error fetching subcategory articles:", err);
        setError("No se pudieron cargar los artículos de esta subcategoría");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, subcategory, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderMobileArticlesWithTwitter = () => {
    const groupedArticles = [];
    const articlesCopy = [...articles.normal];

    while (articlesCopy.length > 0) {
      const articleGroup = articlesCopy.splice(0, 3);
      groupedArticles.push(articleGroup);

      if (twitterAccounts.length > 0 && articlesCopy.length > 0) {
        const account =
          twitterAccounts[groupedArticles.length % twitterAccounts.length];
        groupedArticles.push([{ isTwitterFeed: true, account }]);
      }
    }

    return (
      <div className="space-y-6">
        {groupedArticles.map((group, index) => {
          if (group[0]?.isTwitterFeed) {
            return (
              <div key={`twitter-${index}`} className="my-4">
                <TwitterFeed
                  accounts={[group[0].account]}
                  mobileHeight="300px"
                  singleAccountMode
                />
              </div>
            );
          }
          return (
            <ArticleGrid
              key={`articles-${index}`}
              articles={group}
              columns={1}
            />
          );
        })}
      </div>
    );
  };

  if (loading && currentPage === 1) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;
  if (articles.normal.length === 0 && !loading) {
    return (
      <div className="text-gray-500 text-center py-4 min-h-screen">
        No hay artículos en esta subcategoría
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {subcategoryInfo
            ? `${subcategoryInfo.name} - ${
                categoryInfo?.name || "Categoría"
              } - Portal de Noticias`
            : "Subcategoría - Portal de Noticias"}
        </title>
        <meta
          name="description"
          content={`Noticias de ${
            subcategoryInfo ? subcategoryInfo.name : "esta subcategoría"
          }. Las últimas actualizaciones y artículos.`}
        />
      </Helmet>

      {isMobile ? (
        /* Vista Móvil - Otras Noticias al final */
        <div className="flex flex-col gap-8">
          <div>
            {articles.featured.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Destacados</h2>
                <ArticleGrid articles={articles.featured} columns={1} />
              </div>
            )}

            {articles.normal.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Noticias del día
                </h2>
                {renderMobileArticlesWithTwitter()}
              </div>
            )}
          </div>

          {articles.normal.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {articles.complementary.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Otras Noticias</h2>
              <ArticleGrid articles={articles.complementary} columns={2} />
            </div>
          )}
        </div>
      ) : (
        /* Vista Desktop - Layout original */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {articles.featured.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Destacados</h2>
                <ArticleGrid articles={articles.featured} columns={1} />
              </div>
            )}

            {articles.normal.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Noticias del día
                </h2>
                <ArticleGrid articles={articles.normal} columns={2} />
              </div>
            )}

            {articles.normal.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6 mt-11">
            {category === "deportes" && twitterAccounts.length > 0 && (
              <div className="min-h-[600px]">
                <TwitterFeed accounts={twitterAccounts} />
              </div>
            )}

            {articles.complementary.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Otras Noticias</h2>
                <ArticleGrid articles={articles.complementary} columns={1} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubcategoryPage;
