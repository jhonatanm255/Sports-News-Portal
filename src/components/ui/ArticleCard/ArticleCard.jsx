import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ArticleImage from "./ArticleImage";
import ArticleInfo from "./ArticleInfo";
import ArticleTags from "./ArticleTags";

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

  const currentSize = featured ? "featured" : size;

  return (
    <Link
      to={`/articulo/${id}`}
      className={`card group transition-transform duration-300 hover:-translate-y-1 flex ${
        is_complementary ? "items-center h-auto" : "flex-col h-full"
      }`}
    >
      <ArticleImage
        imageUrl={imageUrl}
        title={title}
        size={is_complementary ? "w-1/4 h-24 mr-4" : cardSizes[currentSize]}
      />
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
