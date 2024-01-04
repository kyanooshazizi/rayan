//counterSlice.jsx

"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";
import {encryptData,decryptData} from "../utilsFunction/enc_dec";

const detailsOrder={
  pick_up: "",
  delivery: "",
  service: "",
  package: {
    packB: { number: 0 },
    packM: { number: 0 },
    packS: { number: 0 },
  },
  document: {
    afour: { number: 0 },
    athree: { number: 0 },
  },
  Price: "",
  Insurance: {
    Product_value:"",
    Product_content:"",
  },
  pickup_date: "",
  id:{
    package:"",
    size:["","",""],
    service:"",
    content:"",
    value:"",
    count:[0,0,0],
  }
}
const detailsAddress={
SenderName:"",
SenderAddress:"",
Senderpelak:"",
Sendervahed:"",
Sendertabaghe:"",
SenderMobile:"",
ReceiverName:"",
ReceiverAddress:"",
Receiverpelak:"",
Receivervahed:"",
Receivertabaghe:"",
ReceiverMobile:"",
Additional_details:""
}

  const initialState = {
    order:typeof window !== "undefined"?(localStorage.getItem("order")
    ? decryptData("order")
    :detailsOrder):detailsOrder,
   address:typeof window !== "undefined"?(decryptData("address")?JSON.parse(decryptData("address")):detailsAddress):detailsAddress
  };

  


