import { useState, useEffect } from "react";
import { getAllArticles, deleteArticle } from "../../../services/index";
import toast from "react-hot-toast";

export const useArticles = (articlesPerPage) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastDoc, setLastDoc] = useState(null);
  const [pageCache, setPageCache] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

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

        const {
          articles: fetchedArticles,
          lastVisible,
          totalCount,
        } = await getAllArticles(articlesPerPage, lastDocToUse);

        setArticles(fetchedArticles);
        setLastDoc(lastVisible);

        setPageCache((prev) => ({
          ...prev,
          [currentPage]: {
            articles: fetchedArticles,
            lastDoc: lastVisible,
          },
        }));

        if (totalCount) {
          setTotalPages(Math.ceil(totalCount / articlesPerPage));
        } else {
          if (fetchedArticles.length < articlesPerPage) {
            setTotalPages(currentPage);
          } else {
            setTotalPages(currentPage + 1);
          }
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("No se pudieron cargar los artículos");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, articlesPerPage, lastDoc, pageCache]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleDeleteArticle = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer."
      )
    ) {
      try {
        setIsDeleting(true);
        await deleteArticle(id);
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== id)
        );
        setPageCache({});
        toast.success("Artículo eliminado correctamente");
      } catch (error) {
        console.error("Error deleting article:", error);
        toast.error("Error al eliminar el artículo");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return {
    articles,
    loading,
    error,
    currentPage,
    totalPages,
    isDeleting,
    handlePageChange,
    handleDeleteArticle,
  };
};
