import React from 'react'
import { Helmet } from 'react-helmet-async'
import FeaturedArticles from '../components/ui/FeaturedArticles'
import LatestArticles from '../components/ui/LatestArticles'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Portal de Noticias - Inicio</title>
        <meta
          name="description"
          content="Las últimas noticias en News, Deportes, Farándula y más. Mantente informado con nuestro portal de noticias."
        />
      </Helmet>

      <div>
        <FeaturedArticles />
        <LatestArticles />
      </div>
    </>
  );
}

export default HomePage