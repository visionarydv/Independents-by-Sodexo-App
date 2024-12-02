import React from "react";
import Image from "../assets/image1.png";

const Leftside = () => {
  return (
    <div className="hidden md:flex w-full md:w-1/2 bg-cover bg-center">
      <img
        src={Image}
        alt="Login Image"
        className="w-full h-auto object-cover md:h-full"
      />
    </div>
  );
};

export default Leftside;
