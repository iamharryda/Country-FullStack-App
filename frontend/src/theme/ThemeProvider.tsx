// ThemeProvider.tsx
import { createTheme, CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { ReactNode, useMemo, useState, useEffect } from "react";
import { ThemeContext, themeMode } from "./themeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<themeMode>("light");

  // Load saved mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("themeMode");
    if (stored === "dark" || stored === "light") {
      setMode(stored);
    }
  }, []);

  // Save mode changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#1976d2" },
                secondary: { main: "#9c27b0" },
              }
            : {
                primary: { main: "#90caf9" },
                secondary: { main: "#ce93d8" },
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
