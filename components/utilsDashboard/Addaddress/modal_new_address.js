"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
import {Validate} from "./validate";
export default function App({type,toggleresiver,togglesender}) {
const {isOpen, onOpen, onClose} = useDisclosure();
const [address_Reciver,setAddress_Reciver]=useState({
  Fname:"",
  Business:"",
  address:"",
  peluck:"",
  tabaghe:"",
  vahed:"",
  mobile:""
})
const [address_sender,setAddress_sender]=useState({
  Fname:"",
  Business:"",
  address:"",
  peluck:"",
  tabaghe:"",
  vahed:"",
  mobile:""
})


const ChangeHandler=(event)=>{
if(type==="sender"){
  setAddress_sender(prev=>({
    ...prev,
    [event.target.name]:event.target.value
  }))
}else{
  setAddress_Reciver(prev=>({
    ...prev,
    [event.target.name]:event.target.value
  }))
}
}

const SubmitHandler=(event)=>{
  event.preventDefault();
 if(!Validate(address_sender.mobile||address_Reciver.mobile)){

   if(type==="sender"){
     fetch("https://mohaddesepkz.pythonanywhere.com/address/new/",{
       method:"POST",
           body: JSON.stringify({
             sender: true,
             address: address_sender.address,
             plaque: address_sender.peluck,
             stage: address_sender.tabaghe,
             unity: address_sender.vahed,
             name: address_sender.Fname,
             phone:address_sender.mobile,
           }),
           headers: {
             Authorization: `Bearer ${getCookie("access_token")}`,
             "Content-type": "application/json; charset=UTF-8",
           },
     }).then(res=>{
       if(!res.ok){
         swal({
           text: "لطفا تمام فیلد ها را پر کنید",
           icon: "error",
         });
         return null
       }else{
       return  res.json();
       }
     })
     .then(res=>{
       togglesender();
     }).catch(err=>{
       console.log("🚀 ~ file: modal_new_address.js:60 ~ SubmitHandler ~ err:", err)
     }
       )
     setAddress_sender({
       Fname:"",
       Business:"",
       address:"",
       peluck:"",
       tabaghe:"",
       vahed:"",
       mobile:""
     })
   }else{
     fetch("https://mohaddesepkz.pythonanywhere.com/address/new/",{
       method:"POST",
           body: JSON.stringify({
             sender: false,
             address: address_Reciver.address,
             plaque: address_Reciver.peluck,
             stage: address_Reciver.tabaghe,
             unity: address_Reciver.vahed,
             name: address_Reciver.Fname,
             phone:address_Reciver.mobile,
           }),
           headers: {
             Authorization: `Bearer ${getCookie("access_token")}`,
             "Content-type": "application/json; charset=UTF-8",
           },
     }).then(res=>
       {
         if(!res.ok){
           swal({
             text: "لطفا تمام فیلد ها را پر کنید",
             icon: "error",
           });
           return null
         }else{
         return  res.json();
         }
       })
      
     .then(res=>{
       toggleresiver()}).catch(err=>{
       console.log("🚀 ~ file: modal_new_address.js:60 ~ SubmitHandler ~ err:", err);
     })
   
     setAddress_Reciver({
       Fname:"",
       Business:"",
       address:"",
       peluck:"",
       tabaghe:"",
       vahed:"",
       mobile:""
     })
   
   }
 }else{
  swal({
    text: `لطفا تمام فیلد ها را پر کنید و شماره تماس معتبر وارد کنید!`,
    icon: "error",
  });
}
}

  return (
    <>
      <div className="flex flex-wrap gap-3">
      <Button key={"xl"} onPress={() => onOpen()} className="bg-bgcolor text-txcolor px-2 py-3 rounded-md">< FaPlus  className="inline-block"/>آدرس جدید </Button>

        
      </div>
      <Modal 
        size={"lg"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-3 mr-6">
              <form action="" className="mt-10" onSubmit={SubmitHandler}>
              <div className="mr-4">
                <label htmlFor="Fname">نام و نام خانوادگی</label>
                <input
                  value={type==="sender"?address_sender.Fname:address_Reciver.Fname}
                  onChange={(event) => ChangeHandler(event)}
                  type="text"
                  name="Fname"
                  id="Fname"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[95%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  placeholder="کیانوش عزیزی"
                />
              </div>
              <div className="mr-4 mt-4">
                <label htmlFor="Business">عنوان کسب و کار</label>
                <input
                  value={type==="sender"?address_sender.Business:address_Reciver.Business}
                  onChange={(event) => ChangeHandler(event)}
                  type="text"
                  name="Business"
                  id="Business"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[95%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  placeholder=""
                />
              </div>
              <div className="mr-4 mt-4">
                <label htmlFor="address">{type==="sender"?"آدرس فرستنده":"آدرس گیرنده"}<span className="text-[red] mr-2">(لطفا آدرس را با جزئیات وارد کنید)</span></label>
                <input
                 value={type==="sender"?address_sender.address:address_Reciver.address}
                onChange={(event) => ChangeHandler(event)}
                  placeholder="تهران،بلوار بریانک غربی،کوچه صالح آبادی"
                  type="text"
                  name="address"
                  id="address"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[95%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                />
              </div>
               {/* پلاک ،واحد و طبقه */}
               <div className="mr-4 mt-4 flex justify-around">
                <div>
                <label htmlFor="peluck">پلاک</label>
                <input
                   value={type==="sender"?address_sender.peluck:address_Reciver.peluck}
                  type="number"
                  name="peluck"
                  id="peluck"
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => ChangeHandler(event)}
                />
                </div>
                <div>
                <label htmlFor="tabaghe">طبقه</label>
                <input
                   value={type==="sender"?address_sender.tabaghe:address_Reciver.tabaghe}
                  type="number"
                  name="tabaghe"
                  id="tabaghe"
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => ChangeHandler(event)}
                />
                </div>
                <div>
                <label htmlFor="vahed">واحد</label>
                <input
                  value={type==="sender"?address_sender.vahed:address_Reciver.vahed}
                  type="number"
                  name="vahed"
                  id="vahed"
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => ChangeHandler(event)}
                />
                </div>
              </div>
  {/* پلاک ،واحد و طبقه */}
              <div className="mr-4 my-4">
                <label htmlFor="mobile">شماره تلفن</label>
                <input
                 value={type==="sender"?address_sender.mobile:address_Reciver.mobile}
                 onChange={(event) => ChangeHandler(event)}
                  type="number"
                  name="mobile"
                  id="mobile"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[95%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                />
              </div>
            
               <div className="flex justify-around">
               <button type="submit" >
                <Button color="primary" onPress={onClose} className="my-3 bg-[green] py-2 px-3 text-white ml-4 w-32  rounded">
                  ثبت
                </Button>
                </button>
               <Button color="danger" variant="light" onPress={onClose} className="my-3 bg-[red] py-2 px-3 text-white ml-4 w-32 rounded">
                 انصراف
                </Button>  
                </div> 
              
            </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
