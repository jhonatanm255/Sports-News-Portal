import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleGrid = ({ articles, columns = 3 }) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;





// import React from "react";
// import ArticleCard from "./ArticleCard";

// const ArticleGrid = ({ articles }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {articles.map((article, index) => (
//         <div key={article.id} className={index === 4 ? "lg:col-span-2" : ""}>
//           <ArticleCard article={article} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ArticleGrid;