import React from "react";
import ClassTable from "../../components/ClassTable";

const ClassSeven = () => {
  const url = process.env.REACT_APP_ADMISSION_URL;

  return (
    <div>
      <h1 className="heading">All Students in Class-7</h1>
      <ClassTable classId={7} url={url} />
    </div>
  );
};

export default ClassSeven;
