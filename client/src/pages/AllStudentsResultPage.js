import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
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

const AllStudentsResultPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [editingRowKey, setEditingRowKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const resultUrl = process.env.REACT_APP_RESULT_URL;

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

  const fetchAllResults = async () => {
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
    fetchAllResults();
  }, []);

  const handleEdit = (record) => {
    setEditingRowKey(record.key);

    const { marks, ...rest } = record;

    setEditingData({
      ...rest,
      english: marks?.english || "",
      hindi: marks?.hindi || "",
      mathematics: marks?.mathematics || "",
      science: marks?.science || "",
      socialstudies: marks?.socialstudies || "",
      sports: marks?.sports || "",
      dateOfBirth: moment(record.dateOfBirth),
      admissionDate: moment(record.admissionDate),
    });

    setDrawerVisible(true);
  };

  const handleSave = async () => {
    try {
      const updatedRecord = {
        ...editingData,
        dateOfBirth: editingData.dateOfBirth
          ? editingData.dateOfBirth.toISOString()
          : null,
        admissionDate: editingData.admissionDate
          ? editingData.admissionDate.toISOString()
          : null,
      };
      await axios.put(`${resultUrl}/${editingRowKey}`, updatedRecord);
      setAdmissions((prevAdmissions) =>
        prevAdmissions.map((admission) =>
          admission.key === editingRowKey ? updatedRecord : admission
        )
      );
      toast.success("Record updated successfully!");
      fetchAllResults();
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
      await axios.delete(`${resultUrl}/${id}`);
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
      width: 60,
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
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
      width: 80,
    },
    {
      title: "Class Name",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "English",
      key: "english",
      dataIndex: "english",
      width: 80,
      render: (text, record) => record.marks?.english || "N/A",
    },
    {
      title: "Hindi",
      key: "hindi",
      dataIndex: "hindi",
      render: (text, record) => record.marks?.hindi || "N/A",
    },
    {
      title: "Mathematics",
      key: "mathematics",
      width: 110,
      dataIndex: "mathematics",
      render: (text, record) => record.marks?.mathematics || "N/A",
    },
    {
      title: "Science",
      key: "science",
      width: 80,
      dataIndex: "science",
      render: (text, record) => record.marks?.science || "N/A",
    },
    {
      title: "Social Studies",
      key: "socialstudies",
      width: 110,
      render: (text, record) => record.marks?.socialstudies || "N/A",
    },
    {
      title: "Sports",
      key: "sports",
      width: 80,
      dataIndex: "sports",
      render: (text, record) => record.marks?.sports || "N/A",
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
      title: "Session",
      key: "session",
      width: 80,
      dataIndex: "session",
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
          <p>Loading...</p>
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
          onValuesChange={(changedValues, allValues) => {
            if (
              changedValues.english ||
              changedValues.hindi ||
              changedValues.mathematics ||
              changedValues.science ||
              changedValues.socialstudies ||
              changedValues.sports
            ) {
              setEditingData({
                ...allValues,
                marks: {
                  english: allValues.english,
                  hindi: allValues.hindi,
                  mathematics: allValues.mathematics,
                  science: allValues.science,
                  socialstudies: allValues.socialstudies,
                  sports: allValues.sports,
                },
              });
            } else {
              setEditingData(allValues);
            }
          }}
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
            name="rollNumber"
            label="Roll Number"
            rules={[{ required: true, message: "Please Enter Roll Number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="english"
            label="English"
            rules={[{ required: true, message: "Please Enter Marks!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="hindi"
            label="Hindi"
            rules={[{ required: true, message: "Please Enter Marks!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mathematics"
            label="Mathematics"
            rules={[{ required: true, message: "Please Enter Marks!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="science"
            label="Science"
            rules={[{ required: true, message: "Please Enter Marks!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="socialstudies"
            label="Social Studies"
            rules={[{ required: true, message: "Please Enter Marks!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="sports"
            label="Sports"
            rules={[{ required: true, message: "Please Enter Marks!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker defaultValue={dayjs(editingData.dateOfBirth)} />
          </Form.Item>
          <Form.Item
            name="session"
            label="Session"
            rules={[{ required: true, message: "Please select a session!" }]}
          >
            <Select options={sessionOptions} />
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

export default AllStudentsResultPage;
