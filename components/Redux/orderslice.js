//counterSlice.jsx

"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";
const x={
  pick_up: "",
  delivery: "",
  service: "",
  package: {
    packB: { number: 0 },
    packM: { number: 0 },
    packS: { number: 0 },
  },
  document: {
    number: 0,
  },
  Price: "",
  Insurance: {
    Product_value:"",
    Product_content:"",
  },
  pickup_date: "",
}
const initialState = {
  order: localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order"))
    :x ,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    MethodBackHomepage:(state) => {
      state.order={...state.order,package: {
        packB: { number: 0 },
        packM: { number: 0 },
        packS: { number: 0 },
      },
      document: {
        number: 0,
      },
      Price: "",
      Insurance: {
        Product_value: "",
        Product_content: "",
      },
      pickup_date: ""}
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodDeletOrder:(state) => {
      state.order=x;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodPick_up: (state, action) => {
      state.order.pick_up = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodDelivery: (state, action) => {
      state.order.delivery = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodService: (state, action) => {
      state.order.service = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    Methodpackageadd: (state, action) => {
      switch (action.payload) {
        case "packB":
          state.order.package.packB.number += 1;

          break;
        case "packM":
          state.order.package.packM.number += 1;

          break;
        case "packS":
          state.order.package.packS.number += 1;

          break;
      }
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    Methodpackagedelet: (state, action) => {
      switch (action.payload) {
        case "packB":
          state.order.package.packB.number -= 1;
          break;
        case "packM":
          state.order.package.packM.number -= 1;
          break;
        case "packS":
          state.order.package.packS.number -= 1;
          break;
      }
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodPrice: (state, action) => {
      state.order.Price = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodInsurance_value: (state, action) => {
      state.order.Insurance.Product_value = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodInsurance_content: (state, action) => {
      state.order.Insurance.Product_content = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodDate: (state, action) => {
      state.order.pickup_date = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    MethodDocument: (state, action) => {
      switch(action.payload){
          case "plus":
            state.order.document.number+= 1;
            break;
          case "mines":
            state.order.document.number-= 1;
            break;
      }
      localStorage.setItem("order", JSON.stringify(state.order));
    },
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
  MethodDocument,
} = orderSlice.actions;

export default orderSlice.reducer;
