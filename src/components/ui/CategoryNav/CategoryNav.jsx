import React, { useEffect, useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const CategoryNav = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      setIsFixed(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full z-50 bg-white shadow-md ${
        isFixed ? "fixed top-0" : "relative"
      }`}
    >
      <div className="container-custom">
        <DesktopNav />
        <MobileNav />
      </div>
    </nav>
  );
};

export default CategoryNav;
