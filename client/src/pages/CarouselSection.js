import React from "react";
import { Carousel } from "antd";

const CarouselSection = () => {
  const contentStyle = {
    height: "500px",
    color: "#fff",
    width: "100%",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364d79",
    objectfit: "cover",
    overflow: "hidden",
    aspectRatio: "1/1",
  };

  return (
    <Carousel autoplay autoplaySpeed={2000}>
      <div>
        <img
          style={contentStyle}
          src="https://haebix.com/wp-content/uploads/2023/08/13-scaled.jpg"
          alt="slider-image"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://admin.mykinderbridge.com/uploads/sadasdasdasdasd_6fe78b6a90.jpg"
          alt="slider-image"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://media.istockphoto.com/id/186071319/photo/outdoor-recreation.jpg?s=612x612&w=0&k=20&c=d0JLXAuTU7_9AoeZhwl15SHZRqJscZ7sIRWRrv4a1pU="
          alt="slider-image"
        />
      </div>
    </Carousel>
  );
};

export default CarouselSection;
