import React from "react";
import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import Neworder from "@/components/optinselect/index";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import {getData} from "@/components/utilsFunction/checklogin";

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
  
  return (
    <div>
      <Navbar/>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-2">
          <Sidbar />
        </div>
        <div className="col-start-2 col-end-13 mt-28">
         <div className="w-3/5 mx-auto">
         <Neworder btncolor={"bgcolor"} />
         </div>
        </div>
      </div>
    </div>
  );
};

export default page;
