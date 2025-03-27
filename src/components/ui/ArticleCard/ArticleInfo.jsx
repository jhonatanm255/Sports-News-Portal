const ArticleInfo = ({ title, content, date, size }) => {
  const textSize = {
    sm: "text-base font-semibold line-clamp-2",
    md: "text-base font-semibold line-clamp-2",
    lg: "text-lg font-semibold line-clamp-2",
    featured: "text-xl font-semibold line-clamp-2",
  };

  return (
    <>
      <h3 className={textSize[size]}>{title}</h3>
      {content && (
        <p className="text-sm line-clamp-2 text-gray-700 mt-1">{content}</p>
      )}
      <div className="mt-auto pt-3 text-sm text-gray-500">{date}</div>
    </>
  );
};

export default ArticleInfo;
