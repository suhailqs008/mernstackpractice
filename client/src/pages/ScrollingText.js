import React from "react";

const ScrollingText = ({ text }) => {
  return (
    <div
      className="text-indigo-950 font-bold text-4xl"
      style={{
        textAlign: "center",
        padding: "10px",
        display: "flex",
        overflow: "hidden",
        position: "relative",

        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          animation: "scroll 10s linear infinite",
        }}
      >
        <img
          style={{ height: "40px", width: "40px", marginRight: "10px" }}
          src="https://png.pngtree.com/png-vector/20230315/ourmid/pngtree-admission-open-tag-vector-image-transparent-png-image_6649947.png"
          alt="admission"
        />
        {text}
        <img
          style={{
            height: "40px",
            width: "40px",
            marginLeft: "10px",
          }}
          src="https://png.pngtree.com/png-vector/20230315/ourmid/pngtree-admission-open-tag-vector-image-transparent-png-image_6649947.png"
          alt="admission"
        />
      </div>
    </div>
  );
};

export default ScrollingText;
