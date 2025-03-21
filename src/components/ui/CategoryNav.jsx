// // PENDIENTE PORCOMPONETIZAR
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import categories from "../../utils/categories";
import SocialLinks from "./SocialLinks";

const CategoryNav = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // Estado para controlar la fijación

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      if (window.scrollY > headerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full z-50 bg-white shadow-md ${
        isFixed ? "fixed top-0" : "relative"
      }`}
    >
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
          {/* Barra superior con botón de menú hamburguesa a la izquierda y redes sociales a la derecha */}
          <div className="flex justify-between items-center p-4">
            {/* Botón de menú hamburguesa (izquierda) */}
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>

            {/* Iconos de redes sociales (derecha) */}
            <SocialLinks />
          </div>

          {/* Menú móvil con transición y animación (ahora desde la izquierda) */}
          <div
            className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Botón de cerrar (X) en la parte superior derecha */}
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-primary-600 focus:outline-none"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido del menú */}
            <div className="container-custom">
              <ul className="flex flex-col pt-4">
                <li>
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className={`block px-4 py-3 font-light hover:text-primary-600 ${
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
                      className={`flex justify-between items-center w-full px-4 py-3 font-light hover:text-primary-600 ${
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
                            onClick={closeMenu}
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
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;