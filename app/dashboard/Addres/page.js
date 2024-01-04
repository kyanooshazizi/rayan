import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import {getData} from "@/components/utilsFunction/checklogin";
import { cookies } from 'next/headers';
import  Main  from "@/components/utilsDashboard/Addaddress";
const page = async() => {
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')
  const value_cooki=token&&token.value? token.value:undefined;
  if(value_cooki){
    var data=await getData(value_cooki)
    if(!data.username){ 
      redirect("/auth/login") 
       }
  }else{
      redirect("/auth/login") 
  }

  return (
   <>
      <Navbar data={data}/>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-2">
          <Sidbar />
        </div>
        <div className="col-start-2 col-end-13 mt-28">
          <Main/>
        </div>
      </div>
   </>
  )
}

export default page
