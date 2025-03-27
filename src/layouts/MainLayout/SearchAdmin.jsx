import React from "react";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import SearchBar from "../../components/ui/SearchBar";
import { useAuth } from "../../contexts/AuthContext";

const SearchAdmin = () => {
  const { currentUser } = useAuth();

  // Mostrar ABSOLUTAMENTE NADA si no hay usuario logueado
  if (!currentUser)
    return (
      <div className="flex items-center gap-4 w-full md:w-auto">
        <SearchBar className="flex-grow md:w-64" />
      </div>
    );

  // Mostrar SOLO el botón de admin si hay usuario logueado
  return (
    <div className="flex items-center gap-4 w-full md:w-auto">
      <SearchBar className="flex-grow md:w-64" />
      <Link
        to="/admin" // Asegúrate que esta ruta lleve al panel real
        className="text-primary-500 text-3xl border border-primary-500 p-1 rounded-lg hover:text-primary-400 hover:border-primary-400"
        title="Panel de Administración"
      >
        <MdAdminPanelSettings />
      </Link>
    </div>
  );
};

export default SearchAdmin;