import { createContext, useContext, useState } from "react";

const themeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);

    const toggleTheme = () => {
        setTheme((prev) => !prev);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <themeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </themeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(themeContext);
    if (context === null) {
        throw new Error("useTheme must be used within a ThemeContextProvider");
    }
    return context;
};
