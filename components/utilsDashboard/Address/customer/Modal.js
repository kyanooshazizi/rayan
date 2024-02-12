import React from "react";
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
export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="">
        <Button
          onPress={() => handleOpen()}
          className="sm:text-[16px] text-[14px] cursor-pointer  w-full text-[#fff]  bg-bgcolor rounded-[4px] text-center py-[15px]"
        >
          <FaPlus className="inline-block mx-1" />
          افزودن
        </Button>
      </div>
      <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="bg-[#fff] w-full mt-10">
                  <form >
                   <div className="flex justify-around lg:flex-row flex-col">
                   <div>
                      <label htmlFor="name block">نام و نام خانوادگی</label>
                      <input
                        type="text"
                        className="bg-dashboard px-2 py-2 outline-colorgreen border-2 border-solid border-gary-300 rounded block"
                      />
                    </div>
                    <div>
                      <label htmlFor="name block">شماره همراه</label>
                      <input
                        type="text"
                        className="bg-dashboard px-2 py-2 outline-colorgreen border-2 border-solid border-gary-300 rounded block"
                      />
                    </div>
                    <div>
                      <label htmlFor="name block">تلفن</label>
                      <input
                        type="text"
                        className="bg-dashboard px-2 py-2 outline-colorgreen border-2 border-solid border-gary-300 rounded block"
                      />
                    </div>
                   </div>
                   <div className="flex justify-around  mt-[100px] mb-[10px]" >
                       <button onClick={onClose} className="bg-bgcolor basis-[40%] text-[#fff] py-2 rounded">انصراف</button>
                       <button onClick={onClose} className="bg-bgcolor basis-[40%] text-[#fff] py-2 rounded">ثبت</button>
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
