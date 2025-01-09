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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";

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
  const [latitude, setLatitude] = useState<number | null>(null);
  const [error, seterror] = useState<string | null>(null);

  const [longitude, setLongitude] = useState<number | null>(null);
  const [City, setCity] = useState<any>(null);
  const [Address, setAdress] = useState<any>(null);

  // Using `latitude` and `longitude` to construct the query
  const Api_Key = "ff7490f29a564b46a2bedb035e511198";
  const Api_Endpoint = "https://api.opencagedata.com/geocode/v1/json";

  const getLocation = async (latitude: number, longitude: number) => {
    const QUERY = `${latitude} + ${longitude}`;
    const REQ_URL = `${Api_Endpoint}?key=${Api_Key}&q=${QUERY}`;

    const Response = await fetch(REQ_URL);
    let Location = await Response.json();

    console.log(Location);

    // Checking if the API response has results
    if (Location.results.length > 0) {
      const { suburb, state_district, state, country } =
        Location.results[0].components;
      console.log(suburb, state_district, state, country);
      setCity(state_district);
      setAdress(`${suburb}, ${state_district}, ${state}, ${country}`);
      setLocation({
        city: state_district,
        address: `${suburb}, ${state_district}, ${state}, ${country}`,
      });
    } else {
      console.error("Location not found");
    }
  };

  // Updated `findcurrentLocation` function to correctly handle the state update
  function findcurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Set latitude and longitude state
          setLatitude(latitude);
          setLongitude(longitude);

          // Get location details after state updates
          getLocation(latitude, longitude);

          seterror(
            "Note! Press the button again in case of incorrect location"
          );

          // Clear the error message after 5 seconds
          setTimeout(() => {
            seterror("");
          }, 5000);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // Using `useEffect` to trigger location fetching when latitude or longitude is set
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getLocation(latitude, longitude);
    }
  }, [latitude, longitude]); // Triggered when latitude or longitude is updated

  useEffect(() => {
    // Call findcurrentLocation when the component mounts
    findcurrentLocation();
  }, []); // Only run once on component mount
  const [Location, setLocation] = useState({
    city: "",
    address: "",
  });

  function HandleInputChange(e: any) {
    const { name, value } = e.target;
    setLocation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div>
      {shouldHideHeader ? (
        ""
      ) : (
        <header className="absolute top-0 shadow-sm w-full bg-yellow-400 ">
          <div className="flex p-3 justify-between items-center px-10 mx-auto">
            <div className=" lg:flex-[0.2] max-md:hidden">
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
                      <p className="address text-sm">
                        {Address ? Address.slice(0, 20) + "..." : "Address"}
                      </p>
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
                          findcurrentLocation();
                        }}
                      >
                        Use my Current Location
                      </button>
                      <div className="messageoferror text-red-600 font-bold transition duration-900">
                        {error}
                      </div>
                      <form
                        // onSubmit={onSubmit}
                        className="flex flex-col gap-2 w-full mt-3"
                      >
                        <input
                          type="text"
                          name="city"
                          placeholder="City name here..."
                          value={Location.city}
                          onChange={HandleInputChange}
                          className="p-3 rounded-2xl bg-gray-50 outline-gray-200"
                        />
                        <input
                          type="text"
                          name="address"
                          placeholder="Adress here..."
                          value={Location.address}
                          onChange={HandleInputChange}
                          className="p-3 rounded-2xl bg-gray-50 outline-gray-200"
                          required
                        />
                        <DialogClose>
                          <p className="p-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold cursor-pointer">
                            Select
                          </p>
                        </DialogClose>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Link
              href={"/"}
              className="font-bold  text-2xl flex-1 flex md:justify-center"
            >
              <div className="w-16">
                <img
                  src="https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/logo.webp"
                  alt="Cheezious"
                />
              </div>
            </Link>
            <div className="flex  flex-[0.2] justify-end  gap-5 max-md:hidden items-center">
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
