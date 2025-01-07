import React from "react";
import ClassTable from "../../components/ClassTable";

const ClassThree = () => {
  const url = process.env.REACT_APP_ADMISSION_URL;

  return (
    <div>
      <h1>All Students in Class-3</h1>
      <ClassTable classId={3} url={url} />
    </div>
  );
};

export default ClassThree;
