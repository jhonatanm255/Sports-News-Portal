// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { getAllArticles, deleteArticle } from '../../services/articleService'
// import { getCategoryById, getSubcategoryById } from '../../utils/categories'
// import LoadingSpinner from '../../components/ui/LoadingSpinner'
// import Pagination from '../../components/ui/Pagination'
// import toast from 'react-hot-toast'

// const ARTICLES_PER_PAGE = 10

// const Articles = () => {
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [lastDoc, setLastDoc] = useState(null)
//   const [pageCache, setPageCache] = useState({})
//   const [isDeleting, setIsDeleting] = useState(false)
  
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setLoading(true)
        
//         // Check if we have cached data for this page
//         if (pageCache[currentPage]) {
//           setArticles(pageCache[currentPage].articles)
//           setLastDoc(pageCache[currentPage].lastDoc)
//           setLoading(false)
//           return
//         }
        
//         // If going to page 1, reset lastDoc
//         let lastDocToUse = currentPage === 1 ? null : lastDoc
        
//         const { articles: fetchedArticles, lastVisible } = await getAllArticles(
//           ARTICLES_PER_PAGE,
//           lastDocToUse
//         )
        
//         // Update articles and lastDoc
//         setArticles(fetchedArticles)
//         setLastDoc(lastVisible)
        
//         // Cache the results
//         setPageCache(prev => ({
//           ...prev,
//           [currentPage]: {
//             articles: fetchedArticles,
//             lastDoc: lastVisible
//           }
//         }))
        
//         // Estimate total pages (this is an approximation since Firestore doesn't provide count)
//         setTotalPages(Math.max(currentPage, totalPages))
        
//       } catch (err) {
//         console.error('Error fetching articles:', err)
//         setError('No se pudieron cargar los artículos')
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchArticles()
//   }, [currentPage])
  
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     window.scrollTo(0, 0)
//   }
  
//   const handleDeleteArticle = async (id) => {
//     if (window.confirm('¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer.')) {
//       try {
//         setIsDeleting(true)
//         await deleteArticle(id)
        
//         // Update the articles list
//         setArticles(prevArticles => prevArticles.filter(article => article.id !== id))
        
//         // Clear cache to force refresh
//         setPageCache({})
        
//         toast.success('Artículo eliminado correctamente')
//       } catch (error) {
//         console.error('Error deleting article:', error)
//         toast.error('Error al eliminar el artículo')
//       } finally {
//         setIsDeleting(false)
//       }
//     }
//   }
  
//   if (loading && currentPage === 1) return <LoadingSpinner />
  
//   if (error) return <div className="text-red-500 text-center py-4">{error}</div>
  
//   return (
//     <>
//       <Helmet>
//         <title>Administrar Artículos - Portal de Noticias</title>
//       </Helmet>
      
//       <div>
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Administrar Artículos</h1>
//           <Link to="/admin/articulos/crear" className="btn btn-primary">
//             Crear Artículo
//           </Link>
//         </div>
        
