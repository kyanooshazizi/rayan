import React from "react";
import Main from "@/components/utilsDashboard/wallet";
import { cookies } from 'next/headers';
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
    <>
     <Main/>
    </>
  );
};

export default page;
