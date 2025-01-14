import React from "react";
import { Carousel } from "antd";
import carausal1 from "../assets/carausal-1.jpg";
import carausal2 from "../assets/carausal-2.jpg";
import carausal3 from "../assets/carausal-3.jpg";
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
    <Carousel autoplay arrows={true} autoplaySpeed={2000}>
      <div>
        <img style={contentStyle} src={carausal1} alt="slider-image" />
      </div>
      <div>
        <img style={contentStyle} src={carausal2} alt="slider-image" />
      </div>
      <div>
        <img style={contentStyle} src={carausal3} alt="slider-image" />
      </div>
    </Carousel>
  );
};

export default CarouselSection;
