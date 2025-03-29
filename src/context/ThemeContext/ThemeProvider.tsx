import { JSX, useEffect, useState } from "react";
import ThemeContext, { ThemeType } from "./ThemeContext";
import { getCookie, setCookie } from "../../utils";

const ThemeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [Theme, SetTheme] = useState<ThemeType>(
    (getCookie("theme") as ThemeType) || "light",
  );

  useEffect(() => {
    setCookie("theme", Theme, 365);
    document.body.className = Theme === "dark" ? "dark" : "";

    setTimeout(() => {
      document.body.style.transition =
        "color 0.3s ease-out, background-color 0.3s ease-out";
    }, 300);
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ theme: Theme, setTheme: SetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
