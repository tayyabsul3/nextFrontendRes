"use client";
import { useAppDispatch } from "@/redux/hooks";
import { removefromcart, updateQuantity } from "@/redux/slices/product";
import { Product } from "@/types/product";
import React, { useState } from "react";
import { IoTrashBin } from "react-icons/io5";

const Cart = ({ item }: { item: any }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="row flex items-center pb-10 border-b   justify-between">
      <div className="col1 flex items-center   gap-4 md:w-60 ">
        <div className="w-20 bg-gray-50">
          <img
            src={item.image}
            alt="productImage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-lg " title={item.name}>
            {item.name}
          </h1>
          {/* <p title={item.description}>
            {item.description.slice(0, 20) + "..."}
          </p> */}
          <button
            className="font-bold pt-1 "
            onClick={() => {
              dispatch(removefromcart({ id: item.name }));
            }}
          >
            <IoTrashBin size={25} />
          </button>
        </div>
      </div>
      <div className="col2 ">
        <div className="qty_controller flex items-center justify-center rounded-full  ">
          <button
            className="subtract-button  h-6 pb-1 w-6 flex justify-center items-center  text-white active:mt-[2px]  bg-red-500 hover:bg-yellow-300  rounded-full"
            onClick={() => {
              dispatch(updateQuantity({ id: item.name, type: "decrease" }));
            }} // Decrease quantity onClick
          >
            -
          </button>
          <p className="mx-1 rounded-lg  border-gray-600 border-[1px] px-3  ">
            {item.quantity}
          </p>
          <button
            className="subtract-button  h-6 pb-1 w-6 flex justify-center items-center  text-white active:mt-[2px]  bg-red-500 hover:bg-yellow-300  rounded-full"
            onClick={() => {
              dispatch(updateQuantity({ id: item.name, type: "increase" }));
            }} // Increase quantity onClick
          >
            +
          </button>
        </div>
      </div>
      <div className="col3 max-md:hidden">
        <p>Rs {item.price}</p>
      </div>
      <div className="col4 max-md:hidden font-semibold text-lg">
        <h1>Rs {(item.price * item.quantity).toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default Cart;
