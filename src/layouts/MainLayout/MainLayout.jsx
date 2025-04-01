import React from "react";
import { Outlet } from "react-router-dom";
import CategoryNav from "../../components/ui/CategoryNav/CategoryNav";
import LogoTitle from "./LogoTitle";
import SearchAdmin from "./SearchAdmin";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 shadow-md">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <LogoTitle />
            <SearchAdmin />
          </div>
        </div>

        <CategoryNav />
      </header>

      <main className="flex-grow container-custom py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
