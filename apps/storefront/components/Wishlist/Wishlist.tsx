import React from "react";
import WishListPoster from "./WishListPoster";

const Wishlist = () => {
  return (
    <div className="container p-5 shadow-lg mt-10 divide-y">
      <div className="wish-list-header flex items-center h-[50px]">
        <h1 className="text-lg ml-5">My wishlist</h1>
      </div>
      <div className="wish-list-body divide-y">
        <WishListPoster />
      </div>
    </div>
  );
};

export default Wishlist;
