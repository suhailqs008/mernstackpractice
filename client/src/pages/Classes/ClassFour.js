import React from "react";
import ClassTable from "../../components/ClassTable";

const ClassFour = () => {
  const url = process.env.REACT_APP_ADMISSION_URL;

  return (
    <div>
      <h1>All Students in Class-4</h1>
      <ClassTable classId={4} url={url} />
    </div>
  );
};

export default ClassFour;
