import { useContext } from "react";
import ButtonWithIcon from "./Buttons/ButtonWithIcon";
import ThemeContext from "../context/ThemeContext/ThemeContext";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const context = useContext(ThemeContext);
  return (
    <>
      <ButtonWithIcon
        Icon={context.theme === "light" ? BiMoon : BiSun}
        text={""}
        onClick={() => {
          context.setTheme(context.theme === "light" ? "dark" : "light");
        }}
      />
    </>
  );
};

export default ThemeSwitcher;
