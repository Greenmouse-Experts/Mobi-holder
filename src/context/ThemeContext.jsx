// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a ThemeContext
export const ThemeContext = createContext();

// Create a ThemeProvider component
export const ThemeProvider = ({ children }) => {
    // Get initial theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => localStorage.getItem('mobiTheme') || 'light');

    // Toggle between light and dark modes
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('mobiTheme', newTheme); // Persist the theme in localStorage
    };

    // Update the document class when theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
