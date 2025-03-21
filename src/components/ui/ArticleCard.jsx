import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ArticleCard = ({ article, size = "md" }) => {
  const {
    id,
    title,
    imageUrl,
    category,
    subcategory,
    createdAt,
    featured,
    content,
    is_complementary, // Nuevo campo para las noticias complementarias
  } = article;

  // Format date
  const formattedDate = createdAt?.toDate
    ? format(createdAt.toDate(), "dd MMM yyyy", { locale: es })
    : "Fecha no disponible";

  // Remove HTML tags from content
  const cleanContent = content.replace(/<[^>]+>/g, "");

  // Diferentes tamaños de tarjeta
  const cardSizes = {
    sm: {
      container: "flex flex-col h-full",
      image: "h-40",
      title: "text-base font-semibold line-clamp-2",
      content: "text-sm line-clamp-2 text-gray-700 mt-1",
    },
    md: {
      container: "flex flex-col h-full",
      image: "h-48",
      title: "text-base font-semibold line-clamp-2",
      content: "text-sm line-clamp-2 text-gray-700 mt-1",
    },
    lg: {
      container: "flex flex-col h-full",
      image: "h-64",
      title: "text-base font-semibold line-clamp-2",
      content: "text-sm line-clamp-2 text-gray-700 mt-1",
    },
    featured: {
      container: "flex flex-col h-full",
      image: "h-72 md:h-96",
      title: "text-base font-semibold line-clamp-2",
      content: "text-sm line-clamp-2 text-gray-700 mt-1",
    },
  };

  const currentSize = featured ? "featured" : size;
  const sizeClass = cardSizes[currentSize];

  // Estilo para las noticias complementarias
  const complementaryCardStyles = {
    container: "flex items-center h-auto", // flex horizontal
    image: "w-1/4 h-24 mr-4", // Ajusta el tamaño de la imagen
    title: "pt-2 text-sm font-semibold line-clamp-2",
    content: "text-sm line-clamp-2 text-gray-700",
  };

  return is_complementary ? (
    // Card de noticias complementarias (horizontal)
    <Link
      to={`/articulo/${id}`}
      className={`card group transition-transform duration-300 hover:-translate-y-1 ${complementaryCardStyles.container}`}
    >
      <div
        className={`${complementaryCardStyles.image} overflow-hidden bg-gray-200`}
      >
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

      <div className="flex flex-col w-2/3">
        <h3 className={complementaryCardStyles.title}>{title}</h3>
        {/* {cleanContent && (
          <p className={complementaryCardStyles.content}>{cleanContent}</p>
        )} */}

        <div className="flex justify-end mt-auto pt-2 pb-1 text-sm text-gray-500">
          {formattedDate}

          {/* <div className="flex gap-2">
            <span className="text-xs font-medium bg-primary-600 text-white px-2 py-1 rounded">
              {category}
            </span>
            {subcategory && (
              <span className="text-xs font-medium bg-gray-300 text-gray-800 px-2 py-1 rounded">
                {subcategory}
              </span>
            )}
          </div> */}
        </div>
      </div>
    </Link>
  ) : (
    // Card estándar para las noticias normales
    <Link
      to={`/articulo/${id}`}
      className={`card group transition-transform duration-300 hover:-translate-y-1 ${sizeClass.container}`}
    >
      <div className="relative">
        <div className={`${sizeClass.image} overflow-hidden bg-gray-200`}>
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

        {featured && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Destacado
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex gap-2">
            <span className="text-xs font-medium bg-primary-600 text-white px-2 py-1 rounded">
              {category}
            </span>
            {subcategory && (
              <span className="text-xs font-medium bg-white/80 text-gray-800 px-2 py-1 rounded">
                {subcategory}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className={sizeClass.title}>{title}</h3>
        {cleanContent && <p className={sizeClass.content}>{cleanContent}</p>}
        <div className="mt-auto pt-3 text-sm text-gray-500">
          {formattedDate}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
