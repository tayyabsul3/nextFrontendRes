"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removefromcart, updateQuantity } from "@/redux/slices/product";
import { toogleShowCart } from "@/redux/slices/states";
import { Product } from "@/types/product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { PiHandbagLight } from "react-icons/pi";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { iscartvisible } = useAppSelector((state) => state.globalState);
  const { cart } = useAppSelector((state) => state.product);

  const CalculateTotalPrice = () => {
    // return cart.reduce((acc, curr) => acc + curr.price, 0);
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  };
  const [cartItems, setcartItems] = useState(cart);

  useEffect(() => {
    setcartItems(cart);
    console.log("cart updated");
    // eslint-disable-next-line
  }, [cart]);

  // async function handlePayment() {
  //   const stripe = await loadStripe(
  //     "pk_test_51P7cVS08rJiDP5N1ZvR5aQvx8QWOTEUqLugpiJPjc8iwMZa2SeRRJgac21vXKKNtWWM3t5PwwbNzdYvwPPqsPCRe00M8NZQEvT"
  //   );

  //   try {
  //     const res = await axios.post("", cart, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     // const result = stripe?.redirectToCheckout({
  //     //   // sessionId: res.id,
  //     // });
  //     // if (result.error) {
  //     //   console.error("Payment failed:", result.error);
  //     // } else {
  //     //   console.log("Payment succeeded, see below:", result);
  //     // }
  //   } catch (error) {
  //     console.error("Error making payment:", error);
  //   }
  // }

  const CalculateSubTotalPrice = () => {
    const cartTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return cartTotal.toFixed(2);
  };

  function LimitWords(s: string, n: number) {
    return s.slice(0, n) + "...";
  }

  return (
    <div>
      <div
        onClick={() => {
          dispatch(toogleShowCart({}));
        }}
        className="cart border-l-[1px] pl-5   border-red-600 p-2 relative cursor-pointer"
      >
        <p className="cartquantity absolute bg-white rounded-[50%] text-[20px] font-bold w-6 h-6 flex justify-center items-center p-1  top-[-10px] left-[30px] bottom-1 border-[1px] border-black">
          {cartItems.length}
        </p>
        <p className="text-red-600 text-2xl ">
          <FaShoppingCart />
        </p>
      </div>
      {iscartvisible && (
        <div
          onClick={() => {
            dispatch(toogleShowCart({}));
          }}
          className="overlay bg-black/50 h-[100vh] fixed top-0 right-0 z-10  w-full  "
        ></div>
      )}
      <div
        className={`cart fixed rounded-l-2xl  top-0 h-full w-[250px] sm:w-[500px] z-20 right-0 transition-all duration-300 ${
          iscartvisible ? "tranlate-x-0 " : "translate-x-[500px]"
        } p-5 bg-white shadow-2xl`}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Cart</h1>
          <button
            className=""
            onClick={() => {
              dispatch(toogleShowCart({}));
            }}
          >
            <IoMdClose size={25} />
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-5 h-[75%] overflow-auto no_scrollbar">
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item: any, index: number) => (
              <div className="item flex p-2 border-b  gap-2" key={index}>
                <div className="img w-[30%]">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-[130px] rounded-md"
                  />
                </div>
                <div className="info flex flex-col justify-between w-full">
                  <div className="title">
                    <h1 className="font-bold">{item.name}</h1>
                    {/* <p className="text-sm" title={item.description}>
                      {LimitWords(item.description, 80)}
                    </p> */}
                  </div>
                  <div>
                    <p className="text-right my-1">
                      RS {item.quantity * item.price}
                    </p>
                    <div className="modify_item flex justify-between">
                      <div className="qty_controller flex items-center justify-center rounded-full  ">
                        <button
                          className="subtract-button  h-6 pb-1 w-6 flex justify-center items-center  text-white active:mt-[2px]  bg-red-500 hover:bg-yellow-300  rounded-full"
                          onClick={() => {
                            dispatch(
                              updateQuantity({
                                id: item.name,
                                type: "decrease",
                              })
                            );
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
                            dispatch(
                              updateQuantity({
                                id: item.name,
                                type: "increase",
                              })
                            );
                          }} // Increase quantity onClick
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          console.log(item);
                          dispatch(removefromcart({ id: item.name }));
                        }}
                      >
                        <IoTrashBin size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="checkout fixed  bottom-0 w-[90%] md:w-[450px] p-2 bg-white">
          <div className="subtotal flex justify-between w-ful border-t pt-2 bt-[1px] px-4 ">
            <h1 className="text-gray-500"> Subtotal</h1>
            <p className="text-gray-500">Rs {CalculateSubTotalPrice()}</p>
          </div>
          <div className="delivery flex justify-between w-full px-4">
            <h1 className="text-gray-500"> Delivery Charges</h1>
            <p className="text-gray-500">Rs 0.00</p>
          </div>
          <div className="g_total flex justify-between w-full  px-4">
            <h1 className="font-bold text-xl">Grand total</h1>
            <p className="text-gray-400 font-bold">
              {" "}
              Rs {CalculateTotalPrice().toFixed(2)}
            </p>
          </div>
          <Link href={"/cart"}>
            <button
              onClick={() => {
                dispatch(toogleShowCart({}));
              }}
              className=" bg-red-600 text-sm w-full py-2 px-2  md:px-3 font-bold md:py-3 rounded-sm  text-white hover:bg-yellow-400 hover:text-black mt-1 mb-1  "
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
