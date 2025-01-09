import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Drawer, Modal, Popconfirm, message } from "antd";
import { Form, Input, Select, DatePicker, Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import "../styles/receipt.css";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Table from "../components/Table";
const { Option } = Select;
const { TextArea } = Input;

const FeesRecordPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingData, setEditingData] = useState({});
  const [editingRowKey, setEditingRowKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const printRef = useRef(null);

  const pageSize = 10;
  const url = process.env.REACT_APP_FEES_URL;
  console.log(url);

  const classOptions = [
    { label: "Class-1", value: "class-1" },
    { label: "Class-2", value: "class-2" },
    { label: "Class-3", value: "class-3" },
    { label: "Class-4", value: "class-4" },
    { label: "Class-5", value: "class-5" },
    { label: "Class-6", value: "class-6" },
    { label: "Class-7", value: "class-7" },
    { label: "Class-8", value: "class-8" },
    { label: "Class-9", value: "class-9" },
    { label: "Class-10", value: "class-10" },
  ];

  const sessionOptions = [
    { label: "2024-2025", value: "2024-2025" },
    { label: "2025-2026", value: "2025-2026" },
    { label: "2026-2027", value: "2026-2027" },
  ];
  const fetchAdmissions = async () => {
    try {
      const response = await axios.get(url);
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

  const handleEdit = (record) => {
    setEditingRowKey(record.key);
    setEditingData({
      ...record,
      dateOfBirth: moment(record.dateOfBirth),
      admissionDate: moment(record.admissionDate),
    });
  };

  const handleModalOpen = (record) => {
    setSelectedRow(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };
  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);
  const printFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: selectedRow?.studentName,
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });
  const handleSave = async () => {
    try {
      const updatedRecord = {
        ...editingData,
        dateOfBirth: editingData.dateOfBirth.toISOString(),
        admissionDate: editingData.admissionDate.toISOString(),
      };
      await axios.put(`${url}/${editingRowKey}`, updatedRecord);
      setAdmissions((prevAdmissions) =>
        prevAdmissions.map((admission) =>
          admission.key === editingRowKey ? updatedRecord : admission
        )
      );
      setEditingRowKey(null);
      setEditingData({});
      message.success("Record updated successfully!");
      fetchAdmissions();
    } catch (error) {
      console.error("Error updating record:", error);
      message.error("Failed to update record.");
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      message.success("Record deleted successfully!");
      setAdmissions((prevAdmissions) =>
        prevAdmissions.filter((admission) => admission._id !== id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Failed to delete record.");
    }
  };
  const handleInputChange = (field, value) => {
    setEditingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  function capitalizeFirstWord(str) {
    return str.replace(/^\w/, (char) => char.toUpperCase());
  }
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
      fixed: "left",
      width: 100,

      render: (text, record) =>
        editingRowKey === record.key ? (
          <Input
            value={editingData.studentName}
            onChange={(e) => handleInputChange("studentName", e.target.value)}
          />
        ) : (
          text
        ),
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
      render: (text, record) =>
        editingRowKey === record.key ? (
          <Select
            value={editingData.class}
            onChange={(value) => handleInputChange("class", value)}
          >
            {classOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        ) : (
          text
        ),
    },

    {
      title: "Session Name",
      dataIndex: "session",

      render: (text, record) =>
        editingRowKey === record.key ? (
          <Select
            value={editingData.session}
            onChange={(value) => handleInputChange("session", value)}
          >
            {sessionOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        ) : (
          text
        ),
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
      render: (_, record) =>
        editingRowKey === record.key ? (
          <Button onClick={handleSave}>
            <SaveOutlined style={{ fontSize: "20px" }} /> Save
          </Button>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              style={{ fontSize: "10px", padding: "10px" }}
              onClick={() => handleEdit(record)}
            >
              <EditOutlined style={{ color: "green" }} />
            </Button>
            <Popconfirm
              title="Are you sure to delete this record?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ fontSize: "10px", padding: "10px" }}>
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
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
            style={{ fontSize: "12px", padding: "10px" }}
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
      <h1>Admissions Table</h1>
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
        title="Print Slip"
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
            <div className="receipt-container">
              <div className="header">
                <div className="logo">
                  <img
                    src="https://i.pinimg.com/474x/58/8d/6e/588d6ef34e23dd63d5edfc9a59645ff3.jpg"
                    alt="Logo"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div className="school-details">
                  <h1>APNA SCHOOL SHAHABAD,HARDOI</h1>
                  <p>English/HINDI Medium School </p>
                  <p>Shahabad, Hardoi, Uttar Pradesh-241124.</p>
                  <p>Phone No.: 0265-2316677</p>
                </div>
                <div className="receipt-label">
                  <img
                    src="https://i.pinimg.com/474x/58/8d/6e/588d6ef34e23dd63d5edfc9a59645ff3.jpg"
                    alt="Logo"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              </div>
              <div className="student-details">
                <div className="fees-details">
                  <p>
                    <strong>Student Name:</strong> {selectedRow.studentName}
                  </p>
                  <p>
                    <strong>Father Name:</strong> {selectedRow.parentName}
                  </p>
                  <p>
                    <strong>Session:</strong> {selectedRow.session}
                  </p>
                </div>
                <div className="fees-details">
                  <p>
                    <p>
                      <strong>Payment Date:</strong>{" "}
                      {new Date(selectedRow.date).toLocaleDateString()}
                    </p>
                  </p>
                  <p>
                    <strong>Amount:</strong> {selectedRow.amount}
                  </p>
                  <p>
                    <strong>Month:</strong> {selectedRow.month}
                  </p>
                </div>
                <div className="fees-details">
                  <p>
                    <strong>Payment Method:{selectedRow.paymentMethod}</strong>
                  </p>
                  <p>
                    <strong>
                      Roll Number:-
                      {selectedRow.rollNumber ? selectedRow.rollNumber : ".."}
                    </strong>
                  </p>
                  <p>
                    <strong>{capitalizeFirstWord(selectedRow.class)}</strong>
                  </p>
                </div>
              </div>
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Particulars</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Monthly Fees</td>
                    <td>{selectedRow.amount}</td>
                  </tr>
                </tbody>
              </table>
              <div className="total-section">
                <p>
                  <strong>Total Amount:</strong> Rs. {selectedRow.amount}
                </p>
              </div>
              <div className="remarks">
                <p>
                  Fees Amount once paid will not be refundable or transferable.
                </p>
              </div>
              <div className="footer">
                <p>
                  <strong>Payment Date:</strong>{" "}
                  {new Date(selectedRow.date).toLocaleDateString()}
                </p>

                <p>
                  <strong>Sign:</strong> _______________________
                </p>
              </div>
              <p style={{ fontSize: "10px" }}> {indianTime}</p>
            </div>
          ) : (
            <p>No record selected for printing.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FeesRecordPage;
