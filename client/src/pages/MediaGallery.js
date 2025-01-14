import React from "react";
import media1 from "../assets/media1.jpg";
import media2 from "../assets/media2.jpg";
import media3 from "../assets/media3.jpg";
import media4 from "../assets/media4.jpg";
import media5 from "../assets/media5.jpg";
import media6 from "../assets/media6.jpg";
import media7 from "../assets/media7.jpg";
import media8 from "../assets/media8.jpg";

const MediaGallery = () => {
  const data = [
    {
      image: media1,
    },
    {
      image: media2,
    },
    {
      image: media3,
    },
    {
      image: media4,
    },
    {
      image: media5,
    },
    {
      image: media6,
    },
    {
      image: media7,
    },
    {
      image: media8,
    },
  ];

  return (
    <div className="z-0 text-indigo-950" id="gallery-section">
      <div className="heading text-center flex flex-col">
        <h1 className="md:text-2xl text-2xl font-semibold p-2 m-3">
          Media Gallery
        </h1>
      </div>
      <div className="gallery-div">
        {data?.map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={`Gallery Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
