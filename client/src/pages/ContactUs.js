import React from "react";
import { Form, Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const ContactUs = () => {
  return (
    <div>
      <h1
        id="instructor-section"
        style={{ textAlign: "center", fontSize: "30px" }}
      >
        Contact Us
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "80%",
          margin: "auto",
          padding: "10px",
          gap: "0px",
          background: "#f9f9f9",
        }}
      >
        <div>
          <img
            style={{ height: "100%" }}
            src="https://trainee-assignment-dashboard-frontend.vercel.app/assets/laptop2-WM68pCqY.jpg"
            alt="contact"
          />
        </div>
        <div
          style={{
            flex: "1 1 300px",
            padding: "20px",
            background: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            layout="vertical"
            name="contact_form"
            onFinish={(values) => console.log("Submitted values: ", values)}
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
                { required: true, message: "Please enter your email!" },
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
              ]}
            >
              <Input placeholder="tel: XXX XXX XXXX" />
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
                <Button type="primary" htmlType="submit" block>
                  Send
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        {/* <div
          style={{
            flex: "1 1 300px",
            padding: "20px",
            background: "#1890ff",
            color: "#fff",
            height: "250px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            fontSize: "15px",
          }}
        >
          <h3
            style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}
          >
            Contact Us
          </h3>
          <p>
            <EnvironmentOutlined style={{ marginRight: "8px" }} />
            Address: Your Address Here
          </p>
          <p>
            <PhoneOutlined style={{ marginRight: "8px" }} />
            Phone: +1-000-000-000
          </p>
          <p>
            <MailOutlined style={{ marginRight: "8px" }} />
            Email: example@xyz.com
          </p>
          <p>
            <GlobalOutlined style={{ marginRight: "8px" }} />
            Website: www.yourcompany.com
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ContactUs;
