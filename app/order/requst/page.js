// "use client"
// import component:start
import Navbar from "../../../components/utilsorder/Navbar/navbar";
import Sidbar from "../../../components/utilsorder/Saidbar/sidbar";
import Mainsection from "../../../components/utilsorder/pageRequst/mainsection/mainsection";
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
