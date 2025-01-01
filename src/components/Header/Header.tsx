"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import Cart from "./Cart";
import { IoIosMenu } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";
import { getUserData } from "../Reusables/Functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Authenticate } from "@/redux/slices/user";
import MobileHeader from "./MobileHeader";
import { updateState } from "@/redux/slices/states";
import { RiAccountCircleFill } from "react-icons/ri";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const Header = () => {
  const pathname = usePathname();
  const shouldHideHeader =
    pathname.includes("login") ||
    pathname.includes("register") ||
    pathname.includes("forgot") ||
    pathname.includes("reset");

  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const router = useRouter(); // Added useRouter hook for redirection

  // Logout function
  async function logoutUser() {
    try {
      const { data } = await axios.get("http://localhost:4000/users/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Logged out successfully");
      dispatch(Authenticate({ auth: false, user: {} }));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  useEffect(() => {
    getUserData(dispatch);
  }, [dispatch]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {shouldHideHeader ? (
        ""
      ) : (
        <header className="absolute top-0 shadow-sm w-full bg-yellow-400 ">
          <div className="flex p-3 justify-between items-center px-10 mx-auto">
            <Dialog>
              <DialogTrigger>
                <div
                  className="location flex items-center  gap-1 cursor-pointer"
                  // onClick={() => {
                  //   setisOpen((prev) => (prev = !prev));
                  // }}
                >
                  <p className="text-red-600 text-3xl ">
                    <FaLocationDot />
                  </p>
                  <div className="deliverto flex flex-col ">
                    <p>Deliver to</p>
                    <p className="address text-sm">Address</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="min-w-fit py-10">
                <div className="w-[100%] z-10      flex justify-center items-center ">
                  <div className="content w-[400px] md:w-[500px] rounded-3xl flex flex-col justify-center items-center  p-5 gap-2">
                    <div className="logo flex justify-center">
                      <img
                        src="https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/logo.webp"
                        alt="logo"
                        className="rounded-3xl w-40"
                      />
                    </div>
                    <h4 className="font-bold text-center text-lg">
                      Choose your location{" "}
                    </h4>
                    <button
                      className="bg-gray-300  w-60 p-[6px] rounded-2xl font-bold hover:bg-red-500"
                      onClick={() => {
                        // findcurrentLocation();
                      }}
                    >
                      Use my Current Location
                    </button>
                    <div className="messageoferror text-red-600 font-bold transition duration-900"></div>
                    <form
                      // onSubmit={onSubmit}
                      className="flex flex-col gap-2 w-full mt-3"
                    >
                      <input
                        type="text"
                        placeholder="City name here..."
                        // value={City ? `${City}` : ""}
                        className="p-3 rounded-2xl"
                      />
                      <input
                        type="text"
                        placeholder="Adress here..."
                        // value={Address ? `${Address}` : ""}
                        className="p-3 rounded-2xl"
                        required
                      />
                      <input
                        type="submit"
                        onClick={() => {
                          // handleModalopen();
                        }}
                        value="Select"
                        required
                        className="p-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold cursor-pointer"
                      />
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Link href={"/"} className="font-bold text-2xl">
              <div className="w-16">
                <img
                  src="https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/logo.webp"
                  alt="Cheezious"
                />
              </div>
            </Link>
            <div className="flex gap-5 max-md:hidden items-center">
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="account border-l-[1px] pl-5 border-red-600 p-2 cursor-pointer transition duration-500">
                      {false ? (
                        <img
                          src={"dsda"}
                          alt=""
                          className="text-red-600 relative w-[30px] bg-red-600 rounded-full"
                          // onClick={toggleDropdown}
                        />
                      ) : (
                        <p className="text-red-600 relative text-2xl">
                          <RiAccountCircleFill

                          // onClick={toggleDropdown}
                          />
                        </p>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-1 w-fit">
                    <PopoverClose className="border-b border-transparent hover:border-black transition-all duration-100 px-5 p-1">
                      <Link href={"/account"}>My Account</Link>
                    </PopoverClose>
                    <PopoverClose className="border-b border-transparent hover:border-black transition-all duration-100 px-5 p-1">
                      {isAuthenticated ? (
                        <button onClick={logoutUser}>Logout</button>
                      ) : (
                        <Link href={"/login"}>Login</Link>
                      )}
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </div>

              <Cart />
            </div>
            <div className="mobileheader md:hidden">
              <MobileHeader />
              <button
                onClick={() => {
                  dispatch(
                    updateState({
                      mobileheader: true,
                    })
                  );
                }}
              >
                <IoIosMenu size={25} />
              </button>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
