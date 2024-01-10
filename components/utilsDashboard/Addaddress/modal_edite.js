"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
export default function App({type,data,toggleresiver}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
const [address,setAddress]=useState({
  sender:false,
    name:data.name,
    address:data.address,
    plaque:data.plaque,
    stage:data.stage,
    unity:data.unity,
    phone:data.phone
})
console.log("🚀 ~ file: modal_edite.js:18 ~ App ~ address:", address)
const ChangeHandler=(event)=>{
  setAddress(prev=>({
      ...prev,
      [event.target.name]:event.target.value
    }))
  }
const SubHandler=(event)=>{
  event.preventDefault();
   fetch(`https://mohaddesepkz.pythonanywhere.com/address/edit/${data.id}/`,{
        method:"PUT",
            body: JSON.stringify({
              ...address
            }),
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
              "Content-type": "application/json; charset=UTF-8",
            },
      }).then(res=>{
        if(!res.ok){
          swal({
            text: "آدرس ویرایش نشد!",
            icon: "error",
          });
          return null
        }else{
        return  res.json();
        }
      })
      .then(res=>{
        console.log(res);
        toggleresiver();
      }).catch(err=>{
       console.log("🚀 ~ file: modal_edite.js:47 ~ .then ~ err:", err)   
      }
        )  
}

  return (
    <>
     <div>
     <div className="flex flex-wrap gap-3">
      <Button key={"xl"} onPress={() => onOpen()} className="bg-txcolor w-3 h-5"> <FaEdit onPress={() => onOpen()} className="text-xl text-[green] mx-4" /> </Button>
     
        
      </div>
      <Modal 
        size={"xl"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-4 mr-6">
              <form action="" className="mt-10" onSubmit={(event)=>SubHandler(event)}>
              <div className="mr-4">
                <label htmlFor="name">نام و نام خانوادگی</label>
                <input
                  value={address.name}
                  onChange={(event) => ChangeHandler(event)}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  placeholder="کیانوش عزیزی"
                />
              </div>
              <div className="mr-4 mt-4">
                <label htmlFor="address">آدرس گیرنده<span className="text-[red] mr-2">(لطفا آدرس را با جزئیات وارد کنید)</span></label>
                <input
                value={address.address}
                onChange={(event) => ChangeHandler(event)}
                  placeholder="تهران،بلوار بریانک غربی،کوچه صالح آبادی"
                  type="text"
                  name="address"
                  id="address"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                />
              </div>
               {/* پلاک ،واحد و طبقه */}
               <div className="mr-4 mt-4 flex justify-around">
                <div>
                <label htmlFor="plaque">پلاک</label>
                <input
                  value={address.plaque}
                  type="text"
                  name="plaque"
                  id="plaque"
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => ChangeHandler(event)}
                />
                </div>
                <div>
                <label htmlFor="stage">طبقه</label>
                <input
                  value={address.stage}
                  type="text"
                  name="stage"
                  id="stage"
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => ChangeHandler(event)}
                />
                </div>
                <div>
                <label htmlFor="unity">واحد</label>
                <input
                  value={address.unity}
                  type="text"
                  name="unity"
                  id="unity"
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => ChangeHandler(event)}
                />
                </div>
              </div>
  {/* پلاک ،واحد و طبقه */}
              <div className="mr-4 my-4">
                <label htmlFor="phone">شماره تلفن</label>
                <input
                value={address.phone}
                onChange={(event) => ChangeHandler(event)}
                  type="number"
                  name="phone"
                  id="phone"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
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
     </div>
    
    </>
  );
}
