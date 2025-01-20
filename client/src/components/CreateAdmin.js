import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Select, message, Spin } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateAdmin = ({ token, setDataUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const url = process.env.REACT_APP_CREATE_ADMIN_URL;

  const handleCreateAdmin = async (values) => {
    const { email, password, role } = values;
    setLoading(true);
    try {
      const response = await axios.post(
        url,
        { email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Credentials created successfully!");

      form.resetFields();
      setDataUpdated(true);
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Error creating admin.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
        backgroundColor: "white",
      }}
    >
      <h2>Create New Admin</h2>
      <Form
        form={form}
        name="create-admin-form"
        layout="vertical"
        onFinish={handleCreateAdmin}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter an email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter admin email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter a password!" },
            {
              min: 6,
              message: "Password must be at least 6 characters long!",
            },
          ]}
        >
          <Input.Password placeholder="Enter admin password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          initialValue="staff"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select disabled placeholder="Select role">
            <Select.Option value="staff">Staff</Select.Option>
            <Select.Option value="superadmin">Superadmin</Select.Option>
          </Select>
        </Form.Item>
        <div className="create-admin-btn">
          <Form.Item>
            <button type="submit" disabled={loading}>
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}
                />
              ) : (
                "Submit"
              )}
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreateAdmin;
