import React from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const AdminLayout = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Sesión cerrada correctamente')
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      toast.error('Error al cerrar sesión')
    }
  }
  
  const isActive = (path) => {
    return location.pathname === path
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <Link to="/" className="text-xl font-bold">Portal de Noticias</Link>
          <div className="text-sm text-gray-400 mt-1">Panel de Administración</div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="text-gray-400 text-sm">Conectado como:</div>
            <div className="font-medium truncate">{currentUser?.email}</div>
          </div>
          
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/admin" 
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    isActive('/admin') 
                      ? 'bg-primary-600 text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/articulos" 
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    location.pathname.includes('/admin/articulos') 
                      ? 'bg-primary-600 text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  Artículos
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-md text-red-300 hover:bg-gray-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout