import { useContext, useEffect, useRef } from "react";
import "./PanelWithInfo.css";
import ThemeContext from "../../context/ThemeContext/ThemeContext";

type colorSchemeType = "green" | "coral" | "gray";

const ColorWay = (color: colorSchemeType, isLight: boolean = false) => {
  if (color === "coral" || color === "green") {
    return isLight
      ? `panel ${color}-lighter-bg ${color} light`
      : `panel ${color}-bg ${color}-lighter light`;
  } else {
    return isLight
      ? `panel gray-lighter-bg gray light`
      : `panel gray-bg primary light`;
  }
};

const PanelWithInfo = ({
  text,
  color = "green",
}: {
  text: string;
  color?: colorSchemeType;
}) => {
  const context = useContext(ThemeContext);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.style.transition =
          "background-color 300ms ease-out, color 300ms ease-out";
      }
    }, 300);
  }, []);

  return (
    <div ref={panelRef} className={ColorWay(color, context.theme === "light")}>
      {text}
    </div>
  );
};

export default PanelWithInfo;
