// import React, { useEffect } from "react";

// const TwitterWidget = ({ account, height = 300, tweetLimit = 5 }) => {
//   useEffect(() => {
//     // Verifica si el script de Twitter ya está cargado
//     if (!window.twttr) {
//       // Cargar el script de Twitter de manera síncrona
//       const script = document.createElement("script");
//       script.src = "https://platform.twitter.com/widgets.js";
//       script.async = false; // Cargar de manera síncrona
//       script.onload = () => {
//         // Forzar la recarga de los widgets después de cargar el script
//         if (window.twttr && window.twttr.widgets) {
//           window.twttr.widgets.load();
//         }
//       };
//       document.body.appendChild(script);
//     } else {
//       // Si el script ya está cargado, forzar la recarga de los widgets
//       window.twttr.widgets.load();
//     }

//     // No es necesario eliminar el script al desmontar
//   }, [account, tweetLimit]); // Recargar el widget si la cuenta o el límite cambian

//   return (
//     <div className="twitter-widget h-auto mb-6">
//       <a
//         className="twitter-timeline"
//         data-height={height}
//         data-tweet-limit={tweetLimit} // Limitar a 5 tweets
//         href={`https://twitter.com/${account.replace("@", "")}`}
//       >
//         Tweets de {account}
//       </a>
//     </div>
//   );
// };

// export default React.memo(TwitterWidget); // Evita re-renderizados innecesarios





// import React from "react";

// const TwitterWidget = ({ account, height = 300 }) => {
//   // URL de Nitter para el timeline de la cuenta (solo tweets)
//   const nitterUrl = `https://nitter.net/${account.replace(
//     "@",
//     ""
//   )}/with_replies`;

//   return (
//     <div
//       className="twitter-widget h-auto mb-1"
//       style={{ overflow: "hidden", height: `${height}px` }}
//     >
//       <iframe
//         src={nitterUrl}
//         style={{
//           border: "none",
//           borderRadius: "10px",
//           width: "105%",
//           height: "100%",
//           marginTop: "-50px",
//         }} // Ajusta el margen para ocultar el encabezado
//         title={`Twitter Timeline de ${account}`}
//       />
//     </div>
//   );
// };

// export default React.memo(TwitterWidget);









import React, { useEffect } from "react";

const TwitterWidget = ({ account, height = 300, tweetLimit = 5 }) => {
  // Función para detectar si el navegador es Firefox o Safari
  const isFirefoxOrSafari = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      userAgent.includes("firefox") ||
      (userAgent.includes("safari") && !userAgent.includes("chrome"))
    );
  };

  // Cargar el widget de Twitter solo si no es Firefox o Safari
  useEffect(() => {
    if (!isFirefoxOrSafari()) {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = false; // Cargar de manera síncrona
        script.onload = () => {
          if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
          }
        };
        document.body.appendChild(script);
      } else {
        window.twttr.widgets.load();
      }
    }
  }, [account, tweetLimit]);

  // Renderizar el widget de Nitter en Firefox o Safari
  if (isFirefoxOrSafari()) {
   const nitterUrl = `https://nitter.net/${account.replace(
     "@",
     ""
   )}/with_replies?theme=light`;


    return (
      <div
        className="w-full h-auto mb-1 rounded-xl bg-white"
        style={{ overflow: "hidden", height: `${height}px` }}
      >
        <iframe
          src={nitterUrl}
          style={{
            border: "none",
            borderRadius: "16px",
            width: "100%",
            height: "200%",
            marginTop: "-470px",
            background: "white",
            filter: "none",
            colorScheme: "light",
          }}
          title={`Twitter Timeline de ${account}`}
        />
      </div>
    );
  }

  // Renderizar el widget oficial de Twitter en otros navegadores
  return (
    <div className="twitter-widget h-auto mb-6">
      <a
        className="twitter-timeline"
        data-height={height}
        data-tweet-limit={tweetLimit}
        data-theme="dark"
        href={`https://twitter.com/${account.replace("@", "")}`}
      >
        Tweets de {account}
      </a>
    </div>
  );
};

export default React.memo(TwitterWidget);
