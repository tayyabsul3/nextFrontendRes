"use client";
import Link from "next/link";
import React, { useState } from "react";

import { MdKeyboardArrowRight } from "react-icons/md";

const ProductDetails = ({ data: apidata }: any) => {
  const [data, setdata] = useState(apidata);
  console.log(apidata);

  return (
    <div className="mt-28 mb-10 px-0 w-full">
      <div className="breadcrumbs w-full  ">
        <div className="breadcrumb space-x-2 flex  max-sm:mb-5 text-xs  items-center">
          <Link href={"/"}>Home</Link>
          <div className="pt-0.5 font-thin text-gray-400">
            <MdKeyboardArrowRight size={13} />
          </div>
          <h1 className="text-yellow-400">{data.name}</h1>
        </div>
        <div className="prodt p-0 w-full md:p-4 lg:p-8 ">
          <div className="card bg-white w-full  max-w-[1500px] md:p-2 rounded-lg border-2  border-white    shadow-sm cursor-pointer mx-auto">
            <div className="flex py-6 flex-col lg:flex-row">
              <div className="image w-[60%] relative mb-4 mx-auto md:w-[40%] lg:p-10">
                <img
                  src={data.image}
                  alt="logo"
                  className="rounded-2xl w-full"
                />
              </div>

              <div className="description mt-2 text-left p-2 sm:ml-10 flex flex-col lg:p-10 flex-1 justify-between">
                <div>
                  <div>
                    <h1 className="font-bold text-3xl text-center lg:text-left">
                      {data.name}
                    </h1>
                    {/* <p className=" text-sm text-center lg:text-left mb-3">
                      {data.description}
                    </p> */}
                  </div>
                  <div className="options">{data?.hasRange ? "" : ""}</div>
                </div>

                <div className="flex gap-6 flex-col lg:flex-row">
                  <div className="quantitycontroller flex gap-1 items-center justify-center ">
                    <button
                      className="subtract-button pb-1 h-10 w-10  sm:h-12 sm:w-12  bg-red-500  text-3xl flex justify-center items-center rounded-full
                   "
                      // onClick={() => {
                      //   if (Quantity === 1) {
                      //     alert("cannot be negatice");
                      //     return;
                      //   }
                      //   setQuantity((prev) => (prev -= 1));
                      //   console.log(bill);
                      //   setbill(price * Quantity);
                      //   console.log(Quantity);
                      // }}
                    >
                      -
                    </button>
                    <p className="flex-1 sm:flex-[0.5] flex justify-center h-10 md:h-12 border-[1px] px-4 border-gray-300 md:px-6 md:py-1 text-3xl rounded-3xl bg-white ">
                      {data.quantity}
                    </p>
                    <button
                      // on
                      // onClick={() => {
                      //   setQuantity((prev) => (prev += 1));
                      //   setbill((prev) => (prev += 590));
                      //   console.log();
                      //   console.log(Quantity);
                      // }}
                      className="subtract-button pb-1 h-10 w-10  sm:h-12 sm:w-12  bg-red-500  text-3xl flex justify-center items-center rounded-full
                   "
                    >
                      +
                    </button>
                  </div>
                  <div
                    className="pricing flex justify-between md:px-5 md:gap-10  items-center mx-auto bg-red-600 font-bold py-3 rounded-full ml-auto hover:bg-yellow-400 md:w-[80%] lg:w-[60%]  text-white hover:text-black mt-1 mb-1 transition duration-100
                    w-full px-5
                    "
                    // onClick={() => {
                    //   item = {
                    //     id,
                    //     name,
                    //     description,
                    //     price,
                    //     category,
                    //     image,
                    //     quantity: Quantity,
                    //   };

                    //   dispatch(addtocart(item));

                    //   setQuantity(1);
                    //   setbill(price);
                    // }}
                  >
                    <h3>Rs {}</h3>
                    <button className="addtocartbutton">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
