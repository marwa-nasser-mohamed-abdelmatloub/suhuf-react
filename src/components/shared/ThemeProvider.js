import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const theme = {
        primary: '#0f5578',
        secondary: '#f8f9fa',
        tertiary: '#0a93b0',
        light: '#ffffff',
        dark: '#343a40',
        text: '#212529',
        muted: '#6c757d',
        accent: '#ff6b6b',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);