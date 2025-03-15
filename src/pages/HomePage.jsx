import React from 'react'
import { Helmet } from 'react-helmet-async'
import FeaturedArticles from '../components/ui/FeaturedArticles'
import LatestArticles from '../components/ui/LatestArticles'
import TwitterFeed from '../components/ui/TwitterFeed'

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[75%_25%]">
        <div>
          <FeaturedArticles />
          <LatestArticles />
        </div>
        <div className="mt-14">
          <TwitterFeed
            accounts={[
              "@UEFA",
              "@sport",
              "@WTA",
              "@BBCWorld",
              "@CNN",
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage
