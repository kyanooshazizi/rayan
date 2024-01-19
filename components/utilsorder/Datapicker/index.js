// تقویم
"use client"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import "react-multi-date-picker/styles/colors/yellow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import styles from "../../../style/neumorfism.module.css";
import {
  MethodDate,
} from "../../Redux/orderslice";
import { useDispatch, useSelector } from "react-redux";



const index = ({getprice}) => {
const [holidy,setHolidy]=useState()
  useEffect(()=>{
    try {
      fetch("https://mohaddesepkz.pythonanywhere.com/options/holidays/").then(res=>res.json()).then(res=>setHolidy(res)).catch(err=>alert("روز های تعطیل بارگذاری نشد"))
    } catch (error) {
      console.error(error);
    }
    
   
  },[])
  
    const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  // محدود کردن تقویم
  const date = new DateObject({ calendar: persian, locale: persian_fa });
  // خواندن دیتای تقویم
  const [state, setState] = useState({ format: "MM/DD/YYYY", persian: "" });
  const convert = (date, format = state.format) => {
    let object = { date, format };
    dispatch(MethodDate(new DateObject(object).format()));
    setState({
      jsDate: date.toDate(),
      persian: new DateObject(object).format(),
      ...object,
    });
  };
  const changeHolidy=(date,currentMonth)=>{
 let month= Object.keys(holidy).find((key)=>{
    if(currentMonth.index==key){
      return holidy[key]
    }})
         
   
  return  holidy[month]
  }
  return (
    <>
     {/* شروع تقویم */}
     <div
                className={`mt-8 w-1/2 bg-white mx-auto -translate-x-3 rounded-lg py-10 my-14 ${styles.numDatapicker}`}
              >
                <div className="w-full text-right mr-3 mb-3">
                  <p className="mb-2 text-yellow-500"><span className="text-red-600 text-xl font-bold">*</span><span className="text-[red] pl-2">توجه:</span>نزدیکترین تاریخ جمع آوری مرسوله <span>{getprice[0].earliest_pickup_date}</span> است</p>                  
                  <span className="mx-2  py-2 px-1 rounded-md text-txcolor">
                    تاریخ جمع آوری مرسوله را مشخص کنید؟
                  </span>
                </div>
                <div className="w-full text-right mr-3">
                  <DatePicker
                   mapDays={({ date,currentMonth }) => {
                    let isWeekend = date.weekDay.index === 6
                    if(changeHolidy(date,currentMonth).find(item=>item==date.day)) return {
                      disabled: true,
                      style: { color: "red", backgroundColor:""},
                      onClick: () => toast.info('روز های جمعه و روز های تعطیل را برای جمع آوری مرسوله نمی توانید انتخاب کنید', {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        })
                    }
                    if (isWeekend) return {
                      disabled: true,
                      style: { color: "red", backgroundColor:""},
                      onClick: () => toast.info('روز های جمعه و روز های تعطیل را برای جمع آوری مرسوله نمی توانید انتخاب کنید', {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        })
                    }
                  }}
                    value={state.date}
                    onChange={convert}
                    plugins={[<DatePickerHeader />,weekends()]}
                    // plugins={[weekends()]}
                    inputClass="border-gray-400 bg-gray-100 border-2 border-solid px-2 py-2 rounded-lg cursor-pointer w-[400px]"
                    className="red"
                    placeholder="انتخاب کن"
                    calendar={persian}
                    locale={persian_fa}
                    animations={[transition()]}
                    minDate={new DateObject({ calendar: persian }).set(
                      "day",
                      +getprice[0].earliest_pickup_date.split("/")[2]
                      // getprice?+getprice[0].earliest_pickup_date.split("/")[2]: date.day 
                    )}
                  />
                </div>
              </div>
              {/* پایان تقویم */}
    </>
  )
}

export default index
