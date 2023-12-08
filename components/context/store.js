'use client';

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {
    const [datacity,setDatacity]=useState([]);
    const [datapaket,setDatapaket]=useState([]);
    const [content_value,setContent_Value]=useState([]);
useEffect(() => {
  Promise.all([
    fetch('https://mohaddesepkz.pythonanywhere.com/cities/'),
    fetch('https://mohaddesepkz.pythonanywhere.com/options/services/'),
    fetch('https://mohaddesepkz.pythonanywhere.com/options/content/value/'),
  ])
    .then(([rescity, respaket,rescontent]) => 
      Promise.all([rescity.json(), respaket.json(),rescontent.json()])
    )
    .then(([datacity, datapaket,content_value]) => {
      setDatacity(datacity);
      setDatapaket(datapaket);
      setContent_Value(content_value)
    });
}, []);


    return (
        <ThemeContext.Provider value={{ datacity,datapaket,content_value }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);