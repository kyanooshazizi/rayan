import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import {getData} from "@/components/utilsFunction/checklogin";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import  Main  from "@/components/utilsDashboard/profileBusiness";


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
      <Navbar/>
      <div className="lg:relative lg:top-o lg:right-0 bg-dashboard">
        
        <div className="lg:flex lg:h-full lg:min-h-[680px] hidden fixed w-[140px]">
          <Sidbar />
        </div>
        <div className="w-100 min-h-[670px] lg:pr-[160px]">
         <Main/>
        </div>
      </div>
   </>
  )
}

export default page

