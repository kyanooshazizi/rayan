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
      <div className="flex flex-wrap gap-3">
        <Button
          onPress={() => handleOpen()}
          className="sm:text-[16px] text-[14px] cursor-pointer  w-full text-[#fff]  bg-bgcolor rounded-[4px] text-center "
        >
          <FaPlus className="inline-block mx-1" />
          ثبت آدرس جدید
        </Button>
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
                  <form className="mt-6">
                    {/* start table */}
                    {/* start:top */}
                    <div className="flex flex-wrap w-full justify-around sm:flex-row flex-col">
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">عنوان</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">استان</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">شهر</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">ناحیه</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">خیابان اصلی1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">خیابان اصلی 2</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">خیابان فرعی 1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">خیابان فرعی 2</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">کوچه اصلی 1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">کوچه اصلی 2</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">کوچه فرعی 1</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">کوچه فرعی 2</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                    </div>
                    {/* end top */}
                    {/* start row */}
                    <div className="lg:w-[95%]  w-full mt-[5px] mx-auto">
                      <label htmlFor="title">آدرس</label>
                      <input
                        type="text"
                        className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                      />
                    </div>
                    {/* end row */}
                    {/* start:bottem */}
                    <div className="flex flex-wrap w-full justify-around sm:flex-row flex-col">
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">پلاک</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">طبقه</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title">واحد</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
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
                        <label htmlFor="title"> پلاک</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> طبقه</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> واحد</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> کد پستی</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> عرض جغرافیایی</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                      <div className="lg:basis-[28%] sm:basis-[48%] basis-full mt-[5px]">
                        <label htmlFor="title"> طول جغرافیایی</label>
                        <input
                          type="text"
                          className="outline-none bg-dashboard border-2 border-solid border-gray-200 w-full px-2 py-2"
                        />
                      </div>
                    </div>
                    {/* end bottem */}
                    {/* end table */}
                    <div className="flex justify-around  mt-[50px] mb-[10px]">
                      <button
                        onClick={onClose}
                        className="bg-bgcolor basis-[40%] text-[#fff] py-2 rounded"
                      >
                        انصراف
                      </button>
                      <button
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
