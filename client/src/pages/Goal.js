import React from "react";
import GoalCard from "./GoalCard";

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
          image="https://img.freepik.com/free-photo/young-teacher-helping-little-girl-class_23-2148633378.jpg?t=st=1736422153~exp=1736425753~hmac=65ee4c5bf261b1da0d5f34176715705a6a0fc1144d008d84c6441dec9be92d63&w=740"
          alternateCard="flex-col md:flex-row"
        />
        <GoalCard
          title="Smart Courses"
          text="With extensive teaching experience, I specialize in delivering smart courses that combine innovative methods and personalized instruction. My approach creates engaging and supportive environments, catering to diverse learning styles. I aim to inspire curiosity, critical thinking, and lifelong learning, helping students achieve their goals effectively and confidently."
          button="Apply Today"
          image="https://img.freepik.com/free-photo/students-doing-homework-park_53876-42624.jpg?t=st=1736422208~exp=1736425808~hmac=6b124c3f18e46719cc41ebd1140446f81b3f4d0447d6e424a1c40a2a6eea97de&w=740"
          alternateCard="md:flex-row-reverse flex-col"
        />
      </div>
    </div>
  );
};

export default Goals;
