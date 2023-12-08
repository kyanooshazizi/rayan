import React from 'react'
import Navbar from "../../../components/utilsorder/Navbar/navbar";
import Sidbar from "../../../components/utilsorder/Saidbar/sidbar";
import GoogleMap from "../../../components/utilsorder/pageAddress/googleMap";
const page = () => {
  return (
    <>
     {/* start nav */}
     <Navbar/>
      {/* end nav */}

      <main className="grid grid-cols-6">
        {/* <GoogleMap/> */}
        {/* start sidebar */}
          <Sidbar/>
        {/* end sidebar */}
      </main>
    </>
  )
}

export default page
