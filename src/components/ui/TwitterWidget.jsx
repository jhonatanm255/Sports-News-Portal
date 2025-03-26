import React, { useState, useEffect } from "react";

const TwitterWidget = ({ account, height = 300 }) => {
  const [loaded, setLoaded] = useState(false);
  const cleanAccount = account.replace("@", "");
  const nitterUrl = `https://nitter.net/${cleanAccount}/with_replies?theme=dark`;

  useEffect(() => {
    setLoaded(false); // Reset al cambiar de cuenta
  }, [account]);

  return (
    <div
      className="relative w-full bg-gray-100 rounded-lg overflow-hidden"
      style={{ height: "510px" }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse text-gray-500">
            Cargando tweets de @{cleanAccount}...
          </div>
        </div>
      )}
      <iframe
        src={nitterUrl}
        style={{ marginTop: "-470px", height: "200%" }}
        className={`w-full h-full border-none${
          loaded ? "visible" : "invisible"
        }`}
        onLoad={() => setLoaded(true)}
        title={`Twitter Timeline de @${cleanAccount}`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
      <a
        href={`https://twitter.com/${cleanAccount}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-xs text-blue-500 hover:underline bg-white/80 px-2 py-1 rounded"
      >
        Ver en Twitter
      </a>
    </div>
  );
};

export default React.memo(TwitterWidget);