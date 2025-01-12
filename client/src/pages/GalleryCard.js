import React from "react";

const GalleryCard = ({ title, image }) => {
  const imagePath = `${image}`;
  return (
    <div className="relative overflow-hidden md:w-80 md:h-80 w-4/5 cursor-pointer text-2xl font-bold">
      <div className="z-10 absolute w-full h-full peer" />
      <div className="absolute flex lg:text-xl md:text-lg text-base text-white text-center items-center justify-center peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[180%] peer-hover:h-[180%] md:peer-hover:w-[150%]  md:peer-hover:h-[150%] -top-32 -left-16 w-32 h-44 rounded-full bg-neutral-950 opacity-50 transition-all duration-500">
        {title}
      </div>
      <div className="w-full h-full  items-center justify-center flex uppercase">
        <img className="rounded-md w-full" src={imagePath} alt="" />
      </div>
    </div>
  );
};

export default GalleryCard;
