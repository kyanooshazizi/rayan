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
import { FaPlus } from "react-icons/fa";
function modalnewBusiness() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [business, setBusiness] = useState({
    name: "",
    type: "",
    tickBill: "",
    natinalcode: "",
  });
console.log(business)
  const ChangeHandler = (event) => {
    setBusiness((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const SubHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Button
        key={"md"}
        onPress={() => {
            setBusiness({
                ...business,
                tickBill:false
            })
            return onOpen()
        }}
        className="bg-bgcolor text-txcolor md:text-base text-xs  p-2 rounded mb-2 "
      >
        <FaPlus className="inline-block" /> افزودن کسب و کار جدید
      </Button>
      <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="pt-4">
                <form
                  action=""
                  className="p-2"
                  onSubmit={(event) => SubHandler(event)}
                >
                  <div className="p-1">
                    <label htmlFor="name">نام کسب و کار</label>
                    <input
                      value={business.name}
                      onChange={(event) => ChangeHandler(event)}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-[#F4F3F3] block rounded  px-2 py-3 w-full outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                    />
                  </div>
                  <div className="p-1">
                    <label htmlFor="type">نوع کسب و کار</label>
                    <input
                      value={business.type}
                      onChange={(event) => ChangeHandler(event)}
                      type="text"
                      name="type"
                      id="type"
                      className="bg-[#F4F3F3] block rounded  px-2 py-3 w-full outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                    />
                  </div>
                  {business.tickBill?<div className="p-1">
                    <label htmlFor="natinalcode">شناسه کسب و کار </label>
                    <input
                      value={business.natinalcode}
                      onChange={(event) => ChangeHandler(event)}
                      type="text"
                      name="natinalcode"
                      id="natinalcode"
                      className="bg-[#F4F3F3] block rounded  px-2 py-3 w-full outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                    />
                  </div>:""}

                  <div className="p-1">
                    <input
                      value={business.tickBill}
                      onChange={(event) =>setBusiness((prev)=>({
                       ...prev,
                       tickBill:event.target.checked
                      }))}
                      type="checkbox"
                      name="tickBill"
                      id="tickBill"
                    />
                    <label htmlFor="tickBill" className="pr-2 pt-3 cursor-pointer">آیا به صورت حساب نیاز دارید؟</label>
                  </div>
                  
                  
                  <div className="flex justify-around">
                    <button type="submit">
                      <Button
                        color="primary"
                        onPress={onClose}
                        className="my-3 bg-green-500 sm:text-lg sm:py-2 sm:px-3 text-white sm:ml-2 sm:w-32  rounded  p-1 text-base "
                      >
                        ثبت
                      </Button>
                    </button>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="my-3 bg-red-500 sm:text-lg sm:py-2 sm:px-3 text-white sm:ml-2 sm:w-32  rounded  p-1 text-base "
                    >
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

export default modalnewBusiness;
