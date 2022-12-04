import React, { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Banner = () => {
  const arrowStyles: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
  };
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showArrows={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 15 }}
          >
            <svg
              className="image-gallery-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="6 0 12 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: 15 }}
          >
            <svg
              className="image-gallery-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="6 0 12 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )
      }
    >
      <div className="w-full h-[30vh] bg-[url('/banner.png')] bg-cover flex flex-col items-center justify-center p-10">
        <h1 className="text-[black] text-xl mb-4 font-semibold">Lorem ipsum is simply.</h1>
        <p className=" text-[gray] text-[16px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
      <div className="w-full h-[30vh] bg-[url('/sample.jpg')] bg-cover flex flex-col items-center justify-center p-10">
        <h1 className="text-[black] text-xl mb-4 font-semibold">Lorem ipsum is simply.</h1>
        <p className=" text-[gray] text-[16px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
      <div className="w-full h-[30vh] bg-[url('/banner.png')] bg-cover flex flex-col items-center justify-center p-10">
        <h1 className="text-[black] text-xl mb-4 font-semibold">Lorem ipsum is simply.</h1>
        <p className=" text-[gray] text-[16px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
    </Carousel>
  );
};

export default Banner;
