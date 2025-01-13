import React from "react";

const Teachers = () => {
  const images = [
    "https://www.teacheracademy.eu/wp-content/uploads/2021/10/successful-teacher-1-608x405.jpg",
    "https://degrees.snu.edu/hs-fs/hubfs/AdobeStock_518657595.jpeg",
    "https://vawsum.com/wp-content/uploads/2019/07/pexels-max-fischer-5212345-1024x683.jpg",
    "https://rockwoodsinternationalschool.com/auth/uploads/pages/OUBaiDW63S7jkvkzOPyDqKpMb0HtUWED.png",
  ];

  return (
    <div
      className="bg-slate-100 mt-4"
      id="teacher-section"
      style={{ marginBottom: "20px" }}
    >
      <h2 className="md:text-2xl text-2xl font-semibold text-center text-indigo-950">
        Our Teachers
      </h2>
      <div className="teacher-div">
        {images.map((src, index) => (
          <img src={src} alt={index} />
        ))}
      </div>
    </div>
  );
};

export default Teachers;
