import React from "react";
import { Link } from "react-router-dom";
import { getCategoryById, getSubcategoryById } from "../../../utils/categories";

const ArticleRow = ({ article, isDeleting, onDelete }) => {
  const categoryInfo = getCategoryById(article.category);
  const subcategoryInfo = article.subcategory
    ? getSubcategoryById(article.category, article.subcategory)
    : null;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
          {article.title}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {categoryInfo?.name || article.category}
          {subcategoryInfo && ` / ${subcategoryInfo.name}`}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-1">
          {article.featured && (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-50 text-red-600">
              Destacado
            </span>
          )}
          {article.autoDelete && (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Auto-eliminar
            </span>
          )}
          {!article.featured && !article.autoDelete && (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
              Normal
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {article.createdAt?.toDate
          ? new Date(article.createdAt.toDate()).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          to={`/admin/articulos/editar/${article.id}`}
          className="text-primary-600 hover:text-primary-900 mr-4"
        >
          Editar
        </Link>
        <Link
          to={`/articulo/${article.id}`}
          target="_blank"
          className="text-gray-600 hover:text-gray-900 mr-4"
        >
          Ver
        </Link>
        <button
          onClick={() => onDelete(article.id)}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-900"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ArticleRow;
