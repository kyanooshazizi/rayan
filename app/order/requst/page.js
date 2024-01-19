"use client"
// import component:start
import Navbar from "@/components/utilsorder/Navbar/navbar";
import dynamic from 'next/dynamic'
// import Sidbar from '@/components/utilsorder/Saidbar/sidbar'
import Mainsection from '@/components/utilsorder/pageRequst/mainsection/mainsection'
const Sidbar = dynamic(() => import('@/components/utilsorder/Saidbar/sidbar'), { ssr: false })
// const Mainsection = dynamic(() => import('@/components/utilsorder/pageRequst/mainsection/mainsection'), { ssr: false })
// import component:end
import { useThemeContext } from '@/components/context/store';
const page = () => {
  const { isloading} = useThemeContext();
  return (
    <>
      {/* start nav */}
      <Navbar/>
      {/* end nav */}
      <main className="grid grid-cols-6">
        {/* start section */}
        <Mainsection/>
        {/* end section */}
        {/* start sidebar */}
        {isloading?
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
  );
};

export default page;
