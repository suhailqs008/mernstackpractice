import React from "react";
import "../styles/goal-card.css";
const GoalCard = ({ alternateCard, title, text, image, button }) => {
  const imagePath = `${image}`;
  return (
    <div
      className={` text-white flex ${alternateCard} max-w-7xl overflow-hidden goal-card-container`}
    >
      <div className="details-card">
        <h2 className="text-3xl text-center font-semibold  text-stone-50">
          {title}
        </h2>
        <p className="text-white font-normal text-center ">{text}</p>
        <div className="button-div">
          <button className="bg-indigo-500 border-2 border-indigo-500 hover:border-white hover:bg-indigo-950 my-2 font-thin md:text-lg text-sm text-white px-5 py-2 w-2/3 transition-all duration-200 ease-in-out">
            {button}
          </button>
        </div>
      </div>

      <div className="image-div">
        <img src={imagePath} alt="Students studying" />
      </div>
    </div>
  );
};

export default GoalCard;
