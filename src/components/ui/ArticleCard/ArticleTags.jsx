import React from "react";

const ArticleTags = ({ category, subcategory }) => {
  return (
    <div className="flex gap-2 mt-2">
      <span className="text-xs font-medium bg-primary-600 text-white px-2 py-1 rounded">
        {category}
      </span>
      {subcategory && (
        <span className="text-xs font-medium bg-gray-300 text-gray-800 px-2 py-1 rounded">
          {subcategory}
        </span>
      )}
    </div>
  );
};

export default ArticleTags;
