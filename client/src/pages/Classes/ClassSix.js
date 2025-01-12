import React from "react";
import ClassTable from "../../components/ClassTable";

const ClassSix = () => {
  const url = process.env.REACT_APP_ADMISSION_URL;

  return (
    <div>
      <h1 className="heading">All Students in Class-6</h1>
      <ClassTable classId={6} url={url} />
    </div>
  );
};

export default ClassSix;
