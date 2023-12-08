//store.jsx

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderslice";

const rootReducer = combineReducers({
  order: orderReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
