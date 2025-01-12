import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, message } from "antd";

const CreateAdmin = ({ token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const url = process.env.REACT_APP_CREATE_ADMIN_URL;
  const handleCreateAdmin = async (values) => {
    const { email, password, role } = values;

    try {
      const response = await axios.post(
        url,
        { email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(response.data.message);
    } catch (error) {
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
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
          />
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
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
          />
        </Form.Item>

        <Form.Item label="Role" name="role" initialValue={role}>
          <Select
            value={role}
            onChange={(value) => setRole(value)}
            placeholder="Select role"
          >
            <Select.Option value="staff">Staff</Select.Option>
            <Select.Option value="superadmin">Superadmin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Admin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAdmin;
