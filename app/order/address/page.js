"use client"
import dynamic from 'next/dynamic'
import Navbar from "@/components/utilsorder/Navbar/navbar";
// import Sidbar from "@/components/utilsorder/Saidbar/sidbar";
import Address from "@/components/utilsorder/pageAddress/Address/index";
// import { useState } from 'react';
const Sidbar = dynamic(() => 
{
 return import('@/components/utilsorder/Saidbar/sidbar')
}, { ssr: false, })
import { useThemeContext } from '@/components/context/store';
import { useRouter } from 'next/navigation';

const page = () => {
  const { isloading,islogin} = useThemeContext();
  const router=useRouter();
 if(!islogin&&!isloading){
  router.push("/auth/login")
 }
  return (
    <>
     {/* start nav */}
     <Navbar/>
      {/* end nav */}

      <main className="grid grid-cols-6 gap-2">
       <Address/>
        {/* start sidebar */}
        // {isloading?
    <div className="skeleton  p-2 fixed top-[60px] left-0 w-1/4 h-[calc(100vh_-_60px)]">
      {/* شروع:عنوان */}
    <div className="text-txcolor text-center">
      <div className="text-center shadow-sm bg-white text-bgcolor mb-3 w-[200px] py-2 rounded font-bold mx-auto !important">
        خلاصه سفارش
      </div>
    </div>
    {/* پایان:عنوان */}
    
    </div>
    :<Sidbar/>} 
 
         
        {/* end sidebar */}
      </main>
    </>
  )
}

export default page
