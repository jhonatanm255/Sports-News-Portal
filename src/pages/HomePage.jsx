import React from "react";
import { Helmet } from "react-helmet-async";
import FeaturedArticles from "../components/ui/FeaturedArticles";
import LatestArticles from "../components/ui/LatestArticles";
import OtherArticles from "../components/ui/OtherArticles";
import TwitterFeed from "../components/ui/TwitterFeed";
import useMediaQuery from "../hooks/useMediaQuery";

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const twitterAccounts = ["realmadrid", "LAFC", "TheChampions"];

  // Función para intercalar Twitter feeds con artículos en móvil
  const renderInterleavedContent = () => {
    if (!isMobile) {
      return (
        <>
          <FeaturedArticles />
          <LatestArticles />
        </>
      );
    }

    // Suponiendo que obtenemos los artículos reales
    const articles = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      type: "article",
    }));
    const groupedContent = [];
    let twitterIndex = 0;

    for (let i = 0; i < articles.length; i += 3) {
      groupedContent.push(
        <div key={`articles-${i}`}>
          {i === 0 ? (
            <FeaturedArticles />
          ) : (
            <LatestArticles startIndex={i} count={3} />
          )}
        </div>
      );

      // Agregar TwitterFeed si aún hay cuentas por mostrar
      if (twitterIndex < twitterAccounts.length) {
        groupedContent.push(
          <div key={`twitter-${twitterIndex}`} className="my-6">
            <TwitterFeed
              accounts={[twitterAccounts[twitterIndex]]}
              singleAccountMode
              mobileHeight="350px"
            />
          </div>
        );
        twitterIndex++;
      }
    }

    // Agregar OtherArticles al final en móvil
    groupedContent.push(
      <div key="other-articles" className="mt-6">
        <OtherArticles />
      </div>
    );

    return groupedContent;
  };

  return (
    <>
      <Helmet>
        <title>Portal de Noticias - Inicio</title>
        <meta
          name="description"
          content="Las últimas noticias en News, Deportes, Farándula y más. Mantente informado con nuestro portal de noticias."
        />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sección principal */}
        <div className="lg:col-span-2">{renderInterleavedContent()}</div>

        {/* Sidebar - Solo en desktop */}
        {!isMobile && (
          <div className="lg:col-span-1 flex flex-col gap-6 mt-14">
            <div className="min-h-[600px]">
              <TwitterFeed accounts={twitterAccounts} />
            </div>
            <div className="grid gap-6">
              <OtherArticles />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
