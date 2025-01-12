import React from "react";
import "../styles/goal.css";
// import bgImage from "../assets/bg.jpg";
// import mobilebgImage from "../assets/mobilebg.jpg";
import images from "../assets/bg.jpg";
const Home = () => {
  return (
    <div className="header" id="home">
      <img className="pt-10 bg lg:flex hidden" src={images} alt="" />
      <img className="pt-10 mobilebg lg:hidden flex" src={images} alt="" />
      <div className="title md:py-28 md:px-10 py-14 px-5 md:mx-28 mx-10 my-56 bg-indigo-500 text-white flex flex-col justify-center">
        <h1 className="py-2 md:text-7xl text-4xl font-bold uppercase">
          <span>Back To School</span>
        </h1>
        <p className="py-5 md:text-3xl text-lg">
          Welcome to all of our students
        </p>
        <button className="bg-indigo-950 border-2 border-indigo-950 hover:border-white hover:bg-indigo-500 my-2 font-thin md:text-lg text-sm text-white px-5 py-2 w-full md:w-1/2 transition-all duration-200 ease-in-out">
          Discover The School
        </button>
      </div>
    </div>
  );
};

export default Home;
