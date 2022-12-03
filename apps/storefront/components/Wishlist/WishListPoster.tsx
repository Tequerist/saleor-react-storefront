import React from "react";
import { MdDelete, MdStar } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

const WishListPoster = () => {
  return (
    <div className="wishlist-posters flex items-center justify-between pt-5">
      <div className="flex flex-col md:flex-row text-md gap-10">
        <img className=" md:w-[150px] w-full  " src="/sampleProduct1.jpg" alt="" />
        <div>
          <div>
            <p>
              Exclusive Affordable Collection of Trendy & Stylish Sport Sneakers Shoes Running Shoes
            </p>
          </div>
          <div className="flex justify-center w-[40px] bg-[green] rounded text-[white] mt-3">
            <p>4.1</p>
            <MdStar />
          </div>
          <div className="mt-3 flex">
            <FaRupeeSign />
            <p className="font-bold">299</p>
          </div>
        </div>
      </div>
      <div className="">
        <button className="text-[grey] text-lg">
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default WishListPoster;
