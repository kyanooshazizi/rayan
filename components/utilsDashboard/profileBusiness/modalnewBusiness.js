"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
import { useThemeContext } from "../../context/store";

export default function App() {
  const { setFlagchange,setCheck_b } = useThemeContext();
 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkedMessage, setCheckedMessage] = useState(false);
  const [checkedFactor, setCheckedFactor] = useState(false);
  const handleToggleM = () => {
    setCheckedMessage((prev) => !prev);
  };
  const handleToggleF = () => {
    setCheckedFactor((prev) => !prev);
  };
 
  const [databesiness, setDatabesiness] = useState({
    title: "",
    type: 0,
    number_b: "",
    number_s: "",
    codeposti: "",
    codemeli: "",
  });
  // start choose file
  const [selectedFile, setSelectedFile] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const dataHandler = (event) => {
    setDatabesiness((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  // start get type besiness
  const { data } = useQuery("btype", () => {
    return fetch("https://mohaddesepkz.pythonanywhere.com/business/type/").then(
      (res) => res.json()
    );
  });
  const queryClient = useQueryClient();
  const {
    mutate: addBusiness,
    data: datapost,
    error,
    isError,
  } = useMutation(
    (data_in) => {
      return fetch("https://mohaddesepkz.pythonanywhere.com/business/new/", {
        method: "POST",
        body: data_in,
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }).then(res=>res.json());
    },
    {
      onError: () => {
        console.log("err");
      },
      onSuccess: () => {
        setFlagchange((prev) => !prev);
        setCheck_b(false)
        queryClient.invalidateQueries("allbesiness");
        setDatabesiness({
          title: "",
          type: 0,
          number_b: "",
          number_s: "",
          codeposti: "",
          codemeli: "",
        });
        setSelectedFile("")
      },
    }
  );

  // start get type besiness
  // start submit
  const subHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (selectedFile && checkedFactor) {
      var Data = {
        logo: selectedFile,
        name: databesiness.title,
        postal_code: databesiness.codeposti,
        economic_number: databesiness.number_b,
        registration_number: databesiness.number_s,
        national_code: databesiness.codemeli,
        b_type: databesiness.type,
        bill: true,
      };
    } else if (!selectedFile && checkedFactor) {
      var Data = {
        name: databesiness.title,
        postal_code: databesiness.codeposti,
        economic_number: databesiness.number_b,
        registration_number: databesiness.number_s,
        national_code: databesiness.codemeli,
        b_type: databesiness.type,
        bill: true,
      };
    } else if (selectedFile && !checkedFactor) {
      var Data = {
        logo: selectedFile,
        name: databesiness.title,
        b_type: databesiness.type,
        bill: false,
      };
    } else if (!selectedFile && !checkedFactor) {
      var Data = {
        name: databesiness.title,
        b_type: databesiness.type,
        bill: false,
      };
    }
    Object.keys(Data).forEach((key) => {
      var value = Data[key];
      formData.append(key, value);
    });
    if (!checkedFactor) {
      if (databesiness.title && databesiness.type) {
        addBusiness(formData);
      } else {
        swal({
          text: "لطفا تمام فیلد ها را پر کنید",
          icon: "error",
        });
      }
    } else {
      if (databesiness.title && databesiness.type && databesiness.codemeli) {
        addBusiness(formData);
      } else {
        swal({
          text: "لطفا تمام فیلد ها را پر کنید",
          icon: "error",
        });
      }
    }
  };
  // end submit
  return (
    <>
      <Button
        onPress={onOpen}
        className="sm:text-[16px] text-[14px] cursor-pointer mt-6 xl:w-[35%] md:w-[50%] w-full text-[#fff]  bg-bgcolor rounded-[4px] text-center py-[12px]"
      >
        <FaPlus className="ml-1 inline-block aligne-top" />
        افزودن کسب و کار جدید
      </Button>

      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose} placement={"top"}>
        <ModalContent className="bg-dashboard">
          {(onClose) => (
            <>
              <ModalBody>
                <form onSubmit={subHandler}>
                  <div className="mt-[50px] flex justify-between ">
                    <div className="hidden lg:inline text-[16px] border-b-2 border-colorgreen border-solid max-w-fit">
                      جزئیات اطلاعات پروفایل کسب و کار
                    </div>
                    <div>
                      <button
                        type="submit"
                        onClick={onClose}
                        className="text-[#fff] bg-bgcolor py-2 px-[10px] rounded-[5px] mx-4"
                      >
                        ثبت اطلاعات
                      </button>
                      {/* <button className="text-[#fff] bg-bgcolor py-2 px-[10px] rounded-[5px] red">انصراف</button> */}
                    </div>
                  </div>
                  {/* start logo */}
                  <div className=" my-2">
                    <label
                      htmlFor="image"
                      className="text-center cursor-pointer flex justify-center "
                    >
                      <div className="w-full min-h-[150px] rounded-[10px] bg-[#fff] flex justify-start ">
                        <span className="mt-[20px] mr-5 ml-5">لوگو</span>
                        <div className="flex flex-col">
                          <div className="w-20 h-20 rounded bg-[#F1F1F1] flex justify-center items-center relative mx-10 mt-[20px] cursor-pointer">
                            <FaUser className="text-[#D9D9D9] text-6xl" />
                            <div className="absolute bg-[#D9D9D9] p-1 rounded-full top-[-10px] right-[65px]">
                              <MdEdit className=" text-[#fff]" />
                            </div>
                          </div>
                          <span className="text-[12px] mt-[18px]">
                            فایل های معتبر Png,Jpeg,Jpg
                          </span>
                        </div>
                      </div>
                    </label>

                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {/* end logo */}

                  <div className="w-full min-h-[60px] rounded-[8px] bg-[#fff] flex items-center ">
                    <div className="basis-[50%] flex items-center">
                      <span className="pr-3 pl-1 md:text-[14px] text-[12px]">
                        عنوان
                      </span>
                      <input
                        type="text"
                        name="title"
                        placeholder="رایان ادمین"
                        className="bg-dashboard placeholder:text-[12px] placeholder:text-[#CDCDCD] px-[10px] outline-colorgreen border-[2px] border-solid border-gray-200 rounded py-[5px] w-[90%]"
                        onChange={(e) => dataHandler(e)}
                      />
                    </div>
                    <div className="basis-[50%] flex items-center px-3">
                      <span className="pr-3 pl-1 md:text-[14px] text-[12px]">
                        نوع کسب وکار
                      </span>
                      <select
                        type="text"
                        name="type"
                        onClick={(event) => {
                          const item1 = data?.results.find(
                            (item) => item.title === event.target.value
                          );

                          setDatabesiness((prev) => ({
                            ...prev,
                            type: item1.id,
                          }));
                        }}
                        className="bg-dashboard placeholder:text-[12px] placeholder:text-[#CDCDCD] px-[10px] outline-colorgreen border-[2px] border-solid border-gray-200 rounded py-[5px] w-[75%]"
                      >
                        {data?.results.map((item) => {
                          return (
                            <option
                              value={`${item.title}`}
                              className="text-[14px]"
                            >
                              {item.title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="w-full min-h-[80px] rounded-[8px] bg-[#fff] flex flex-col">
                    <div className="pt-3 pb-2">
                      <input
                        className="ltr mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100  after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-bgcolor checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-bgcolor  checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-bgcolor checked:focus:bg-bgcolor checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-bgcolor dark:checked:after:bg-bgcolor"
                        type="checkbox"
                        role="switch"
                        id="m"
                        checked={checkedMessage}
                        onChange={handleToggleM}
                      />
                      <label
                        className="inline-block pr-[8px] hover:cursor-pointer lg:text-[16px] text-[14px]"
                        for="m"
                      >
                        {" "}
                        ارسال پیام کوتاه به گیرنده بسته پستی پس از ثبت سفارش
                      </label>
                    </div>
                    <div className="pt-2 pb-3">
                      <input
                        className="ltr mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100  after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-bgcolor checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-bgcolor  checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-bgcolor checked:focus:bg-bgcolor checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-bgcolor dark:checked:after:bg-bgcolor"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={checkedFactor}
                        onChange={handleToggleF}
                      />
                      <label
                        className="inline-block pr-[8px] hover:cursor-pointer lg:text-[16px] text-[14px]"
                        for="flexSwitchCheckDefault"
                      >
                        {" "}
                        آیا به فاکتور نیاز دارید؟
                      </label>
                    </div>
                  </div>
                  <div
                    className={`${
                      checkedFactor ? "flex" : "hidden"
                    } w-full min-h-[75px] rounded-[8px] bg-[#fff] items-center justify-around`}
                  >
                    <div className=" basis-[20%]">
                      <label className=" md:text-[14px] text-[12px] block">
                        شماره اقتصادی
                      </label>
                      <input
                        type="text"
                        name="number_b"
                        placeholder=""
                        onChange={(e) => dataHandler(e)}
                        className="bg-dashboard w-full  placeholder:text-[12px] placeholder:text-[#CDCDCD] px-[10px] outline-colorgreen border-[2px] border-solid border-gray-200 rounded py-[5px]"
                      />
                    </div>
                    <div className=" basis-[20%]">
                      <label className=" md:text-[14px] text-[12px] block">
                        شماره ثبت
                      </label>
                      <input
                        type="text"
                        name="number_s"
                        placeholder=""
                        onChange={(e) => dataHandler(e)}
                        className="bg-dashboard w-full  placeholder:text-[12px] placeholder:text-[#CDCDCD] px-[10px] outline-colorgreen border-[2px] border-solid border-gray-200 rounded py-[5px] "
                      />
                    </div>
                    <div className=" basis-[20%]">
                      <label className=" md:text-[14px] text-[12px] block">
                        کد پستی
                      </label>
                      <input
                        type="text"
                        name="codeposti"
                        placeholder=""
                        onChange={(e) => dataHandler(e)}
                        className="bg-dashboard w-full  placeholder:text-[12px] placeholder:text-[#CDCDCD] px-[10px] outline-colorgreen border-[2px] border-solid border-gray-200 rounded py-[5px] "
                      />
                    </div>
                    <div className=" basis-[20%]">
                      <label className=" md:text-[14px] text-[12px] block">
                        شناسه ملی
                      </label>
                      <input
                        type="text"
                        name="codemeli"
                        placeholder=""
                        onChange={(e) => dataHandler(e)}
                        className="bg-dashboard w-full placeholder:text-[12px] placeholder:text-[#CDCDCD] px-[10px] outline-colorgreen border-[2px] border-solid border-gray-200 rounded py-[5px] "
                      />
                    </div>
                  </div>
                </form>

                <div className="w-full min-h-[100px] rounded-[8px] bg-[#fff] flex flex-col">
                  <span className="pt-2 pr-2">تنظیمات سرویس API</span>
                  <div className="flex justify-end">
                    <button className="text-[#fff] w-[140px] py-2 bg-[#515E83] rounded-[5px] mx-3">
                      کپی
                    </button>
                    <button className="text-[#fff] w-[140px] py-2 bg-bgcolor rounded-[5px] ml-8 ">
                      فراخوانی مجدد
                    </button>
                  </div>
                  <span className="text-[14px] text-[#B5B5B5] pb-4 pr-4">
                    کلید خصوصی شما:
                  </span>
                </div>
                <div className="w-full min-h-[100px] rounded-[8px] bg-[#fff]  pb-[30px] mb-[50px]">
                  <span className="pr-2 pt-2 inline-block">
                    دانلود ویجتهای و افزونه ها:
                  </span>
                  <div className="flex items-center mt-2">
                    <div className="flex pr-[30px] mt-4  flex-col">
                      <span className="mb-4 text-[14px] text-[#B5B5B5] mr-4">
                        Wordpress Plugin:
                      </span>
                      <div>
                        <Image
                          src="/image_dashboard/viget.svg"
                          width={18}
                          height={18}
                          alt="logo"
                          className="inline-block ml-8"
                        />
                        <span className="text-[14px] text-[#B5B5B5] text-left">
                          DNN Module:
                        </span>
                      </div>
                    </div>
                    <div className="flex pr-[30px] mt-1  flex-col items-center">
                      <button className="mb-2 text-center inline-block bg-bgcolor text-[#fff] rounded-[3px] px-6 py-1 mr-[30px]">
                        دانلود
                      </button>
                      <button className=" text-center inline-block bg-[#515E83] text-[#fff] rounded-[3px] px-6 py-1 mr-[30px]">
                        دانلود
                      </button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
