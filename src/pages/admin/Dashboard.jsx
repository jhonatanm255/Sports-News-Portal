import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getAllArticles, getFeaturedArticles } from '../../services/index'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    featuredArticles: 0,
    recentArticles: []
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Get total articles (limited to 100 for this example)
        const { articles } = await getAllArticles(100)
        
        // Get featured articles
        const featured = await getFeaturedArticles(100)
        
        // Set stats
        setStats({
          totalArticles: articles.length,
          featuredArticles: featured.length,
          recentArticles: articles.slice(0, 5) // Get 5 most recent articles
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return (
    <>
      <Helmet>
        <title>Dashboard - Portal de Noticias</title>
      </Helmet>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link to="/admin/articulos/crear" className="btn btn-primary">
            Crear Artículo
          </Link>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">Total de Artículos</h2>
            <p className="text-3xl font-bold">{stats.totalArticles}</p>
            <Link to="/admin/articulos" className="text-primary-600 text-sm mt-4 inline-block">
              Ver todos los artículos →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">Artículos Destacados</h2>
            <p className="text-3xl font-bold">{stats.featuredArticles}</p>
            <Link to="/admin/articulos" className="text-primary-600 text-sm mt-4 inline-block">
              Administrar destacados →
            </Link>
          </div>
        </div>
        
        {/* Recent Articles */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Artículos Recientes</h2>
          
          {stats.recentArticles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentArticles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {article.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {article.category}
                          {article.subcategory && ` / ${article.subcategory}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.featured 
                            ? 'bg-secondary-100 text-secondary-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {article.featured ? 'Destacado' : 'Normal'}
                        </span>
                        {article.autoDelete && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Auto-eliminar
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {article.createdAt?.toDate ? 
                          new Date(article.createdAt.toDate()).toLocaleDateString() : 
                          'N/A'}
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
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No hay artículos recientes</p>
          )}
          
          <div className="mt-4 text-right">
            <Link to="/admin/articulos" className="text-primary-600 hover:text-primary-800">
              Ver todos los artículos →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard