import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const { login, currentUser, loading } = useAuth()
  const navigate = useNavigate()
  
  // Redirect if already logged in
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (currentUser) {
    return <Navigate to="/admin" replace />
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Por favor ingresa tu correo y contraseña')
      return
    }
    
    try {
      setError('')
      setIsSubmitting(true)
      await login(email, password)
      toast.success('Inicio de sesión exitoso')
      navigate('/admin')
    } catch (err) {
      console.error('Error logging in:', err)
      setError('Credenciales incorrectas. Por favor intenta de nuevo.')
      toast.error('Error al iniciar sesión')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - Portal de Noticias</title>
        <meta name="description" content="Inicia sesión para administrar el portal de noticias" />
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h1>
        
        <div className="w-96 card p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="label">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="tu@correo.com"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="label">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                disabled={isSubmitting}
              />
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Iniciando sesión...</span>
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage