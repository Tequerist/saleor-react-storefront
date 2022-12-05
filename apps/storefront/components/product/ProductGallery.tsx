import { PlayIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Image from "next/legacy/image";
import { useState } from "react";

import { ImageExpand } from "@/components/product/ImageExpand";
import { VideoExpand } from "@/components/product/VideoExpand";
import { getGalleryMedia, getVideoThumbnail } from "@/lib/media";
import {
  ProductDetailsFragment,
  ProductMediaFragment,
  ProductVariantDetailsFragment,
} from "@/saleor/api";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { MdFavoriteBorder } from "react-icons/md";
import { IconButton } from "@saleor/ui-kit";

export interface ProductGalleryProps {
  product: ProductDetailsFragment;
  selectedVariant?: ProductVariantDetailsFragment;
}

export const RenderItem = (props: { item: ReactImageGalleryItem }) => {
  const [state, setState] = useState("0% 0%");
  const [bgShow, setBgShow] = useState(false);
  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setState(`${x}% ${y}%`);
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setBgShow(false)}
      onMouseEnter={() => setBgShow(true)}
      className="gallery-slide "
      style={{
        backgroundImage: `url(${bgShow ? props.item.original : ""})`,
        backgroundPosition: state,
      }}
    >
      <img className="image-gallery-image" src={props.item.original} />
    </div>
  );
};

export function ProductGallery({ product, selectedVariant }: ProductGalleryProps) {
  // const [expandedImage, setExpandedImage] = useState<ProductMediaFragment | undefined>(undefined);
  // const [videoToPlay, setVideoToPlay] = useState<ProductMediaFragment | undefined>(undefined);

  // const galleryMedia = getGalleryMedia({ product, selectedVariant });
  // const galleryInputs = galleryMedia?.map((media: ProductMediaFragment) => ({
  //   original: media.url,
  //   thumbnail: media.type === "IMAGE" ? media.url : "",
  //   // renderItem: () => {
  //   //   return (
  //   //     <div
  //   //       onMouseMove={handleMouseMove}
  //   //       className="gallery-slide "
  //   //       style={{ backgroundImage: `url(${bgShow ? media.url : ""})`, backgroundPosition: state }}
  //   //     >
  //   //       <img className="image-gallery-image" src={media.url} />
  //   //     </div>
  //   //   );
  //   // },
  // }));

  const galleryMedia = getGalleryMedia({ product, selectedVariant });
  const galleryInputs = galleryMedia?.map((media: ProductMediaFragment) => ({
    original: media.url,
    thumbnail: media.type === "IMAGE" ? media.url : "",
    // renderItem: () => {
    //   return (
    //     <div
    //       onMouseMove={handleMouseMove}
    //       className="gallery-slide "
    //       style={{ backgroundImage: `url(${media.url})` }}
    //     >
    //       <img className="image-gallery-image" src={media.url} />
    //     </div>
    //   );
    // },
  }));

  return (
    <>
      <div
        className={clsx(
          "mt-1 mb-2 w-full max-h-screen grid grid-cols-1 gap-2 md:h-full sm:h-[50vh] h-[50vh] overflow-scroll scrollbar-hide",
          galleryMedia.length > 1 && "md:grid-cols-2 md:col-span-2"
        )}
        style={{
          scrollSnapType: "both mandatory",
        }}
      >
        <div className="md:w-[600px] sm:w-auto">
          {/* <div className="fav-icon">
            <MdFavoriteBorder size={"40px"} color="grey" />
          </div> */}
          <ReactImageGallery
            renderItem={(item) => <RenderItem item={item} />}
            items={galleryInputs}
            showPlayButton={false}
          />
        </div>
        {/* {galleryMedia?.map((media: ProductMediaFragment) => {
          const videoThumbnailUrl = getVideoThumbnail(media.url); 
          return (
            <div
              key={media.url}
              className="aspect-w-1 aspect-h-1"
              style={{
                scrollSnapAlign: "start",
              }}
            >
              {media.type === "IMAGE" && (
                <Image
                  onClick={() => setExpandedImage(media)}
                  src={media.url}
                  alt={media.alt}
                  layout="fill"
                  objectFit="cover"
                  role="button"
                  tabIndex={-2}
                  priority
                />
              )}
              {media.type === "VIDEO" && (
                <div
                  role="button"
                  tabIndex={-2}
                  onClick={() => {
                    setVideoToPlay(media);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setVideoToPlay(media);
                    }
                  }}
                >
                  {videoThumbnailUrl && (
                    <Image
                      src={videoThumbnailUrl}
                      alt={media.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                  <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 absolute w-full h-full flex justify-center items-center bg-transparent">
                    <PlayIcon className="h-12 w-12" />
                  </div>
                </div>
              )}
            </div>
          );
        })} */}
      </div>
      {/* {expandedImage && (
        <div className="absolute min-h-screen min-w-screen h-full w-full top-0 bottom-0 left-0 right-0 z-40">
          <ImageExpand image={expandedImage} onRemoveExpand={() => setExpandedImage(undefined)} />
        </div>
      )}

      {videoToPlay && (
        <div className="absolute min-h-screen min-w-screen top-0 bottom-0 left-0 right-0 z-40">
          <VideoExpand video={videoToPlay} onRemoveExpand={() => setVideoToPlay(undefined)} />
        </div>
      )} */}
    </>
  );
}
