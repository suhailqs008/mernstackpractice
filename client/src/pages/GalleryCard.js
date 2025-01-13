import React from "react";

const GalleryCard = ({ title, image }) => {
  const imagePath = `${image}`;
  return (
    <div className="relative overflow-hidden md:w-80 md:h-80 w-4/5 cursor-pointer text-2xl font-bold">
      <div className="z-0 absolute w-full h-full peer" />
      <div className="absolute flex lg:text-xl md:text-lg text-base text-white text-center items-center justify-center  sm:hover:opacity-5 md:hover opacity-10 bg-neutral-950  transition-all duration-500">
        {title}
      </div>
      <div className="w-full h-full  items-center justify-center flex uppercase">
        <img className="gallery-img rounded-md w-full" src={imagePath} alt="" />
      </div>
    </div>
  );
};

export default GalleryCard;
