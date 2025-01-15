import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import contactup from "../assets/contactus.jpg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [form] = Form.useForm();

  const url = process.env.REACT_APP_CONTACT_URL;
  const onFinish = async (values) => {
    try {
      const response = await axios.post(url, values);

      if (response.status === 201) {
        toast.success("Thank you for contacting us!");
        form.resetFields();
      } else {
        message.error("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error("Error submitting contact form: ", error);
      message.error("Unable to submit. Please try again later!");
    }
  };

  return (
    <div className="bg-slate-100 " data-aos="fade-up" data-aos-duration="3000">
      <h1
        id="instructor-section"
        className="md:text-2xl text-2xl font-semibold text-indigo-950 m-3 mt-5"
      >
        Contact Us
      </h1>
      <div className="contact-us-container">
        <div className="image-div">
          <img
            className="hover:cursor-pointer hover:opacity-75"
            style={{ height: "100%" }}
            src={contactup}
            alt="contact"
          />
        </div>
        <div
          style={{
            flex: "1 1 200px",
            padding: "20px",
            background: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            layout="vertical"
            name="contact_form"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name!" },
              ]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: false, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone number must be exactly 10 digits!",
                },
              ]}
            >
              <Input placeholder="Phone (e.g., 9876543210)" maxLength={10} />
            </Form.Item>

            <Form.Item
              name="message"
              label="Your Message"
              rules={[
                { required: true, message: "Please enter your message!" },
              ]}
            >
              <Input.TextArea placeholder="Your Message Here..." rows={4} />
            </Form.Item>
            <div style={{ width: "30%", margin: "auto", alignItems: "center" }}>
              <Form.Item>
                <Button
                  className="bg-gray-950 text-white"
                  htmlType="submit"
                  block
                >
                  Send
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
