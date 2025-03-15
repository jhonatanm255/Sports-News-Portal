import React, { useEffect } from "react";

const TwitterWidget = ({ account, height = 300, tweetLimit = 5 }) => {
  useEffect(() => {
    // Verifica si el script de Twitter ya está cargado
    if (!window.twttr) {
      // Cargar el script de Twitter de manera síncrona
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = false; // Cargar de manera síncrona
      script.onload = () => {
        // Forzar la recarga de los widgets después de cargar el script
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };
      document.body.appendChild(script);
    } else {
      // Si el script ya está cargado, forzar la recarga de los widgets
      window.twttr.widgets.load();
    }

    // No es necesario eliminar el script al desmontar
  }, [account, tweetLimit]); // Recargar el widget si la cuenta o el límite cambian

  return (
    <div className="twitter-widget mb-6">
      <a
        className="twitter-timeline"
        data-height={height}
        data-tweet-limit={tweetLimit} // Limitar a 5 tweets
        href={`https://twitter.com/${account.replace("@", "")}`}
      >
        Tweets de {account}
      </a>
    </div>
  );
};

export default React.memo(TwitterWidget); // Evita re-renderizados innecesarios
