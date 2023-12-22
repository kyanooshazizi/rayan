"use client"
// import component:start
import Navbar from "@/components/utilsorder/Navbar/navbar";
import dynamic from 'next/dynamic'
// import Sidbar from '@/components/utilsorder/Saidbar/sidbar'
// import Mainsection from '@/components/utilsorder/pageRequst/mainsection/mainsection'
const Sidbar = dynamic(() => import('@/components/utilsorder/Saidbar/sidbar'), { ssr: false })
const Mainsection = dynamic(() => import('@/components/utilsorder/pageRequst/mainsection/mainsection'), { ssr: false })
// import component:end

const page = () => {
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
          <Sidbar/>
        {/* end sidebar */}
      </main>
    </>
  );
};

export default page;
