import React, { useEffect, useState } from "react";
import ChartComponent from "../components/ChartComponent";
import axios from "axios";

const ChartVisulisation = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const resultUrl = process.env.REACT_APP_RESULT_URL;

  const fetchAdmissions = async () => {
    try {
      const response = await axios.get(resultUrl);
      setAdmissions(response.data);
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdmissions();
  }, []);
  const formatChartData = () => {
    return admissions.map((admission) => {
      return {
        name: admission.studentName,
        value: admission.marks?.english || 0,
      };
    });
  };

  return (
    <div>
      <ChartComponent data={formatChartData()} />;
    </div>
  );
};

export default ChartVisulisation;
