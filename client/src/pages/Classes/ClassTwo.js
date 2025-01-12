import React from "react";
import ClassTable from "../../components/ClassTable";

const ClassTwo = () => {
  const url = process.env.REACT_APP_ADMISSION_URL;

  return (
    <div>
      <h1 className="heading">All Students in Class-2</h1>
      <ClassTable classId={2} url={url} />
    </div>
  );
};

export default ClassTwo;
