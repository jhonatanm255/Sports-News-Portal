import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import categories from '../../utils/categories'
import SocialLinks from './SocialLinks'

const CategoryNav = () => {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState(null)
  
  const isActive = (path) => {
    return location.pathname === path
  }
  
  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId)
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <ul className="flex">
            <li>
              <Link
                to="/"
                className={`block px-4 py-3 font-medium hover:text-primary-600 border-b-2 ${
                  isActive("/")
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent"
                }`}
              >
                Inicio
              </Link>
            </li>

            {categories.map((category) => (
              <li key={category.id} className="group relative">
                <Link
                  to={`/categoria/${category.id}`}
                  className={`block px-4 py-3 font-medium hover:text-primary-600 border-b-2 ${
                    location.pathname.includes(`/categoria/${category.id}`)
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent"
                  }`}
                >
                  {category.name}
                </Link>

                {/* Dropdown */}
                <div className="absolute left-0 z-10 w-48 py-2 bg-white rounded-b-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/categoria/${category.id}/${subcategory.id}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary-600"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <SocialLinks />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <ul className="flex flex-col">
            <li>
              <Link
                to="/"
                className={`block px-4 py-3 font-medium hover:text-primary-600 ${
                  isActive("/") ? "text-primary-600" : ""
                }`}
              >
                Inicio
              </Link>
            </li>

            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`flex justify-between items-center w-full px-4 py-3 font-medium hover:text-primary-600 ${
                    location.pathname.includes(`/categoria/${category.id}`)
                      ? "text-primary-600"
                      : ""
                  }`}
                >
                  <span>{category.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
                      activeCategory === category.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {activeCategory === category.id && (
                  <div className="bg-gray-50 py-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/categoria/${category.id}/${subcategory.id}`}
                        className="block px-8 py-2 text-sm hover:bg-gray-100 hover:text-primary-600"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CategoryNav