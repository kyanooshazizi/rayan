'use client';

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {



    return (
        <ThemeContext.Provider>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);