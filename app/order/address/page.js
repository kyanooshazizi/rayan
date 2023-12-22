import React from 'react'
import Navbar from "@/components/utilsorder/Navbar/navbar";
import Sidbar from "@/components/utilsorder/Saidbar/sidbar";
import Address from "@/components/utilsorder/pageAddress/Address/index";
const page = () => {
  return (
    <>
     {/* start nav */}
     <Navbar/>
      {/* end nav */}

      <main className="grid grid-cols-6">
       <Address/>
        {/* start sidebar */}
          <Sidbar/>
        {/* end sidebar */}
      </main>
    </>
  )
}

export default page
