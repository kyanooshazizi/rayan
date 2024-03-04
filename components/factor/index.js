"use client";
import React, { useRef } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";

const pageStyle = `
@page{
  size:140mm 100mm
};
@media all{
.pageBreak{
  display:none
}
};
@media print{
  .pageBreak{
    page-break-before:always;
  }
}
`;

const index = () => {
  const componentRef = useRef();

  return (
    <div className="w-full min-h-screen bg-white ">
      <div className="pt-[30px]">
        <div className="flex justify-around items-center">
          <div>
            <Image
              src="/imag_homepage/logoRayan1.svg"
              width={150}
              height={40}
              alt="Picture of the author"
            />
            <span>رایان پست</span>
          </div>
          <div>
            <ReactToPrint
              trigger={() => 
                <button className="w-[100px] px-2 py-2 text-white bg-colorgreen rounded-md">
                  پرینت/دانلود
                </button>
              }
              content={() => componentRef.current}
              pageStyle={pageStyle}
            />
          </div>
        </div>
      </div>
      <hr className="w-2/3 h-1 my-3 bg-green-400 mx-auto" />
      <div className="w-full  mx-auto" ref={componentRef} >
        <div className="w-[85%] p-2 mx-auto border-1 border-solid border-gray-100 rounded-md">
          {/* start:Header factor */}
          <div className="flex justify-between p-4 w-full">
            <div className="w-1/5">
              <div className="w-[100%] h-[100%] bg-gray-100 rounded-full mt-1 mx-auto"></div>
            </div>
            <div className="w-1/5">
              <QRCode
                value="960000"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div>
          <hr />
          {/* end:Header factor */}
          {/* start:main factor */}
          <div className="w-full flex  p-4">
            <div className="  basis-1/3">
              <span className="font-bold pb-1">مبدا</span>
              <div>تهران، ولیعصر، خیابان حافظ،پلاک 42</div>
            </div>
            <div className="  basis-1/3">
              <span className="font-bold pb-1">فرستنده</span>
              <div>کیانوش عزیزی</div>
            </div>
            <div className="  basis-1/3">
              <span className="font-bold pb-1">شماره تماس فرستنده</span>
              <div> 09331026932</div>
            </div>
          </div>
          <div className="w-full flex p-4">
            <div className=" basis-1/3">
              <span className="font-bold ">مقصد</span>
              <div>تهران، ولیعصر، خیابان حافظ،پلاک 42</div>
            </div>
            <div className="  basis-1/3">
              <span className="font-bold">گیرنده</span>
              <div>محمد نصیرالاسلامی</div>
            </div>
            <div className="  basis-1/3">
              <span className="font-bold">شماره تماس گیرنده</span>
              <div>09376445798</div>
            </div>
          </div>
          <hr />
          {/* end:main factor */}
          {/* start:footer factor */}
          <div className="w-full flex justify-between my-3 px-8">
            {/* <Barcode value="12456" height="50px" /> */}
            <div>
              <Image
                src="/imag_homepage/logoRayan1.svg"
                width={120}
                height={20}
                alt="Picture of the author"
                className="mt-2"
              />
            </div>
            <span className="pt-1 block">rayanpost.ir</span>
          </div>
          {/* end:footer factor */}
        </div>
      </div>
    </div>
  );
};

export default index;
