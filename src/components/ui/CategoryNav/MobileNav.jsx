import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import categories from "../../../utils/categories";
import SocialLinks from "../SocialLinks";

const MobileNav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const isActive = (path) => location.pathname === path;

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center p-4">
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
        <SocialLinks />
      </div>

      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:text-primary-600 focus:outline-none"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

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
  );
};

export default MobileNav;
