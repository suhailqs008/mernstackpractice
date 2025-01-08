import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Spin,
  Table,
} from "antd";
import { IoArrowForwardCircle } from "react-icons/io5";
import axios from "axios";

const { Search } = Input;

const AdmissionSearch = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const searchUrl = process.env.REACT_APP_ADMISSION_URL;
  const updateUrl = process.env.REACT_APP_FEES_URL;
  console.log(updateUrl);

  const handleSearch = async (value) => {
    if (!value) {
      message.warning("Please enter a name to search.");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.get(searchUrl, {
        params: { search: value },
      });
      setAdmissions(response.data);
    } catch (error) {
      message.error("Failed to fetch admissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAdmissions([]);
    setSearchValue("");
    setSearched(false);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setDrawerVisible(true);
  };

  const handleSave = async () => {
    try {
      const updatedValues = form.getFieldsValue();
      if (!editingRecord) {
        message.error("No record is selected for updating.");
        return;
      }

      const response = await axios.post(updateUrl, updatedValues);
      message.success("Data sent successfully.");
      setDrawerVisible(false);
    } catch (error) {
      console.error("Error while sending data to the backend:", error);
      message.error("Failed to send data. Please try again.");
    }
  };

  {
  }
  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Father Name",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
    },

    {
      title: "Mobile",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => handleEdit(record)}>
            <IoArrowForwardCircle style={{ color: "green" }} />
            Proceed
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Student</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Search
          placeholder="Enter student name"
          enterButton="Search"
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: "400px" }}
        />
        <Button onClick={handleReset} type="primary" size="large">
          Reset
        </Button>
      </div>

      {loading ? (
        <div
          style={{ display: "flex", flexDirection: "column", width: "80px" }}
        >
          <Spin style={{ marginBottom: "10px" }} size="large" />
          Searching......
        </div>
      ) : (
        <>
          {admissions.length > 0 ? (
            <Table
              columns={columns}
              dataSource={admissions}
              rowKey="key"
              bordered
            />
          ) : (
            searched && <h3>No student details found.</h3>
          )}
        </>
      )}
      <Drawer
        title="Edit Student Details"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Student Name"
            name="studentName"
            rules={[{ required: true, message: "Student Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true, message: "Class is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Father Name"
            name="parentName"
            rules={[{ required: true, message: "Father Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Session"
            name="session"
            rules={[{ required: true, message: "Session is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Month"
            name="month"
            rules={[{ required: true, message: "Month is required" }]}
          >
            <Select placeholder="Select Month">
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <Select.Option key={month} value={month}>
                  {month}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Roll Number"
            name="rollNumber"
            rules={[{ required: true, message: "Roll Number is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[{ required: true, message: "Payment Method is required" }]}
          >
            <Select placeholder="Select Payment Method">
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Card">Card</Select.Option>
              <Select.Option value="Online">Online</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            onClick={handleSave}
            style={{ marginTop: "20px" }}
          >
            Save
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdmissionSearch;
