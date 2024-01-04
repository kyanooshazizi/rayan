'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
const ThemeContext = createContext({})


export const ThemeContextProvider = ({children,user}) => {
const [userdata,setUserdata]=useState("")
const [islogin,setIslogin]=useState(false)
const [isloading,setIsloading]=useState(true)
const isCookie=getCookie('access_token')
useEffect(()=>{
    fetch("https://mohaddesepkz.pythonanywhere.com/users/verify/",{
        headers:{Authorization:`Bearer ${isCookie}`}
    }).then(res=>{
        if(!res.ok){
            setIsloading(false)
            throw new Error("Token validation failed");
          }else{
            setIsloading(false)
            setIslogin(true)
            return res.json();
          }
    }).then(res=>{setUserdata(res)}).catch(error=>console.error(error));
},[islogin,isCookie])
  


    return (
        <ThemeContext.Provider value={{userdata,islogin,setIslogin,isloading}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);