import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Pagination from "../../../components/ui/Pagination";
import { useArticles } from "./useArticles";
import ArticlesHeader from "./ArticlesHeader";
import ArticlesTable from "./ArticlesTable";

const ARTICLES_PER_PAGE = 10;

const Articles = () => {
  const {
    articles,
    loading,
    error,
    currentPage,
    totalPages,
    isDeleting,
    handlePageChange,
    handleDeleteArticle,
  } = useArticles(ARTICLES_PER_PAGE);

  if (loading && currentPage === 1) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Administrar Artículos - Portal de Noticias</title>
      </Helmet>

      <div>
        <ArticlesHeader />

        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">No hay artículos disponibles</p>
            <Link to="/admin/articulos/crear" className="btn btn-primary">
              Crear tu primer artículo
            </Link>
          </div>
        ) : (
          <>
            <ArticlesTable
              articles={articles}
              isDeleting={isDeleting}
              onDelete={handleDeleteArticle}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Articles;
