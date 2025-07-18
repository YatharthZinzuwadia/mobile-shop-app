// - Provides light/dark theme objects and context.
// - Exposes toggleTheme() and persists choice with SecureStore (native) or localStorage (web).
// - Used by all components for consistent theming.
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// Light and dark theme color palettes
const LightTheme = {
  mode: "light",
  background: "#fff",
  card: "#f3f4f6",
  text: "#111",
  primary: "#e11d48",
  secondary: "#fbbf24",
  border: "#e5e7eb",
  input: "#f1f5f9",
  placeholder: "#9ca3af"
};

const DarkTheme = {
  mode: "dark",
  background: "#18181b",
  card: "#27272a",
  text: "#f3f4f6",
  primary: "#e11d48",
  secondary: "#fbbf24",
  border: "#27272a",
  input: "#27272a",
  placeholder: "#6b7280"
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme);

  // Load theme from SecureStore/localStorage on mount
  useEffect(() => {
    (async () => {
      let stored;
      if (Platform.OS === "web") {
        stored = window.localStorage.getItem("theme");
      } else {
        stored = await SecureStore.getItemAsync("theme");
      }
      if (stored === "dark") setTheme(DarkTheme);
    })();
  }, []);

  // Toggle between light and dark themes, persist choice
  const toggleTheme = async () => {
    const next = theme.mode === "light" ? DarkTheme : LightTheme;
    setTheme(next);
    if (Platform.OS === "web") {
      window.localStorage.setItem("theme", next.mode);
    } else {
      await SecureStore.setItemAsync("theme", next.mode);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 