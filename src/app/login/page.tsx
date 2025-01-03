import React from "react";
import LoginForm from "./LoginForm";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex  h-[100vh]">
      <Link
        href={"/"}
        className="absolute group top-0 p-5 m-5 hover:shadow-md bg-white rounded-full"
      >
        <button className="group-hover:scale-110 transition-all duration-300">
          <HomeIcon />
        </button>
      </Link>
      <div className="max-md:hidden h-full flex-1 w-fit  ">
        <img
          src="https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/pizza.webp"
          alt="AuthPng"
          className=" h-full   object-cover"
        />
      </div>
      <div className="lg:p-20  w-full flex-1 flex  items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
