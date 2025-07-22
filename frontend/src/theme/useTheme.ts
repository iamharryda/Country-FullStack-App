// useCustomTheme.ts
import { useContext } from "react";
import { ThemeContext } from "./themeContext";

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useCustomTheme must be used within a ThemeProvider");
  }
  return context;
};
