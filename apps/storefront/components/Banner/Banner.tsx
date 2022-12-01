import React from "react";

export const Banner = () => {
  return (
    <div className="w-full h-[30vh] bg-[url('/sample2.jpg')] bg-cover flex flex-col items-center justify-center p-10">
      <h1 className="text-[white] text-xl ">Title</h1>
      <p className=" text-[white] text-base">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum
      </p>
    </div>
  );
};

export default Banner;
