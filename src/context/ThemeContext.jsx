import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);

    const toggleTheme = () => {
        localStorage.setItem("theme", !theme);
        setTheme((prev) => !prev);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "true") {
            setTheme(true);
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

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