//         {articles.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <p className="text-gray-500 mb-4">No hay artículos disponibles</p>
//             <Link to="/admin/articulos/crear" className="btn btn-primary">
//               Crear tu primer artículo
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Título
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Categoría
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Estado
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Fecha
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Acciones
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {articles.map((article) => {
//                       const categoryInfo = getCategoryById(article.category)
//                       const subcategoryInfo = article.subcategory ? 
//                         getSubcategoryById(article.category, article.subcategory) : null
                      
//                       return (
//                         <tr key={article.id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
//                               {article.title}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-500">
//                               {categoryInfo?.name || article.category}
//                               {subcategoryInfo && ` / ${subcategoryInfo.name}`}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex flex-wrap gap-1">
//                               {article.featured && (
//                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-50 text-red-600">
//                                   Destacado
//                                 </span>
//                               )}
//                               {article.autoDelete && (
//                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                   Auto-eliminar
//                                 </span>
//                               )}
//                               {!article.featured && !article.autoDelete && (
//                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
//                                   Normal
//                                 </span>
//                               )}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {article.createdAt?.toDate ? 
//                               new Date(article.createdAt.toDate()).toLocaleDateString() : 
//                               'N/A'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                             <Link 
//                               to={`/admin/articulos/editar/${article.id}`} 
//                               className="text-primary-600 hover:text-primary-900 mr-4"
//                             >
//                               Editar
//                             </Link>
//                             <Link 
//                               to={`/articulo/${article.id}`} 
//                               target="_blank" 
//                               className="text-gray-600 hover:text-gray-900 mr-4"
//                             >
//                               Ver
//                             </Link>
//                             <button
//                               onClick={() => handleDeleteArticle(article.id)}
//                               disabled={isDeleting}
//                               className="text-red-600 hover:text-red-900"
//                             >
//                               Eliminar
//                             </button>
//                           </td>
//                         </tr>
//                       )
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
            
//             <Pagination 
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </>
//         )}
//       </div>
//     </>
//   )
// }

// export default Articles









import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAllArticles, deleteArticle } from "../../services/articleService";
import { getCategoryById, getSubcategoryById } from "../../utils/categories";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";
import toast from "react-hot-toast";

const ARTICLES_PER_PAGE = 10;

const Articles = () => {
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

        // Check if we have cached data for this page
        if (pageCache[currentPage]) {
          setArticles(pageCache[currentPage].articles);
          setLastDoc(pageCache[currentPage].lastDoc);
          setLoading(false);
          return;
        }

        // If going to page 1, reset lastDoc
        let lastDocToUse = currentPage === 1 ? null : lastDoc;

        const {
          articles: fetchedArticles,
          lastVisible,
          totalCount,
        } = await getAllArticles(ARTICLES_PER_PAGE, lastDocToUse);

        // Update articles and lastDoc
        setArticles(fetchedArticles);
        setLastDoc(lastVisible);

        // Cache the results
        setPageCache((prev) => ({
          ...prev,
          [currentPage]: {
            articles: fetchedArticles,
            lastDoc: lastVisible,
          },
        }));

        // Calculate total pages based on totalCount
        if (totalCount) {
          setTotalPages(Math.ceil(totalCount / ARTICLES_PER_PAGE));
        } else {
          // Estimate total pages based on fetched articles
          if (fetchedArticles.length < ARTICLES_PER_PAGE) {
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
  }, [currentPage]);

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

        // Update the articles list
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== id)
        );

        // Clear cache to force refresh
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

  if (loading && currentPage === 1) return <LoadingSpinner />;

  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Administrar Artículos - Portal de Noticias</title>
      </Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administrar Artículos</h1>
          <Link to="/admin/articulos/crear" className="btn btn-primary">
            Crear Artículo
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">No hay artículos disponibles</p>
            <Link to="/admin/articulos/crear" className="btn btn-primary">
              Crear tu primer artículo
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Título
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Categoría
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => {
                      const categoryInfo = getCategoryById(article.category);
                      const subcategoryInfo = article.subcategory
                        ? getSubcategoryById(
                            article.category,
                            article.subcategory
                          )
                        : null;

                      return (
                        <tr key={article.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {article.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {categoryInfo?.name || article.category}
                              {subcategoryInfo && ` / ${subcategoryInfo.name}`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {article.featured && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-50 text-red-600">
                                  Destacado
                                </span>
                              )}
                              {article.autoDelete && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Auto-eliminar
                                </span>
                              )}
                              {!article.featured && !article.autoDelete && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                                  Normal
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {article.createdAt?.toDate
                              ? new Date(
                                  article.createdAt.toDate()
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/admin/articulos/editar/${article.id}`}
                              className="text-primary-600 hover:text-primary-900 mr-4"
                            >
                              Editar
                            </Link>
                            <Link
                              to={`/articulo/${article.id}`}
                              target="_blank"
                              className="text-gray-600 hover:text-gray-900 mr-4"
                            >
                              Ver
                            </Link>
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                              disabled={isDeleting}
                              className="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

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