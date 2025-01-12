import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import {
  Button,
  Drawer,
  Popconfirm,
  message,
  Form,
  Input,
  Select,
  DatePicker,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const AdmissionsTable = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
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
  const genderoption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "other", value: "other" },
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
    setDrawerVisible(true);
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
      toast.success("Record updated successfully!");

      fetchAdmissions();
    } catch (error) {
      console.error("Error updating record:", error);
      message.error("Failed to update record.");
    } finally {
      setDrawerVisible(false);
      setEditingRowKey(null);
      setEditingData({});
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
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 80,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Admission Date",
      dataIndex: "admissionDate",

      render: (admissionDate) => new Date(admissionDate).toLocaleDateString(),
    },
    {
      title: "Date of Birth",
      dataIndex: "dateofBirth",
      key: "dateofBirth",
      render: (dob) => {
        const validDob = dayjs(dob);
        return validDob.isValid()
          ? validDob.format("YYYY-MM-DD")
          : "Invalid Date";
      },
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
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
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>Loading...</p>
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
      <Drawer
        title="Edit Record"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Form
          onFinish={handleSave}
          layout="vertical"
          initialValues={editingData}
          onValuesChange={(changedValues, allValues) =>
            setEditingData(allValues)
          }
        >
          <Form.Item
            name="studentName"
            label="Student Name"
            rules={[{ required: true, message: "Please Enter Student Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="parentName"
            label="Father Name"
            rules={[{ required: true, message: "Please Enter Father Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="aadharNumber"
            label="Aadhar Number"
            rules={[{ required: true, message: "Please Enter Aadhar Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="panNumber"
            label="Pan Number"
            rules={[{ required: true, message: "Please Enter Pan Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[
              { required: true, message: "Please Enter Contact Number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: "D.O.B Required!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="admissionDate"
            label="Admission Date"
            rules={[{ required: true, message: "Admission Date Required!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="class"
            label="Class"
            rules={[{ required: true, message: "Class Name Required!" }]}
          >
            <Select>
              {classOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="session"
            label="Session"
            rules={[{ required: true, message: "Session Required!" }]}
          >
            <Select>
              {sessionOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Gender Required!" }]}
          >
            <Select>
              {genderoption.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdmissionsTable;
