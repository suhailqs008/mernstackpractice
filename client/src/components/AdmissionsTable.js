import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import { Button, Drawer, Popconfirm, message } from "antd";
import { Form, Input, Select, DatePicker, Spin } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

const AdmissionsTable = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingData, setEditingData] = useState({});
  const [editingRowKey, setEditingRowKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const url = process.env.REACT_APP_ADMISSION_URL;
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

  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "StudenId",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
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
      title: "Parent Name",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Aadhar Number",
      dataIndex: "aadharNumber",
      key: "aadharNumber",
    },
    {
      title: "Pan Number",
      dataIndex: "panNumber",
      key: "panNumber",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (dob, record) =>
        editingRowKey === record.key ? (
          <DatePicker
            value={editingData.dateOfBirth}
            onChange={(date) => handleInputChange("dateOfBirth", date)}
          />
        ) : (
          new Date(dob).toLocaleDateString()
        ),
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
      key: "session",
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
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Admission Date",
      dataIndex: "admissionDate",
      key: "admissionDate",
      render: (admissionDate) => new Date(admissionDate).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        editingRowKey === record.key ? (
          <Button onClick={handleSave}>
            <SaveOutlined /> Save
          </Button>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button onClick={() => handleEdit(record)}>
              <EditOutlined style={{ color: "green" }} />
            </Button>
            <Popconfirm
              title="Are you sure to delete this record?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
            </Popconfirm>
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
    </div>
  );
};

export default AdmissionsTable;
