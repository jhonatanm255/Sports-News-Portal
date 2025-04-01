import React from "react";
import { Link } from "react-router-dom";

const ArticlesHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Administrar Artículos</h1>
      <Link to="/admin/articulos/crear" className="btn btn-primary">
        Crear Artículo
      </Link>
    </div>
  );
};

export default ArticlesHeader;
