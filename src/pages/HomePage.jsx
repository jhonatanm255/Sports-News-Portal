// import React from 'react'
// import { Helmet } from 'react-helmet-async'
// import FeaturedArticles from '../components/ui/FeaturedArticles'
// import LatestArticles from '../components/ui/LatestArticles'
// import TwitterFeed from '../components/ui/TwitterFeed'

// const HomePage = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Portal de Noticias - Inicio</title>
//         <meta
//           name="description"
//           content="Las últimas noticias en News, Deportes, Farándula y más. Mantente informado con nuestro portal de noticias."
//         />
//       </Helmet>

//       <div className="grid grid-cols-1 lg:gap-6 lg:grid-cols-[75%_25%]">
//         <div>
//           <FeaturedArticles />
//           <LatestArticles />
//         </div>
//         <div className="lg:mt-14">
//           <TwitterFeed
//             accounts={[
//               "@UEFA",
//               "@sport",
//               "@WTA",
//               "@BBCWorld",
//               "@CNN",
//             ]}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default HomePage










import React from "react";
import { Helmet } from "react-helmet-async";
import FeaturedArticles from "../components/ui/FeaturedArticles";
import LatestArticles from "../components/ui/LatestArticles";
import OtherArticles from "../components/ui/OtherArticles";
import TwitterFeed from "../components/ui/TwitterFeed";

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección principal: Ocupa 2 columnas en pantallas grandes */}
        <div className="lg:col-span-2">
          <FeaturedArticles/>
          <LatestArticles />
        </div>

        {/* Sección lateral: TwitterFeed + Noticias adicionales */}
        <div className="lg:col-span-1 flex flex-col gap-6 mt-14">
          <div className="min-h-[500px]">
            <TwitterFeed
              accounts={["@realmadrid", "@LAFC_FANS", "@americademexico"]}
            />
          </div>
          {/* Noticias adicionales llenando los espacios vacíos */}
          <div className="grid gap-6">
            <OtherArticles />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;