export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // start:detais order
    
    MethodBackHomepage:(state) => {
      state.order={...state.order,
      Price: "",
      Insurance: {
        Product_value: "",
        Product_content: "",
      },
      pickup_date: "",
      id:{
       ...state.order.id,
        service:"",
        content:"",
        value:"",
        
      }
    },
    encryptData("order", state.order);
    },
    MethodDeletOrder:(state) => {
      state.order=detailsOrder;
      encryptData("order",state.order);
    },
    MethodPick_up: (state, action) => {
      state.order.pick_up = action.payload;
      encryptData("order", state.order);
    },
    MethodDelivery: (state, action) => {
      state.order.delivery = action.payload;
      encryptData("order", state.order);
    },
    MethodService: (state, action) => {
      state.order.service = action.payload.title;
      state.order.id.package = action.payload.id;
      encryptData("order", state.order);
    },
    Methodpackageadd: (state, action) => {
      switch (action.payload.split("*")[0]) {
        case "packB":
          state.order.package.packB.number += 1;
          state.order.id.size[0]=(+(action.payload.split("*")[1]));
          state.order.id.count[0]=( state.order.package.packB.number);
          break;
        case "packM":
          state.order.package.packM.number += 1;
          state.order.id.size[1]=(+(action.payload.split("*")[1]));
          state.order.id.count[1]=( state.order.package.packM.number);

          break;
        case "packS":
          state.order.package.packS.number += 1;
          state.order.id.size[2]=(+(action.payload.split("*")[1]));
          state.order.id.count[2]=( state.order.package.packS.number);

          break;
      }
      encryptData("order", state.order);
    },
    Methodpackagedelet: (state, action) => {
      switch (action.payload) {
        case "packB":
          state.order.package.packB.number -= 1;
          state.order.id.count[0]=( state.order.package.packB.number);
          if(state.order.package.packB.number==0){
            state.order.id.size[0]=""
          }
          break;
        case "packM":
          state.order.package.packM.number -= 1;
          state.order.id.count[1]=( state.order.package.packM.number);
          if(state.order.package.packM.number==0){
            state.order.id.size[1]=""
          }
          break;
        case "packS":
          state.order.package.packS.number -= 1;
          state.order.id.count[2]=( state.order.package.packS.number);
          if(state.order.package.packS.number==0){
            state.order.id.size[2]=""
          }
          break;
      }
      encryptData("order", state.order);
    },
    MethodPrice: (state, action) => {
      state.order.Price = action.payload.amount;
      state.order.id.service = action.payload.id;
      encryptData("order", state.order);
    },
    MethodInsurance_value: (state, action) => {
      state.order.Insurance.Product_value = action.payload.split("*")[0];
      state.order.id.value = +(action.payload.split("*")[1]);
      encryptData("order", state.order);
    },
    MethodInsurance_content: (state, action) => {
      state.order.Insurance.Product_content = action.payload.split("*")[0];
      state.order.id.content = +(action.payload.split("*")[1]);
      encryptData("order", state.order);
    },
    MethodDate: (state, action) => {
      state.order.pickup_date = action.payload;
      encryptData("order", state.order);
    },
    MethodDocument_plus: (state, action) => {
      switch(action.payload.split("*")[0]){
          case "A4":
            state.order.document.afour.number+= 1;
            state.order.id.size[0]=(+(action.payload.split("*")[1]));
          state.order.id.count[0]=( state.order.document.afour.number);
            break;
          case "A3":
            state.order.document.athree.number+= 1;
            state.order.id.size[1]=(+(action.payload.split("*")[1]));
            state.order.id.count[1]=( state.order.document.athree.number);
            break;
      }
      encryptData("order",state.order);
    },
    MethodDocument_mines: (state, action) => {
      switch(action.payload.split("*")[0]){
          case "A4":
            state.order.document.afour.number-= 1;
            state.order.id.count[0]=( state.order.document.afour.number);
            if( state.order.document.afour.number==0){
              state.order.id.size[0]=""
            }
            break;
          case "A3":
            state.order.document.athree.number-= 1;
            state.order.id.count[1]=( state.order.document.athree.number);
            if( state.order.document.athree.number==0){
              state.order.id.size[1]=""
            }
            break;
      }
      encryptData("order",state.order);
    },
    // end:details order
    // start:details Address
    MethodSenderName:(state,action)=>{
      state.address.SenderName=action.payload;
      encryptData("address",JSON.stringify(state.address))
    },
    MethodSenderAddress:(state,action)=>{
      state.address.SenderAddress=action.payload;
      encryptData("address",JSON.stringify(state.address))
    },
    MethodSenderMobile:(state,action)=>{
      state.address.SenderMobile=action.payload;
      encryptData("address",JSON.stringify(state.address))
    },
    MethodReceiverName:(state,action)=>{
      state.address.ReceiverName=action.payload;
      encryptData("address",JSON.stringify(state.address))
    },
    MethodReceiverAddress:(state,action)=>{
      state.address.ReceiverAddress=action.payload;
      encryptData("address",JSON.stringify(state.address))
    },
    MethodReceiverMobile:(state,action)=>{
      state.address.ReceiverMobile=action.payload;
      encryptData("address",JSON.stringify(state.address))
    },
    MethodAdditional_details:(state,action)=>{
      state.address.Additional_details=action.payload;
      encryptData("address",JSON.stringify(state.address))
    },
    MethodSenderAddress_details:(state,action)=>{
      const switcha=action.payload.split("**");
     
      switch(switcha[0]){
        case "پلاک":
           state.address.Senderpelak=switcha[1];
          break;
        case "واحد":
           state.address.Sendervahed=switcha[1];
          break;
        case "طبقه":
             state.address.Sendertabaghe=switcha[1];
            break;
    }
      encryptData("address",JSON.stringify(state.address))
    },
    MethodReceiverAddress_details:(state,action)=>{
      const switcha=action.payload.split("**");
      switch(switcha[0]){
        case "پلاک":
           state.address.Receiverpelak=switcha[1];
          break;
        case "واحد":
           state.address.Receivervahed=switcha[1];
          break;
        case "طبقه":
             state.address.Receivertabaghe=switcha[1];
            break;
    }
      encryptData("address",JSON.stringify(state.address))
    }
    // end:details Address
  },
});


export const {
  MethodBackHomepage,
  MethodDeletOrder,
  MethodPick_up,
  MethodDelivery,
  MethodService,
  Methodpackageadd,
  Methodpackagedelet,
  MethodPrice,
  MethodInsurance_value,
  MethodInsurance_content,
  MethodDate,
  MethodDocument_plus,
  MethodSenderName,
  MethodSenderAddress,
  MethodSenderMobile,
  MethodReceiverName,
  MethodReceiverAddress,
  MethodReceiverMobile,
  MethodAdditional_details,
  MethodSenderAddress_details,
  MethodReceiverAddress_details,
  MethodDocument_mines
  
} = orderSlice.actions;

export default orderSlice.reducer;
