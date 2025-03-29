import { JSX, useContext, useEffect, useRef } from "react";
import "./Button.css";
import ThemeContext from "../../context/ThemeContext/ThemeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  elementInside?: JSX.Element | JSX.Element[];
}

const Button = ({ elementInside, onClick, size, ...props }: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (btnRef.current)
        btnRef.current.style.transition =
          "color 0.3s ease-out, background-color 0.3s ease-out";
    }, 300);
  });
  const context = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      ref={btnRef}
      className={`${size} ${context.theme === "dark" ? "dark" : ""}`}
      {...props}
    >
      {elementInside}
    </button>
  );
};

export type { ButtonProps };
export default Button;
