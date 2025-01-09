import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, DatePicker, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import "../styles/admission-form.css";

const { Option } = Select;
const { TextArea } = Input;

const AdmissionForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const url = process.env.REACT_APP_ADMISSION_URL;

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(url, values);

      setLoading(false);
      toast.success("Congratulation Record Saved Succesfully!");
      form.resetFields();
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.message);
      toast.error("Failed to submit data!");
    }
  };

  const validateName = (_, value) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!value || nameRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Name should not contain numbers or symbols.")
    );
  };

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

  return (
    <div className="main-container">
      <div className="form-wrapper">
        <div className="form-wrapper-div">
          <h1>Admission Form</h1>
          <Form
            form={form}
            onFinish={handleFormSubmit}
            name="admissionForm"
            layout="horizontal"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <div className="form_items1">
              <Form.Item
                label="Student Name"
                name="studentName"
                className="form-item"
                rules={[
                  { required: true, message: "Please enter student name!" },
                  { validator: validateName },
                ]}
              >
                <Input placeholder="Enter Student Name" />
              </Form.Item>
              <Form.Item
                label="Father's Name"
                name="parentName"
                className="form-item"
                rules={[
                  { required: true, message: "Please enter father's name!" },
                  { validator: validateName },
                ]}
              >
                <Input placeholder="Father's Name" />
              </Form.Item>
            </div>

            <div className="form_items1">
              <Form.Item
                label="Class Name"
                name="class"
                className="form-item"
                rules={[
                  { required: true, message: "Please select class name!" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select Class Name"
                  options={classOptions}
                />
              </Form.Item>
              <Form.Item
                label="PAN Number"
                name="panNumber"
                className="form-item"
                rules={[
                  {
                    required: true,
                    message: "Please enter your PAN number!",
                  },
                  {
                    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message:
                      "PAN number must follow the format: 5 letters, 4 digits, 1 letter.",
                  },
                ]}
              >
                <Input
                  placeholder="Enter PAN Number"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "");
                    form.setFieldsValue({ panNumber: value });
                  }}
                />
              </Form.Item>
            </div>

            <div className="form_items1">
              <Form.Item
                label="Admission Date"
                name="admissionDate"
                className="form-item"
                rules={[
                  { required: true, message: "Please select admission date!" },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dateofBirth"
                className="form-item"
                rules={[{ required: true, message: "Please select DOB!" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    return current && current > new Date();
                  }}
                />
              </Form.Item>
            </div>
            <div className="form_items1">
              <Form.Item
                name="gender"
                label="Gender"
                className="form-item"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select Gender"
                  options={genderoption}
                />
              </Form.Item>
              <Form.Item
                label="Session"
                name="session"
                className="form-item"
                rules={[{ required: true, message: "Please select session!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select session"
                  options={sessionOptions}
                />
              </Form.Item>
            </div>
            <div className="form_items">
              <Form.Item
                label="Mobile"
                name="contactNumber"
                className="form-item-input"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Mobile number must be exactly 10 digits!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    form.setFieldsValue({ contactNumber: value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Aadhar Number"
                name="aadharNumber"
                className="form-item-input"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Aadhar number!",
                  },
                  {
                    pattern: /^[0-9]{12}$/,
                    message: "Aadhar number must be exactly 12 digits!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Aadhar Number"
                  maxLength={12}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    form.setFieldsValue({ aadharNumber: value });
                  }}
                />
              </Form.Item>
            </div>
            <div className="form_items1">
              <Form.Item
                label="Address"
                name="address"
                className="form-item"
                rules={[
                  { required: true, message: "Please enter your address!" },
                  {
                    min: 10,
                    message: "Address should be at least 10 characters long.",
                  },
                ]}
              >
                <TextArea rows={3} flex={3} />
              </Form.Item>
            </div>

            <div className="submit_btn">
              <Form.Item>
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 20 }} spin />
                      }
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <div className="left-image-container">
        <img
          className="admissionForm-image"
          src={
            "https://www.shutterstock.com/image-vector/admission-open-banner-social-media-600nw-2227399121.jpg"
          }
          alt="admission"
        />
      </div>
    </div>
  );
};

export default AdmissionForm;
