import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - Portal de Noticias</title>
        <meta name="description" content="La página que estás buscando no existe o ha sido movida." />
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Página no encontrada</p>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </>
  )
}

export default NotFoundPage