import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ArticleImage from "./ArticleImage";
import ArticleInfo from "./ArticleInfo";
import ArticleTags from "./ArticleTags";

const ArticleCard = ({ article, size = "md", featuredTag = false }) => {
  const {
    id,
    title,
    imageUrl,
    category,
    subcategory,
    createdAt,
    content,
    is_complementary,
  } = article;

  const formattedDate = createdAt?.toDate
    ? format(createdAt.toDate(), "dd MMM yyyy", { locale: es })
    : "Fecha no disponible";

  const cleanContent = content.replace(/<[^>]+>/g, "");

  const cardSizes = {
    sm: "h-40",
    md: "h-48",
    lg: "h-64",
    featured: "h-72 md:h-96",
  };

  const currentSize = featuredTag ? "featured" : size;

  return (
    <Link
      to={`/articulo/${id}`}
      className={`card group transition-transform duration-300 hover:-translate-y-1 flex ${
        is_complementary ? "items-center h-auto" : "flex-col h-full"
      }`}
    >
      <div
        className={
          is_complementary
            ? "relative w-1/4 h-24 mr-4"
            : `relative ${cardSizes[currentSize]}`
        }
      >
        <ArticleImage
          imageUrl={imageUrl}
          title={title}
          size={is_complementary ? "w-full h-full" : "w-full h-full"}
        />
        {featuredTag && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Destacado
          </span>
        )}
      </div>

      <div
        className={
          is_complementary
            ? "flex flex-col w-2/3"
            : "p-4 flex flex-col flex-grow"
        }
      >
        <ArticleInfo
          title={title}
          content={cleanContent}
          date={formattedDate}
          size={size}
        />
        {!is_complementary && (
          <ArticleTags category={category} subcategory={subcategory} />
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
