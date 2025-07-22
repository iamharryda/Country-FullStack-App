import { createContext } from "react";

export type themeMode = "light" | "dark";

export interface ThemeContextType {
  mode: themeMode;
  toggleMode: () => void;
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
