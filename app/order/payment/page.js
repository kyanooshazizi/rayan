import Navbar from "@/components/utilsorder/Navbar/navbar";
import Main from "@/components/utilsorder/pagePayment";
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
        <div
          className={` fixed w-[140px] mt-[100px] lg:flex hidden
          }`}
        >
          <Sidnav stylex={"pt-[38px]"} />
        </div>
        <div className="flex lg:pr-[150px] pr-0">
          <div className="xl:basis-[65%] lg:basis-[60%] sm:basis-[90%] basis-full lg:mx-0 mx-auto">
            <Main />
          </div>
          <div className=" lg:block hidden fixed xl:w-[340px] lg:w-[300px] left-0 bg-[#ADB3C3] h-screen pt-[250px]">
          <Image
                src="/order/logo_payment.svg"
                width={200}
                height={30}
                alt="Picture of the author"
                className="mx-auto"
              />
               <Image
                src="/order/payment.svg"
                width={300}
                height={30}
                alt="Picture of the author"
                className="mx-auto mt-[50px]"
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

