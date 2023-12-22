import React from "react";
import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import Neworder from "@/components/optinselect/index"
const page = () => {
  const waletTotal=50000;
  return (
    <div>
      <Navbar />
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
