import React from "react";
import ClassTable from "../../components/ClassTable";

const ClassFive = () => {
  const url = process.env.REACT_APP_ADMISSION_URL;

  return (
    <div>
      <h1 className="heading">All Students in Class-5</h1>
      <ClassTable classId={5} url={url} />
    </div>
  );
};

export default ClassFive;
