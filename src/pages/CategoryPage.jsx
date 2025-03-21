import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticlesByCategory } from '../services/articleService'
import { getCategoryById } from '../utils/categories'
import ArticleGrid from '../components/ui/ArticleGrid'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Pagination from '../components/ui/Pagination'

const ARTICLES_PER_PAGE = 9

const CategoryPage = () => {
  const { category } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [lastDoc, setLastDoc] = useState(null)
  const [pageCache, setPageCache] = useState({})
  
  const categoryInfo = getCategoryById(category)
  
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
        
        const { articles: fetchedArticles, lastVisible } = await getArticlesByCategory(
          category,
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
        // In a real app, you might want to store the count in a separate document
        setTotalPages(Math.max(currentPage, totalPages))
        
      } catch (err) {
        console.error('Error fetching category articles:', err)
        setError('No se pudieron cargar los artículos de esta categoría')
      } finally {
        setLoading(false)
      }
    }
    
    fetchArticles()
  }, [category, currentPage])
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }
  
  if (loading && currentPage === 1) return <LoadingSpinner />
  
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>
  
  if (articles.length === 0 && !loading) {
    return <div className="text-gray-500 text-center py-4 min-h-screen">No hay artículos en esta categoría</div>
  }
  
  return (
    <>
      <Helmet>
        <title>{categoryInfo ? `${categoryInfo.name} - Portal de Noticias` : 'Categoría - Portal de Noticias'}</title>
        <meta 
          name="description" 
          content={`Noticias de ${categoryInfo ? categoryInfo.name : 'esta categoría'}. Las últimas actualizaciones y artículos.`} 
        />
      </Helmet>
      
      <div>
        <h1 className="text-3xl font-bold mb-6">{categoryInfo ? categoryInfo.name : 'Categoría'}</h1>
        
        {loading && currentPage > 1 ? (
          <LoadingSpinner />
        ) : (
          <>
            <ArticleGrid articles={articles} columns={3} />
            
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
    </>
  )
}

export default CategoryPage
