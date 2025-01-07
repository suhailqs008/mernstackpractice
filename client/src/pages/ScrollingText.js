import React from "react";

const ScrollingText = ({ text }) => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <marquee
        behavior="scroll"
        direction="left"
        style={{ color: "#0073e6", fontSize: "30px" }}
      >
        <img
          style={{ height: "40px", width: "40px" }}
          src="https://png.pngtree.com/png-vector/20230315/ourmid/pngtree-admission-open-tag-vector-image-transparent-png-image_6649947.png"
          alt="admission"
        />
        {text}
        <img
          style={{ height: "40px", width: "40px" }}
          src="https://png.pngtree.com/png-vector/20230315/ourmid/pngtree-admission-open-tag-vector-image-transparent-png-image_6649947.png"
          alt="admission"
        />
      </marquee>
    </div>
  );
};

export default ScrollingText;
