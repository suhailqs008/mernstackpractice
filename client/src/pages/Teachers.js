import React from "react";
import teacher1 from "../assets/teacher1.jpg";
import teacher2 from "../assets/teacher2.jpg";
import teacher3 from "../assets/teacher3.jpg";
import teacher4 from "../assets/teacher4.jpg";
const Teachers = () => {
  const images = [teacher1, teacher2, teacher3, teacher4];

  return (
    <div
      className="bg-slate-100 mt-4"
      id="teacher-section"
      style={{ marginBottom: "20px" }}
    >
      <h2 className="md:text-2xl text-2xl font-semibold text-center text-indigo-950">
        Our Teachers
      </h2>
      <div className="teacher-div ">
        {images.map((src, index) => (
          <img
            data-aos="flip-left"
            data-aos-duration="3000"
            className="hover:cursor-pointer hover:opacity-75"
            src={src}
            alt={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Teachers;
