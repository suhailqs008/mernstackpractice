import React from "react";
import ClassTable from "../../components/ClassTable";

const ClassOne = () => {
  const url = process.env.REACT_APP_ADMISSION_URL;

  return (
    <div>
      <h1>All Students in Class-1</h1>
      <ClassTable classId={1} url={url} />
    </div>
  );
};

export default ClassOne;
