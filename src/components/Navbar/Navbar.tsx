import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useLocation } from "react-router";
import ThemeSwitcher from "../ThemeSwitcher";
import { RxDashboard } from "react-icons/rx";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { SlSettings } from "react-icons/sl";
import { MdHistory } from "react-icons/md";
import { GoHistory } from "react-icons/go";

const Navbar = () => {
  const [websiteName, setWebsiteName] = useState("Сухофрукт Trading Bot");
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 720) {
      setWebsiteName("СУХОФРУКТ");
    } else {
      setWebsiteName("Сухофрукт Trading Bot");
    }
    window.addEventListener('resize', ()=>{
      if(window.innerWidth < 720){
        setWebsiteName("СУХОФРУКТ");
      } else {
        setWebsiteName("Сухофрукт Trading Bot");
      }
    })
    setTimeout(() => {
      if (navRef.current)
        navRef.current.style.transition =
          "color 0.3s ease-out, background-color 0.3s ease-out, padding 300ms ease-out;";
    }, 300);
  });

  return (
    <div className="nav bottom-border" ref={navRef}>
      <p className="medium">{websiteName}</p>
      <div className="nav-links">
        {/* Text */}
        <div className="nav-links-text">
          <a
            href="/"
            className={location.pathname === "/" ? "medium green" : "green"}
          >
            Dashboard
          </a>
          <a
            href="/settings"
            className={
              location.pathname === "/settings" ? "medium green" : "green"
            }
          >
            Настройки
          </a>
          <a
            href="/history"
            className={
              location.pathname === "/history" ? "medium green" : "green"
            }
          >
            История
          </a>
        </div>
        {/* Icons */}
        <div className="nav-links-icons">
          <a href={location.pathname === "/" ? undefined : "/"}>
            <RxDashboard 
              cursor='pointer'
              size={28}
              className={location.pathname === "/" ? "green" : "green-light"} 
            />
          </a>
          <a href={location.pathname === "/settings" ? undefined : "/settings"}>
            <SlSettings 
              cursor='pointer'
              size={28}
              className={location.pathname === "/settings" ? "green" : "green-light"} 
            />
          </a>
          <a href={location.pathname === "/history" ? undefined : "/history"}>
            <GoHistory 
              cursor='pointer'
              size={28} 
              className={location.pathname === "/history" ? "green" : "green-light"} 
            />
          </a>
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
