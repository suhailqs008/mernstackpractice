import React from "react";
import "../styles/goal-card.css";
const GoalCard = ({ alternateCard, title, text, image, button }) => {
  const imagePath = `${image}`;
  return (
    <div
      className={`text-white flex ${alternateCard} overflow-hidden goal-card-container  w-full bg-gray-800`}
    >
      <div className="details-card">
        <h2 className="text-3xl text-center font-semibold  text-white">
          {title}
        </h2>
        <p className="text-white font-normal text-center text-sm ">{text}</p>
        <div className="button-div">
          <button className="transition-all duration-200 ease-in-out">
            {button}
          </button>
        </div>
      </div>

      <div className="image-div">
        <img
          className="hover:cursor-pointer hover:opacity-75"
          src={imagePath}
          alt="Students studying"
        />
      </div>
    </div>
  );
};

export default GoalCard;
