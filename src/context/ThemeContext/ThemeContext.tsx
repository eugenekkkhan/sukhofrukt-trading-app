import { createContext, Dispatch, SetStateAction } from "react";

type ThemeType = "light" | "dark";
type ThemeContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
};

const ThemeContextContent: ThemeContextType = {
  theme: "dark",
  setTheme: () => {},
};
const ThemeContext = createContext(ThemeContextContent);

export type { ThemeContextType, ThemeType };
export default ThemeContext;
