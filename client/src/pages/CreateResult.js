import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, InputNumber } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const { Option } = Select;
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
const resultUrl = process.env.REACT_APP_RESULT_URL;

const CreateResult = ({ setDataUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    const formattedValues = {
      ...values,
      marks: {
        english: values.english,
        hindi: values.hindi,
        mathematics: values.mathematics,
        science: values.science,
        sports: values.sports,
        socialstudies: values.socialstudies,
      },
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD")
        : null,
    };

    setLoading(true);
    try {
      const response = await axios.post(resultUrl, formattedValues);
      setLoading(false);
      toast.success("Congratulations! Marks Saved Successfully!");
      form.resetFields();
      setDataUpdated(true);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.message);
      toast.error("Failed to submit data!");
    }
  };

  return (
    <>
      <h1 className="result-heading">Submit Exam Marks </h1>
      <Form
        style={{ padding: "20px" }}
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          session: "2024-2025",
        }}
      >
        <div className="result-generate-form">
          <Form.Item
            label="Student Name"
            name="studentName"
            rules={[
              { required: true, message: "Please enter the student name!" },
            ]}
          >
            <Input placeholder="Enter student name" />
          </Form.Item>

          <Form.Item
            label="Parent Name"
            name="parentName"
            rules={[
              { required: true, message: "Please enter the parent name!" },
            ]}
          >
            <Input placeholder="Enter parent name" />
          </Form.Item>

          <Form.Item
            label="Roll Number"
            name="rollNumber"
            rules={[{ required: true, message: "Please enter roll Number!" }]}
          >
            <Input placeholder="Enter parent name" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select placeholder="Select gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true, message: "Please select the class!" }]}
          >
            <Select
              showSearch
              placeholder="Select Class Name"
              options={classOptions}
            />
          </Form.Item>

          <Form.Item
            label="Session"
            name="session"
            rules={[{ required: true, message: "Session is required!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please select the date of birth!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <h3>Subject Marks</h3>
        <div style={{ padding: "10px" }} className="result-generate-form">
          {[
            "English",
            "Hindi",
            "Mathematics",
            "Science",
            "Socialstudies",
            "Sports",
          ].map((subject) => (
            <Form.Item
              key={subject}
              label={subject}
              name={subject.toLowerCase()}
              rules={[
                {
                  required: true,
                  message: `Please enter marks for ${subject}!`,
                },
              ]}
            >
              <InputNumber
                placeholder={`Enter ${subject} marks`}
                min={0}
                max={100}
                style={{ width: "100%" }}
              />
            </Form.Item>
          ))}
        </div>

        <div className="result-submit-btn">
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit Result
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateResult;
