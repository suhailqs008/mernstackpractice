import React, { useEffect, useState } from "react";
import "../styles/admin-card.css";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const url = process.env.REACT_APP_ADMISSION_URL;
const resultUrl = process.env.REACT_APP_RESULT_URL;
const feeurl = process.env.REACT_APP_FEES_URL;
const adminurl = process.env.REACT_APP_ALL_ADMIN_URL;

const AdminCard = () => {
  const [admissions, setAdmissions] = useState([]);
  const [result, setResult] = useState([]);
  const [feesData, setFeesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateTotalAmount = (data) => {
    return data.reduce(
      (acc, record) => acc + (parseFloat(record.amount) || 0),
      0
    );
  };

  const fetchData = async () => {
    try {
      const [admissionsData, resultData, adminsData, feesData] =
        await Promise.all([
          axios.get(url),
          axios.get(resultUrl),
          axios.get(adminurl),
          axios.get(feeurl),
        ]);

      setAdmissions(admissionsData.data);
      setResult(resultData.data);
      setAdmins(adminsData.data);
      setFeesData(feesData.data);
      setTotalAmount(calculateTotalAmount(feesData.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [
    {
      count: admissions?.length || (
        <Spin
          style={{ fontSize: 60, color: "white" }}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      ),
      title: "Total Admissions",
      color: "teal",
    },
    {
      count: result?.length || (
        <Spin
          style={{ fontSize: 60, color: "white" }}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      ),
      title: "Total Result Generated",
      color: "orange",
    },
    {
      count:
        totalAmount !== undefined && totalAmount !== null ? (
          `₹${totalAmount.toFixed(2)}`
        ) : (
          <Spin
            style={{ color: "white" }}
            indicator={<LoadingOutlined spin />}
            size="large"
          />
        ),
      title: "Total Fees Submitted",
      color: "purple",
    },
    {
      count: admins?.length || (
        <Spin
          style={{ fontSize: 60, color: "white" }}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      ),
      title: "Total Admin Credentials",
      color: "green",
    },
  ];

  return (
    <div className="dashboard">
      <div className="row">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{ backgroundColor: card.color }}
          >
            <div className="card-content">
              <h1 style={{ color: "white" }}>{card.count}</h1>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCard;
