import React from "react";

export const Banner = () => {
  return (
    <div className="w-full h-[30vh] bg-[url('/banner.png')] bg-cover flex flex-col items-center justify-center p-10">
      <h1 className="text-[black] text-xl mb-4 font-semibold">Lorem ipsum is simply.</h1>
      <p className=" text-[gray] text-[16px]">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
  );
};

export default Banner;
