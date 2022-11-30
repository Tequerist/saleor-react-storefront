import React from "react";

const Wishlist = () => {
  return (
    <div className="container p-5 ">
      <div className=" flex items-center h-[100px] border mb-5">
        <h1 className="text-xl ml-5">My wishlist</h1>
      </div>
      <div className="h-[200px] border flex items-center justify-between p-10">
        <div className="text-md">Image</div>
        <div className="text-md">Details</div>
        <button className="text-md">Delete</button>
      </div>
    </div>
  );
};

export default Wishlist;
