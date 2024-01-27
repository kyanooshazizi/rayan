"use client"
import React,{useState} from 'react'
import Navbar from "../Navbar";
import Sidbar from "../Sydbar";
import Neworder from "../../optinselect/index";
import Mobile from "../navbarmobile"
const index = () => {
    const [mobile,setMobile]=useState(false)
  return (
    <div>
       <Navbar setMobile={setMobile} mobile={mobile}/>

       {mobile?
       <Mobile/>
       :<div className="grid grid-cols-12">
        <div className="col-start-1 col-end-2 mt-[72px]">
          <Sidbar />
        </div>
        <div className="col-start-2 col-end-13 mt-28">
         <div className="w-3/5 mx-auto">
         <Neworder btncolor={"bgcolor"} />
         </div>
        </div>
      </div>}
      
    </div>
  )
}

export default index
