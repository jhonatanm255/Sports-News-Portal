import React from "react";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import SearchBar from "../../components/ui/SearchBar";
import { useAuth } from "../../contexts/AuthContext";

const SearchAdmin = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center gap-4 w-full md:w-auto">
      <SearchBar className="flex-grow md:w-64" />

      {/* Enlace al Panel de Administración o Iniciar Sesión */}
      {currentUser ? (
        <Link
          to="/admin"
          className="text-primary-500 text-3xl border border-primary-500 p-1 rounded-lg hover:text-primary-400 hover:border-primary-400"
        >
          <MdAdminPanelSettings />
        </Link>
      ) : (
        <Link
          to="/login"
          className="text-gray-600 text-3xl border border-gray-600 p-1 rounded-lg hover:text-primary-500 hover:border-primary-500"
        >
          <MdAdminPanelSettings />
        </Link>
      )}
    </div>
  );
};

export default SearchAdmin;
