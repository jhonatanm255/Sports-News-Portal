import React from "react";

const ArticleTags = ({ category, subcategory }) => {
  const getCategoryColor = (cat) => {
    switch (cat.toLowerCase()) {
      case "deportes":
        return "bg-primary-600 text-white";
      case "noticias":
        return "bg-green-600 text-white";
      case "farándula":
      case "farandula":
        return "bg-[#E39A3B] text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getSubcategoryColor = (cat) => {
    switch (cat.toLowerCase()) {
      case "deportes":
        return "bg-primary-100 text-primary-800";
      case "noticias":
        return "bg-green-100 text-green-800";
      case "farándula":
      case "farandula":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {/* Tag de categoría principal */}
      <span
        className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(
          category
        )}`}
      >
        {category}
      </span>

      {/* Tag de subcategoría (si existe) */}
      {subcategory && (
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${getSubcategoryColor(
            category
          )}`}
        >
          {subcategory}
        </span>
      )}
    </div>
  );
};

export default ArticleTags;
