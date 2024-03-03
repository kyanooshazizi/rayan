"use client"
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
import { FaEdit } from "react-icons/fa";
import useCity_servise from "../../../TanstakQury/useCity_servise";
export default function App({datainput}) {
  const { datacity } = useCity_servise();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
const [details,setDetails]=useState(true);
const [address_sender,setAddress_sender]=useState({
  Business:datainput.title,
  Fname:datainput.name,
  mobile:datainput.phone,
  address:datainput.address,
  peluck:datainput.plaque,
  vahed:datainput.unity,
  id:datainput.id,
  idcity: datainput.city,
  iddistrict: datainput.district,
})
const id=datainput.id
if(datainput.id!==address_sender.id){
  setAddress_sender({
    Business:datainput.title,
    Fname:datainput.name,
    mobile:datainput.phone,
    address:datainput.address,
    peluck:datainput.plaque,
    vahed:datainput.unity,
    id:datainput.id,
    idcity: datainput.city,
    iddistrict: datainput.district,
  })
}
console.log(id,datainput,address_sender)
const ChangeHandler=(event)=>{
    setAddress_sender(prev=>({
      ...prev,
      [event.target.name]:event.target.value
    }))
  
  }
  const queryClient = useQueryClient()
  const {
    mutate: addSenderAddress,
    data,
    error,
    isError,
  } = useMutation((variables)=>{
    return  fetch(`https://mohaddesepkz.pythonanywhere.com/address/edit/${variables.id}/`,{
      method:"PUT",
          body: JSON.stringify(variables.indata),
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
    }).then(res=>{
      if(res.ok){
        return res.json()
      }else{
        return null
      }
    })},{
      
      onSuccess:(data)=>{
        queryClient.invalidateQueries(["alladdress_sender"])
        if(!data){
          swal({
            text: "لطفا تمام فیلد ها را پر کنید",
            icon: "error",
          })
        }else{
          console.log(data)
        }
      },
      onError: (error) => {
        swal({
           text: "لطفا تمام فیلد ها را پر کنید",
           icon: "error",
         })

       },
      
    })

const SubmitHandler=(event)=>{
    event.preventDefault();
    const indata={
        sender: true,
        address: address_sender.address,
        plaque: address_sender.peluck,
        unity: address_sender.vahed,
        name: address_sender.Fname,
        phone:address_sender.mobile,
        title:address_sender.Business,
        city:address_sender.idcity,
        district:address_sender.iddistrict,
      }
    addSenderAddress({indata,id})
     
 
  }
  return (
    <>
      <div className="flex flex-wrap gap-3">
      <button onClick={onOpen}>
        <FaEdit className="text-[20px] cursor-pointer text-bgcolor" />
      </button>
      </div>
      <Modal
        size={"3xl"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="bg-[#fff] w-full mt-10">
                  <span className="border-b-2 border-colorgreen border-solid ">
                    ثبت اطلاعات آدرس
                  </span>
                  <form className="mt-6" onSubmit={SubmitHandler}>
                    {/* start table */}
                    {/*start show address */}
                    <div className="flex flex-wrap w-full justify-around sm:flex-row flex-col">
                      <div className="lg:basis-[30%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">عنوان</label>
                        <input
                         value={address_sender.Business}
                         onChange={(event) => ChangeHandler(event)}
                         name="Business"
                         id="Business"
                         type="text"
                         className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[30%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">نام و نام خانوادگی</label>
                        <input
                         value={address_sender.Fname}
                         onChange={(event) => ChangeHandler(event)}
                         type="text"
                         name="Fname"
                         id="Fname"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[30%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">شماره همراه</label>
                        <input
                         value={address_sender.mobile}
                         onChange={(event) => ChangeHandler(event)}
                          type="number"
                          name="mobile"
                          id="mobile"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                       {/* start city */}
                       <div className="lg:basis-[45%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> شهر</label>
                        <select
                          type="text"
                          className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                          onClick={(event) => {
                            const item1 = datacity?.results.find(
                              (item) => item.name == event.target.value
                            );
                            setAddress_sender((prev) => ({
                              ...prev,
                              idcity: item1.id,
                            }));
                          }}
                        >
                          {datacity?.results.map((item, index) => {
                            return (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="lg:basis-[45%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> محله</label>
                        <select
                          type="text"
                          className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                          onClick={(event) => {
                            const item1 = datacity?.results.find(
                              (item) => address_sender.idcity==item.id
                            );
                            const item2 = item1?.district.find(
                              (item) => item.name==event.target.value
                            );
                            console.log(item1,item2)
                            // setAddress_sender((prev) => ({
                            //   ...prev,
                            //   iddistrict: item2.id,
                            // }));
                          }}
                        >
                          {datacity?.results.map((item, index) => {
                            if (item.id === address_sender.idcity) {
                              return (item?.district.map((k) => {
                                return (
                                  <option key={k.id} value={k.name}>
                                    {k.name}
                                  </option>
                                );
                              }));
                            }
                          })}
                        </select>
                      </div>
                      {/* end city */}
                      {/* start row */}
                    <div className="lg:w-[96%]  w-full mt-[5px] mx-auto">
                      <label htmlFor="title">آدرس</label>
                      <input
                        value={address_sender.address}
                        onChange={(event) => ChangeHandler(event)}
                          type="text"
                          name="address"
                          id="address"
                        className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                      />
                    </div>
                    {/* end row */}
                      <div className="lg:basis-[45%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> پلاک</label>
                        <input
                         onChange={(event) => ChangeHandler(event)}
                          value={address_sender.peluck}
                          type="number"
                          name="peluck"
                          id="peluck"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[45%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> واحد</label>
                        <input
                         onChange={(event) => ChangeHandler(event)}
                          value={address_sender.vahed}
                          type="number"
                          name="vahed"
                          id="vahed"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                    </div>
                    {/*start show address */}
        
                   
                    {/* start hidden adress*/}
                    {details? <div className="px-4 my-6 cursor-pointer " onClick={()=>{setDetails((prev)=>!prev)}}>جزئیات بیشتر...</div>:
                     <div className="flex flex-wrap w-full justify-around sm:flex-row flex-col mt-[20px]">
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">کد پستی</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">عرض جغرافیایی</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">طول جغرافیایی</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> ناحیه</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">خیابان اصلی 1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> خیابان اصلی 2</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> خیابان فرعی 1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> خیابان فرعی 2</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> کوچه اصلی 1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">کوچه اصلی 2 </label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> کوچه فرعی 1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">  کوچه فرعی 2</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                    </div>}
                   
                     {/* start hidden adress*/}
                    {/* end table */}
                    <div className="flex justify-around  mt-[50px] mb-[10px]">
                      <Button
                        onClick={onClose}
                        className="bg-bgcolor basis-[40%] text-[#fff] py-2 rounded"
                      >
                        انصراف
                      </Button>
                      <button
                       type="submit"
                        onClick={onClose}
                        className="bg-bgcolor basis-[40%] text-[#fff] py-2 rounded"
                      >
                        ثبت
                      </button>
                    </div>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
