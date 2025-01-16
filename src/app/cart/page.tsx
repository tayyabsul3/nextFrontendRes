"use client";
import Cart from "@/components/Cart/Cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/redux/slices/order";
import { updateQuantity, updateProductData } from "@/redux/slices/product";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/components/Reusables/Functions";

// if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
//   throw new Error("Please provide a public key");
// }

// const stripPromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const page = () => {
  const dispatch = useAppDispatch();
  const [activeOption, setactiveOption] = useState<number>(1);
  const [completed, setcompleted] = useState<number[]>([]);
  const { cart } = useAppSelector((state) => state.product);
  const [cartItems, setcartItems] = useState(cart);
  useEffect(() => {
    setcartItems(cart);
  }, [cart]);
  const [selectedOption, setSelectedOption] = useState("");

  const shippingOptions = [
    { id: "cashDelivery", label: "Cash on Devlivery", price: 0 },
  ];
  const steps = [
    { label: "Cart", status: 1 },
    { label: "Shipping and Devlivery", status: 2 },
    { label: "Order", status: 3 },
  ];
  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
  };

  const CalculateTotalPrice = () => {
    const shippingPrice =
      shippingOptions.find((option) => option.id === selectedOption)?.price ||
      0;
    const cartTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return (cartTotal + shippingPrice).toFixed(2);
  };
  // const CalculateSubTotalPrice = () => {
  //   const cartTotal = cart.reduce(
  //     (acc, curr) => acc + curr.price * curr.quantity,
  //     0
  //   );
  //   return cartTotal.toFixed(2);
  // };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const newOrder = async (data: any) => {
  //   fetch("http://localhost:4000/orders/new", {
  //     method: "POST",
  //     credentials: 'same-origin',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...data }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {

  //       const { order, success } = res;
  //       if (success) {
  //         dispatch(
  //           createOrder({
  //             data: order,
  //           })
  //         );
  //         alert("order sucess" + res);
  //       } else {
  //         console.log(res);
  //       }
  //     })
  //     // .then(() => {

  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         phoneNumber: "",
  //         email: "",
  //         streetAddress: "",
  //         country: "",
  //         city: "",
  //         state: "",
  //         zipCode: "",
  //         cardNumber: "",
  //         expirationDate: "",
  //         cvc: "",
  //       });
  //       setactiveOption(2);
  //       setcompleted([0, 1]);
  //       dispatch(
  //         updateProductData({
  //           cart: [],
  //         })
  //       );
  //     })
  //     .catch((e) => console.log(e));
  // };

  const newOrder = async (data: any) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4000/orders/new",
        data,
        {
          withCredentials: true, // This ensures credentials (like cookies) are included in cross-origin requests
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        createOrder({
          data: response.data.order,
        })
      );

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        streetAddress: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
        cardNumber: "",
        expirationDate: "",
        cvc: "",
      });
      setactiveOption(2);
      setcompleted([0, 1]);
      dispatch(
        updateProductData({
          cart: [],
        })
      );
      toast.success("order has been created");
      console.log(response.data);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const [orderPlaced, setorderPlaced] = useState(false);
  function generateId() {
    function generateRandomString(length: number) {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    const part1 = generateRandomString(5);
    const part2 = generateRandomString(5);

    return `${part1}-${part2}`;
  }

  // Example usage
  const [orderID, setorderID] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption === "") {
      toast.error("Please select payment method");
      return;
    }

    const { phoneNumber, streetAddress, country, city, state } = formData;
    if (!streetAddress || !city || !state || !country || !phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setorderPlaced(true);

    // const shippingPrice =
    //   shippingOptions.find((option) => option.id === selectedOption)?.price ||
    //   0;
    const orderid = generateId();
    setorderID(orderid);
    const data = {
      branch_id: "test_Branch",
      order: orderid,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toISOString().slice(11, 23),
      address: streetAddress,
      products: cart,
    };
    createOrderBackend(data);
    dispatch(
      createOrder({
        data: data,
      })
    );
    localStorage.setItem("order", JSON.stringify(data));
  };

  function convertSubcurrency(amount: number) {
    return Math.round(amount * 100);
  }

  const CalculateSubTotalPrice = () => {
    const cartTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return cartTotal.toFixed(2);
  };

  const [timeLeft, setTimeLeft] = useState(30); // Countdown timer (in seconds)
  const [isCancelled, setIsCancelled] = useState(false); // To track order cancellation
  const [timerStarted, setTimerStarted] = useState(false); // To check if timer has started
  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on unmount
    }
  }, [timeLeft, timerStarted]);

  const router = useRouter();
  const handleCancelOrder = () => {
    setIsCancelled(true);
    setTimerStarted(false);
    router.push("/account"); // Stop the timer
  };

  const handleStartTimer = () => {
    setTimerStarted(true);
  };

  function createOrderBackend(data: any) {
    const d = {
      data,
      company: "Dassoft",
      token: getCookie("uid#"),
    };
    try {
      axios
        .post("http://localhost:5000/userOrder/addOrder", d)
        .then((res) => {
          console.log("Response", res);
          setorderPlaced(false);
          setcompleted([0, 1]);
          console.log(data);
          setactiveOption(2);
          window.scrollTo(0, 0);
          handleStartTimer();
          toast.success("Order has been created");
        })
        .catch((e) => console.log(e.response.data));
    } catch (e: any) {
      setorderPlaced(false);
      window.scrollTo(0, 0);
      console.error("Error:", e.response.data);
      toast.error("Failed to create order");
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20 mb-40 max-2xl:px-5">
        <h1 className="my-40 mb-20 text-center text-5xl font-medium">Cart</h1>
        <div className="buttons max-lg:hidden flex justify-around my-10 ">
          {steps.map((step, i) => (
            <div
              key={i}
              className={
                activeOption === i
                  ? "flex gap-5 items-center border-b-2 border-yellow-400 p-5"
                  : completed.includes(i)
                  ? "flex gap-5 items-center p-5 text-green-400"
                  : "flex gap-5 items-center p-5"
              }
            >
              <span
                className={
                  activeOption === i
                    ? "w-16 h-16 text-xl flex justify-center items-center bg-yellow-400 text-white rounded-full"
                    : completed.includes(i)
                    ? "w-16 h-16 text-xl flex justify-center items-center bg-green-100 text-green-400 rounded-full"
                    : "w-16 h-16 text-xl flex justify-center items-center bg-gray-100 text-gray-400 rounded-full"
                }
              >
                {completed.includes(i) ? <BiCheck /> : step.status}
              </span>
              <span className={activeOption ? "" : "text-gray-500"}>
                {step.label}{" "}
              </span>
            </div>
          ))}
        </div>

        {activeOption === 0 ? (
          <div className="flex gap-10 flex-wrap">
            <div className="table flex-1">
              <div
                className="headder flex w-full p-2
             justify-between  py-5 border-black border-b "
              >
                <h1 className="font-semibold text-lg md:w-60">Product</h1>
                <h1 className="font-semibold text-lg w-auto md:mr-5 ">
                  Quantity
                </h1>
                <h1 className=" max-md:hidden font-semibold text-lg w-auto md:mr-5 ">
                  Price
                </h1>
                <h1 className=" max-md:hidden font-semibold text-lg w-auto md:mr-5">
                  Total
                </h1>
              </div>
              <div className="rows mt-5 p-2 flex flex-col gap-5">
                {cartItems.map((product, i) => (
                  <div key={i}>
                    <Cart item={product} />
                  </div>
                ))}
              </div>
            </div>
            <div className="card xl:m-10 mb-10  border-2 flex flex-col shadow-sm xl:min-w-[500px] gap-5 rounded-lg   p-5  md:p-10 h-fit border-yellow-400  hover:shadow-sm bg-gray-50  ">
              <h1 className="font-semibold text-lg md:text-2xl">
                Cart summary
              </h1>

              <div className="amount space-y-2">
                <div className="subtotal flex justify-between  border-b pb-5">
                  <p>Subtotal</p>
                  <p>RS {CalculateSubTotalPrice()}</p>
                </div>
                <div className="total font-medium text-lg flex justify-between ">
                  <p>Total</p>
                  <p>RS {CalculateTotalPrice()}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (activeOption === 0) {
                    if (cart.length === 0) {
                      toast.error("Cart is empty!");
                      return;
                    }
                    setactiveOption(1);
                    setcompleted((prev) => {
                      return [...prev, 0];
                    });
                  }
                }}
                className="hover:bg-red-500 bg-yellow-400 text-black font-medium hover:text-white  p-3   opacity-100  transition-all duration-300 w-full  rounded-md px-5"
              >
                Review Payment and Address
              </button>
            </div>
          </div>
        ) : activeOption === 1 ? (
          <div className="flex gap-5 md:gap-10 max-md:flex-col-reverse mb-20">
            <div className="OrderDetails flex-1 w-full space-y-10">
              <div className="customerDetails flex flex-col gap-5 border-2 border-black max-md:text-sm rounded-md p-5  md:p-10">
                <h1 className="text-2xl font-medium">Your Address</h1>
                <div className="field flex flex-col gap-2  w-full">
                  <label
                    htmlFor="streetAddress"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Street Address"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="field flex flex-col gap-2  w-full">
                  <label
                    htmlFor="phoneNumber"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="field flex flex-col gap-2 w-full">
                  <label
                    htmlFor="country"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="field flex flex-col gap-2  w-full">
                  <label
                    htmlFor="city"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Town / City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Town / City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="flex gap-5 w-full">
                  <div className="field flex flex-col gap-2  w-full">
                    <label
                      htmlFor="state"
                      className="font-semibold uppercase text-sm text-gray-500"
                    >
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                    />
                  </div>
                  {/* <div className="field flex flex-col gap-2  w-full">
                    <label
                      htmlFor="zipCode"
                      className="font-semibold uppercase text-sm text-gray-500"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                    />
                  </div> */}
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="hover:bg-red-500 bg-yellow-400  text-white p-3 opacity-100 transition-all duration-300 w-full rounded-md hover:bg-black/90 px-5"
              >
                {orderPlaced ? "Loading..." : "Place Order"}
              </button>
            </div>
            <div className="card   border-2 flex flex-col gap-5 shadow-sm lg:min-w-[500px] max-md:w-full  rounded-lg  border-black p-10 h-fit">
              <h1 className="font-semibold text-xl md:text-2xl">
                Order summary
              </h1>
              <div className="options space-y-5 mb-5">
                {cartItems.map((cartItem, i) => (
                  <div className="flex gap-2 pb-5 border-b" key={i}>
                    <img src={cartItem.image} alt="item" className="w-20" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between font-bold w-full">
                        <h2 className=" ">{cartItem.name}</h2>
                        <p>
                          RS {(cartItem.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between  w-full">
                        {/* <p title={cartItem.description}>
                          {cartItem.description.slice(0, 20) + "..."}
                        </p> */}
                        <p></p>
                      </div>
                      <div className="qty_controller mt-1  flex items-center justify-start rounded-full  ">
                        <button
                          className="subtract-button  h-6 pb-1 w-6 flex justify-center items-center  text-white active:mt-[2px]  bg-red-500 hover:bg-yellow-300  rounded-full"
                          onClick={() => {
                            dispatch(
                              updateQuantity({
                                id: cartItem.name,
                                type: "decrease",
                              })
                            );
                          }} // Decrease quantity onClick
                        >
                          -
                        </button>
                        <p className="mx-1 rounded-lg  border-gray-600 border-[1px] px-3  ">
                          {cartItem.quantity}
                        </p>
                        <button
                          className="subtract-button  h-6 pb-1 w-6 flex justify-center items-center  text-white active:mt-[2px]  bg-red-500 hover:bg-yellow-300  rounded-full"
                          onClick={() => {
                            dispatch(
                              updateQuantity({
                                id: cartItem.name,
                                type: "increase",
                              })
                            );
                          }} // Increase quantity onClick
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="options space-y-5">
                <h1 className="font-medium text-xl">Payment method</h1>
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`option flex justify-between px-2 md:px-5 md:py-3 p-2 md:text-lg gap-2 border rounded-md RS ${
                      selectedOption === option.id ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <div className="flex gap-3 items-center text-sm ">
                      <input
                        type="radio"
                        name="option"
                        id={option.id}
                        className="accent-yellow-400 mt-0.5  rounded-full"
                        checked={selectedOption === option.id}
                        onChange={() => handleRadioChange(option.id)}
                      />
                      <h2>{option.label}</h2>
                    </div>
                    {/* <p>RS {option.price.toFixed(2)}</p> */}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className=" border w-full  rounded-md p-2"
                  placeholder="Enter Promo Code"
                />
                <button className="hover:bg-red-500 bg-yellow-400 text-white  p-2.5   opacity-100  transition-all duration-300 w-fit  rounded-md  px-5">
                  Apply
                </button>
              </div>
              <div className="amount space-y-3">
                {/* <div className="subtotal flex justify-between  border-b pb-3">
                  {/* <p>Shipping</p>
                  <p className="font-semibold">
                    {selectedOption === "freeShipping" ? "Free" : "Deluxe"}
                  </p> 
                </div> */}
                <div className="subtotal flex justify-between  border-b pb-3">
                  <p>Subtotal</p>
                  <p className="font-semibold">RS {CalculateSubTotalPrice()}</p>
                </div>
                <div className="total font-medium text-lg flex justify-between ">
                  <p>Total</p>
                  <p>RS {CalculateTotalPrice()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-20 max-lg:pt-5 shadow-sm flex-col gap-2 flex justify-center items-center m-20 max-w-5xl mx-auto">
            <h1 className="font-semibold text-2xl mb-5 ">
              Order as been Created Succesfully with Tracking ID
              <span className="text-red-400 lowercase pl-2 hover:underline">
                #{orderID}
              </span>
            </h1>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between bg-gray-100 font-medium   rounded-lg p-6 ">
                <div>
                  <h1 className="text-lg "> Order Id :</h1>{" "}
                  <p className="text-gray-500 pl-5">{orderID}</p>
                </div>
                <div className="p-3  rounded-full bg-green-400 text-white">
                  <Check />
                </div>
              </div>
              <div className="flex justify-between gap-10 items-center bg-gray-100 font-medium   rounded-lg p-6 ">
                <div>
                  <h1 className="text-lg ">Payment Method:</h1>{" "}
                  <p className="text-gray-500 pl-5">Cash on Delivery</p>
                </div>
                <div className="p-3  rounded-full bg-green-400 text-white">
                  <Check />
                </div>
              </div>
              <div className="flex justify-between gap-10 items-center bg-gray-100 font-medium rounded-lg p-6 ">
                <div>
                  <h1 className="text-lg ">Delivery Address:</h1>{" "}
                  <p className="text-gray-500 pl-5">{formData.streetAddress}</p>
                </div>
                <div className="p-3  rounded-full bg-green-400 text-white">
                  <Check />
                </div>
              </div>
            </div>

            {timerStarted && !isCancelled && (
              <div className="bg-yellow-400 font-medium mt-2 flex gap-1 rounded-lg p-3 px-5 ">
                <button
                  onClick={handleCancelOrder}
                  className="cancel-order-btn"
                >
                  Cancel Order
                </button>
                <p>{timeLeft}s</p>
              </div>
            )}

            {isCancelled && <p>Your order has been canceled.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
