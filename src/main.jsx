import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { CountryProvider } from "./context/CountryContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CountryProvider>
            <ThemeContextProvider>
                <App />
            </ThemeContextProvider>
        </CountryProvider>
    </StrictMode>
);
