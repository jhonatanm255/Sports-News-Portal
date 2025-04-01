import React from "react";

const ArticleImage = ({ imageUrl, title, size }) => {
  return (
    <div className={`${size} overflow-hidden bg-gray-200`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <span className="text-gray-400">Sin imagen</span>
        </div>
      )}
    </div>
  );
};

export default ArticleImage;
