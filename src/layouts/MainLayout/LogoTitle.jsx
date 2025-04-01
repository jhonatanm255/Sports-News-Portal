import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";

const LogoTitle = () => {
  return (
    <div className="flex items-center w-full md:w-auto justify-start">
      <img className="w-[55px] mr-2 mt-1" src={logo} alt="logo" />
      <span>
        <Link
          to="/"
          className="flex items-center pt-2 text-2xl font-custom font-semibold text-white"
        >
          Los Angeles{" "}
          <span className="px-3 py-0.5 ml-2 text-white bg-red-700 font-bold rounded-tl-2xl rounded-br-2xl">
            NEWS
          </span>
        </Link>
        <p className="mt-1 text-sm text-gray-400">
          Deportes, Espectáculos y Noticias
        </p>
      </span>
    </div>
  );
};

export default LogoTitle;
