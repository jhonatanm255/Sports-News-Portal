import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "../../components/ui/SocialLinks";

const Footer = () => {
  return (
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
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <p className="text-gray-300 mb-4">
              Email: info@lanewssports.com
              <br />
              Teléfono: +1 323 590 6087
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
  );
};

export default Footer;
