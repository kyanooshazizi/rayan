
import React from "react";
import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import Main from "@/components/utilsDashboard/profile/index";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import {getData} from "@/components/utilsFunction/checklogin"; 
const realData=async(value_cooki)=>{
  const res=await fetch("https://mohaddesepkz.pythonanywhere.com/profile/real/",{
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${value_cooki}`
    },
  });
  return res.json()
}

const page = async() => {
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')
  const value_cooki=token&&token.value? token.value:undefined;
  if(value_cooki){
    var data=await getData(value_cooki)
    if(!data){ 
      redirect("/auth/login") 
       }
  }else{
    redirect("/auth/login")  
  }
   
  const realdata=await realData(value_cooki);
  return (
    <div>
      <Navbar data={data}/>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-2">
          <Sidbar />
        </div>
        <div className="col-start-2 col-end-13 mt-28 flex">
           <Main realdata={realdata} data={data}/>
        </div>
      </div>
    </div>
  );
};

export default page;
