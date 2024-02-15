import Navbar from "@/components/utilsorder/Navbar/navbar";
import Main from "@/components/utilsorder/pageRviow";
import { getData } from "@/components/utilsFunction/checklogin";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import Sidnav from "@/components/utilsDashboard/Sydbar";
const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const value_cooki = token && token.value ? token.value : undefined;
  if (value_cooki) {
    var data = await getData(value_cooki);
    if (!data) {
      redirect("/auth/login");
    }
  } else {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="w-full">
        <div>
          <Navbar />
        </div>
        <div className={` fixed w-[140px] mt-[100px]  lg:flex hidden`}>
          <Sidnav stylex={"pt-[38px]"} />
        </div>
        <div className="flex lg:pr-[180px] pr-0">
          <div className="xl:basis-[60%] lg:basis-[75%] sm:basis-[90%] basis-full">
            <Main />
          </div>
          {/* <div  className="xl:basis-[40%] lg:basis-[15%] lg:block hidden mt-[400px] mx-[40px]" >
            <Image
              src="/order/preview.svg"
              width={600}
              height={200}
              alt="Picture of the author"
              className="w-full"
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default page;
