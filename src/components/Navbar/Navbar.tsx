import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useLocation } from "react-router";
import ThemeSwitcher from "../ThemeSwitcher";

const Navbar = () => {
  const [websiteName, setWebsiteName] = useState("Сухофрукт Trading Bot");
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setWebsiteName("СTB");
    } else if (window.innerWidth < 640) {
      setWebsiteName("СTradingBot");
    } else {
      setWebsiteName("Сухофрукт Trading Bot");
    }
    // window.addEventListener('resize', ()=>{
    //   if (window.innerWidth < 500) {
    //     setWebsiteName("СTB");
    //   } else if(window.innerWidth < 640){
    //     setWebsiteName("СTradingBot");
    //   } else {
    //     setWebsiteName("Сухофрукт Trading Bot");
    //   }
    // })
    setTimeout(() => {
      if (navRef.current)
        navRef.current.style.transition =
          "color 0.3s ease-out, background-color 0.3s ease-out, padding 300ms ease-out;";
      console.log('penis');
    }, 300);
  });

  return (
    <div className="nav bottom-border" ref={navRef}>
      <p className="medium">{websiteName}</p>
      <div className="nav-links">
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
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
