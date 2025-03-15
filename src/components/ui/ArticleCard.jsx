import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'


const ArticleCard = ({ article, size = 'md' }) => {
  const { id, title, imageUrl, category, subcategory, createdAt, featured } = article
  
  // Format date
  const formattedDate = createdAt?.toDate ? 
    format(createdAt.toDate(), 'dd MMM yyyy', { locale: es }) : 
    'Fecha no disponible'
  
  // Different card sizes
 const cardSizes = {
   sm: {
     container: "flex flex-col h-full",
     image: "h-40",
     title: "text-base line-clamp-2",
   },
   md: {
     container: "flex flex-col h-full",
     image: "h-48",
     title: "text-lg line-clamp-2",
   },
   lg: {
     container: "flex flex-col h-full",
     image: "h-64",
     title: "text-xl line-clamp-3",
   },
   featured: {
     container: "flex flex-col h-full",
     image: "h-72 md:h-96",
     title: "text-xl md:text-2xl line-clamp-2", // Aumentamos el tamaño aquí
   },
 };

  
  const currentSize = featured ? 'featured' : size
  const sizeClass = cardSizes[currentSize]
  
  return (
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
        <div className="mt-auto pt-3 text-sm text-gray-500">
          {formattedDate}
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard