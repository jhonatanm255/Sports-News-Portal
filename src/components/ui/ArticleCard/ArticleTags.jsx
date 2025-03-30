// import React from "react";

// const ArticleTags = ({ category, subcategory }) => {
//   return (
//     <div className="flex gap-2 mt-2">
//       <span className="text-xs font-medium bg-primary-600 text-white px-2 py-1 rounded">
//         {category}
//       </span>
//       {subcategory && (
//         <span className="text-xs font-medium bg-gray-300 text-gray-800 px-2 py-1 rounded">
//           {subcategory}
//         </span>
//       )}
//     </div>
//   );
// };

// export default ArticleTags;











import React from "react";

const ArticleTags = ({ category, subcategory }) => {
  // Definición de colores para categorías principales
  const getCategoryColor = (cat) => {
    switch (cat.toLowerCase()) {
      case "deportes":
        return "bg-primary-600 text-white"; // Azul (color original)
      case "noticias":
        return "bg-green-600 text-white"; // Verde
      case "farándula":
      case "farandula":
        return "bg-[#E39A3B] text-white"; // Naranja
      default:
        return "bg-gray-600 text-white"; // Color por defecto
    }
  };

  // Colores para subcategorías (tonos más claros)
  const getSubcategoryColor = (cat) => {
    switch (cat.toLowerCase()) {
      case "deportes":
        return "bg-primary-100 text-primary-800"; // Azul claro
      case "noticias":
        return "bg-green-100 text-green-800"; // Verde claro
      case "farándula":
      case "farandula":
        return "bg-orange-100 text-orange-800"; // Naranja claro
      default:
        return "bg-gray-200 text-gray-800"; // Gris claro
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
