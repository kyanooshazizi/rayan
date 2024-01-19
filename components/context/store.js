'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
const ThemeContext = createContext({})


export const ThemeContextProvider = ({children,user}) => {
const [userdata,setUserdata]=useState("")
console.log("🚀 ~ file: store.js:10 ~ ThemeContextProvider ~ userdata:", userdata)
const [islogin,setIslogin]=useState(false)
const [isloading,setIsloading]=useState(true)
const isCookie=getCookie('access_token')
const [flagghange,setFlagchange]=useState(true)
useEffect(()=>{
    try {
        fetch("https://mohaddesepkz.pythonanywhere.com/users/verify/",{
            headers:{Authorization:`Bearer ${isCookie}`}
        }).then(res=>{
            if(!res.ok){
                setIsloading(false)
                return null;
              }else{
                setIsloading(false)
                setIslogin(true)
                return res.json();
              }
        }).then(res=>setUserdata(res)).catch(error=>console.error(error));
      } catch (error) {
        console.error(error);
      }
   
},[islogin,isCookie,flagghange])
  


    return (
        <ThemeContext.Provider value={{userdata,islogin,setIslogin,isloading,setFlagchange}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);