"use client"
import Headerpage from "../Header";
import Footer from "../Footer";
import Maincomponent from "../mainpage";
import Mobilepage from "../mobilepage";
import {useThemeContext} from "../../context/store";
const index = () => {
  const {toggle,setToggle}=useThemeContext()
  return (
    <>
    {
      toggle? 
      <div>
      <Headerpage/> 
        <Maincomponent/>
      <Footer/>
      </div>:<Mobilepage/>
    }
     
    </>
  )
}

export default index
