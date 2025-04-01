import React from "react";
import { Link, useLocation } from "react-router-dom";
import categories from "../../../utils/categories";
import SocialLinks from "../SocialLinks";

const DesktopNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
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
  );
};

export default DesktopNav;
