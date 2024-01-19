import Navbar from "@/components/utilsorder/Navbar/navbar";
import Main from "@/components/utilsorder/pageRviow/Getlocalhost";
import {getData} from "@/components/utilsFunction/checklogin";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
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
      {/* start nav */}
      <Navbar/>
      {/* end nav */}
      <Main/>
    </>
  )
}

export default page
