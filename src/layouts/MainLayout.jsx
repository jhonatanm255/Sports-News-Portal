import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import CategoryNav from '../components/ui/CategoryNav';
import SearchBar from '../components/ui/SearchBar';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';
import SocialLinks from '../components/ui/SocialLinks';
import { MdAdminPanelSettings } from "react-icons/md";

const MainLayout = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex">
              <img
                className="flex items-center w-[60px]"
                src={logo}
                alt="logo"
              />
              <Link
                to="/"
                className="flex items-center pt-2 text-2xl font-custom  text-white"
              >
                Los Angeles{" "}
                <span className="px-2 ml-2 text-white bg-red-600 font-bold">NEWS</span>
              </Link>
            </div>

            {/* Search and Admin */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <SearchBar className="flex-grow md:w-64" />

              {/* Enlace al Panel de Administración o Iniciar Sesión */}
              {currentUser ? (
                <Link to="/admin" className="btn btn-primary whitespace-nowrap">
                  Panel Admin
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 text-3xl hover:text-primary-500"
                >
                  <MdAdminPanelSettings />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <CategoryNav />
      </header>

      {/* Main Content */}
      <main className="flex-grow container-custom py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-6 pb-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Portal de Noticias</h3>
              <p className="text-gray-300">
                Tu fuente confiable de noticias e información actualizada.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Secciones</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/categoria/noticias"
                    className="text-gray-300 hover:text-white"
                  >
                    Noticias
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categoria/deportes"
                    className="text-gray-300 hover:text-white"
                  >
                    Deportes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categoria/farandula"
                    className="text-gray-300 hover:text-white"
                  >
                    Farándula
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/categoria/tendencias"
                    className="text-gray-300 hover:text-white"
                  >
                    Tendencias
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categoria/otros"
                    className="text-gray-300 hover:text-white"
                  >
                    Otros
                  </Link>
                </li> */}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/buscar" className="text-gray-300 hover:text-white">
                    Búsqueda
                  </Link>
                </li>
                {currentUser && (
                  <li>
                    <Link
                      to="/admin"
                      className="text-gray-300 hover:text-white"
                    >
                      Administración
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contacto</h4>
              <p className="text-gray-300 mb-4">
                Email: info@portaldenoticias.com
                <br />
                Teléfono: +1 234 567 890
              </p>
              <SocialLinks />
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Portal de Noticias. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;