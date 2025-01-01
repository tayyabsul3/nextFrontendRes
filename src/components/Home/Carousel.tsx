"use client";
import React, { useEffect, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

const Carousel = ({ children }: { children: any }) => {
  //3
  const [curr, setCurr] = useState(0);
  const prev = () => {
    setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurr((curr) => (curr + 1) % 3);
    }, 10000);

    return () => clearInterval(intervalId);
    // Cleanup function to clear interval on component unmount
  }, []);

  return (
    <div className="overflow-hidden  ">
      <div
        className="flex  transition-transform duration-1000 ease-out  rounded-lg"
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {children}
      </div>

      <button
        className="hidden lg:flex absolute top-[40%] left-[5%] text-3xl w-10 md:w-10  justify-center items-center bg-red-400 h-20 rounded-full p-2 cursor-pointer hover:bg-red-600  "
        onClick={prev}
      >
        <p className="text-gray-500 text-xl">
          <FaLessThan />
        </p>
      </button>
      <button
        className="hidden lg:flex absolute top-[40%] right-[5%] text-3xl  w-10  justify-center items-center bg-red-400 h-20 rounded-full p-2 cursor-pointer hover:bg-red-600  "
        onClick={next}
      >
        <p className="text-gray-500 text-xl">
          <FaGreaterThan />
        </p>
      </button>
    </div>
  );
};

export default Carousel;
