import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useAuth } from './contexts/AuthContext'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Components
import LoadingSpinner from './components/ui/LoadingSpinner'

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const SubcategoryPage = lazy(() => import('./pages/SubcategoryPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminArticles = lazy(() => import('./pages/admin/Articles'))
const AdminCreateArticle = lazy(() => import('./pages/admin/CreateArticle'))
const AdminEditArticle = lazy(() => import('./pages/admin/EditArticle'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="categoria/:category" element={<CategoryPage />} />
          <Route path="categoria/:category/:subcategory" element={<SubcategoryPage />} />
          <Route path="articulo/:id" element={<ArticlePage />} />
          <Route path="buscar" element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="articulos" element={<AdminArticles />} />
          <Route path="articulos/crear" element={<AdminCreateArticle />} />
          <Route path="articulos/editar/:id" element={<AdminEditArticle />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App