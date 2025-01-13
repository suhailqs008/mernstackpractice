import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Modal, Popconfirm, message } from "antd";
import { Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import "../styles/receipt.css";
import { DeleteOutlined, PrinterOutlined } from "@ant-design/icons";
import Table from "../components/Table";
import FeesReceiptModal from "./FeesReceiptModal";

const FeesRecordPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const printRef = useRef(null);
  const pageSize = 10;
  const url = process.env.REACT_APP_FEES_URL;

  const fetchAdmissions = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;

      setAdmissions(data);

      calculateTotalAmount(data);
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };
  const calculateTotalAmount = (data) => {
    const total = data.reduce(
      (acc, record) => acc + (parseFloat(record.amount) || 0),
      0
    );
    setTotalAmount(total);
  };
  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleModalOpen = (record) => {
    setSelectedRow(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };
  const handleAfterPrint = React.useCallback(() => {}, []);

  const handleBeforePrint = React.useCallback(() => {
    return Promise.resolve();
  }, []);
  const printFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: selectedRow?.studentName,
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      message.success("Record deleted successfully!");
      setAdmissions((prevAdmissions) =>
        prevAdmissions.filter((admission) => admission._id !== id)
      );
      calculateTotalAmount(
        admissions.filter((admission) => admission._id !== id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Failed to delete record.");
    }
  };

  const currentDate = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  function capitalizeFirstWord(str) {
    return str.replace(/^\w/, (char) => char.toUpperCase());
  }
  const indianTime = currentDate.toLocaleString("en-IN", options);

  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      fixed: "left",
      width: 80,

      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },

    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Father Name",
      dataIndex: "parentName",
      key: "parentName",
    },

    {
      title: "Class Name",
      dataIndex: "class",
      key: "class",
    },

    {
      title: "Session Name",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
      width: 80,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (feesDate) => new Date(feesDate).toLocaleDateString(),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },

    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ fontSize: "16px", padding: "5px 10px" }}
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Popconfirm>
        </div>
      ),
    },
    {
      title: "Print Slip",
      key: "actions",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            style={{ fontSize: "16px", padding: "10px" }}
            onClick={() => handleModalOpen(record)}
          >
            <PrinterOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Fees Submission Details</h1>
      <h2
        style={{
          fontSize: "16px",
          fontWeight: "600",
          padding: "0px 10px",
          color: "#0073e6",
        }}
      >
        Total Amount: ₹{totalAmount.toFixed(2)}
      </h2>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Spin size="large"></Spin>
          Please Wait Loading....
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={admissions.map((admission) => ({
            key: admission._id,
            ...admission,
          }))}
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          pageSize={pageSize}
          totalRecord={admissions.length}
        />
      )}
      <Modal
        open={isModalOpen}
        width={600}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
          <Button key="print" type="primary" onClick={printFn}>
            Print
          </Button>,
        ]}
      >
        <div ref={printRef}>
          {selectedRow ? (
            <FeesReceiptModal
              selectedRow={selectedRow}
              indianTime={indianTime}
              capitalizeFirstWord={capitalizeFirstWord}
            />
          ) : (
            <p>No record selected for printing.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FeesRecordPage;
