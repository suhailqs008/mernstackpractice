import React from "react";
import { Carousel } from "antd";

const CarouselSection = () => {
  const contentStyle = {
    height: "450px",
    color: "#fff",
    width: "100%",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364d79",
    objectfit: "cover",
    overflow: "hidden",
  };

  return (
    <Carousel autoplay autoplaySpeed={2000}>
      <div>
        <img
          style={contentStyle}
          src="https://drskids.com/wp-content/uploads/2021/02/our-features.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://haebix.com/wp-content/uploads/2023/08/13-scaled.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://admin.mykinderbridge.com/uploads/sadasdasdasdasd_6fe78b6a90.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://img.freepik.com/free-photo/book-day-with-group-younf-childre_23-2148445696.jpg?t=st=1736002663~exp=1736006263~hmac=907d3a469272e5c072abe6e9b62ee3e2b440c36891bd2b7a58d978d81e6ff9cc&w=1060"
          alt=""
        />
      </div>
    </Carousel>
  );
};

export default CarouselSection;
