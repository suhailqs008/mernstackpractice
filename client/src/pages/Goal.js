import React from "react";
import GoalCard from "./GoalCard";
import tech1 from "../assets/goal-tech1.jpg";
import tech2 from "../assets/goaltech2.jpg";
const Goals = () => {
  return (
    <div
      className="z-0  mt-4 bg-slate-100 text-indigo-950 "
      id="ourGoal-section"
    >
      <div className="sm:w-4/5 md:4/5 w-full m-auto">
        <h1 className="md:text-2xl text-2xl font-semibold m-3">Our Goals</h1>
      </div>
      <div className="cards   flex flex-col justify-center items-center">
        <GoalCard
          title="Experienced Teachers"
          text="With extensive teaching experience, I create engaging and supportive
          learning environments where students thrive. Specializing in subjects,
          I combine innovative methods with personalized instruction to cater to
          diverse learning styles. My goal is to inspire curiosity, critical
          thinking, and lifelong learning, helping every student reach their
          full potential."
          button="Safety Measures"
          image={tech1}
          alternateCard="flex-col md:flex-row"
        />
        <GoalCard
          title="Smart Courses"
          text="With extensive teaching experience, I specialize in delivering smart courses that combine innovative methods and personalized instruction. My approach creates engaging and supportive environments, catering to diverse learning styles. I aim to inspire curiosity, critical thinking, and lifelong learning, helping students achieve their goals effectively and confidently."
          button="Apply Today"
          image={tech2}
          alternateCard="md:flex-row-reverse flex-col"
        />
      </div>
    </div>
  );
};

export default Goals;
