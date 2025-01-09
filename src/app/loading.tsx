import { LoaderPinwheelIcon } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      <div className="animate-spin text-yellow-400">
        <LoaderPinwheelIcon size={30} />
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default loading;
