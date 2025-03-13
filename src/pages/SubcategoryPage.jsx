import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticlesBySubcategory } from '../services/articleService'
import { getCategoryById, getSubcategoryById } from '../utils/categories'
import ArticleGrid from '../components/ui/ArticleGrid'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Pagination from '../components/ui/Pagination'
import TwitterFeed from '../components/ui/TwitterFeed'

const ARTICLES_PER_PAGE = 9

const SubcategoryPage = () => {
  const { category, subcategory } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [lastDoc, setLastDoc] = useState(null)
  const [pageCache, setPageCache] = useState({})
  
  const categoryInfo = getCategoryById(category)
  const subcategoryInfo = getSubcategoryById(category, subcategory)
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        
        // Check if we have cached data for this page
        if (pageCache[currentPage]) {
          setArticles(pageCache[currentPage].articles)
          setLastDoc(pageCache[currentPage].lastDoc)
          setLoading(false)
          return
        }
        
        // If going to page 1, reset lastDoc
        let lastDocToUse = currentPage === 1 ? null : lastDoc
        
        const { articles: fetchedArticles, lastVisible } = await getArticlesBySubcategory(
          category,
          subcategory,
          ARTICLES_PER_PAGE,
          lastDocToUse
        )
        
        // Update articles and lastDoc
        setArticles(fetchedArticles)
        setLastDoc(lastVisible)
        
        // Cache the results
        setPageCache(prev => ({
          ...prev,
          [currentPage]: {
            articles: fetchedArticles,
            lastDoc: lastVisible
          }
        }))
        
        // Estimate total pages (this is an approximation since Firestore doesn't provide count)
        setTotalPages(Math.max(currentPage, totalPages))
        
      } catch (err) {
        console.error('Error fetching subcategory articles:', err)
        setError('No se pudieron cargar los artículos de esta subcategoría')
      } finally {
        setLoading(false)
      }
    }
    
    fetchArticles()
  }, [category, subcategory, currentPage])
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }
  
  if (loading && currentPage === 1) return <LoadingSpinner />
  
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>
  
  // Check if this subcategory has Twitter accounts
  const hasTwitterAccounts = subcategoryInfo?.twitterAccounts && subcategoryInfo.twitterAccounts.length > 0
  
  return (
    <>
      <Helmet>
        <title>
          {subcategoryInfo 
            ? `${subcategoryInfo.name} - ${categoryInfo?.name || 'Categoría'} - Portal de Noticias` 
            : 'Subcategoría - Portal de Noticias'}
        </title>
        <meta 
          name="description" 
          content={`Noticias de ${subcategoryInfo ? subcategoryInfo.name : 'esta subcategoría'}. Las últimas actualizaciones y artículos.`} 
        />
      </Helmet>
      
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{subcategoryInfo ? subcategoryInfo.name : 'Subcategoría'}</h1>
          <p className="text-gray-600">
            {categoryInfo ? categoryInfo.name : 'Categoría'}
          </p>
        </div>
        
        {loading && currentPage > 1 ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Articles section */}
            <div className={`${hasTwitterAccounts ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              {articles.length === 0 && !loading ? (
                <div className="text-gray-500 text-center py-4">No hay artículos en esta subcategoría</div>
              ) : (
                <>
                  <ArticleGrid articles={articles} columns={hasTwitterAccounts ? 2 : 3} />
                  
                  {articles.length > 0 && (
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
            
            {/* Twitter feed for sports categories */}
            {hasTwitterAccounts && (
              <div className="lg:col-span-1">
                <TwitterFeed accounts={subcategoryInfo.twitterAccounts} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default SubcategoryPage