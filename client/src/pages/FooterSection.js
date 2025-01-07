import React from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import {
  TwitterOutlined,
  YoutubeOutlined,
  GithubOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterSection = () => {
  return (
    <Footer style={{ background: "#000", color: "#fff", padding: "40px 20px" }}>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={6}>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://i.pinimg.com/474x/58/8d/6e/588d6ef34e23dd63d5edfc9a59645ff3.jpg"
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p>© 2024. All Rights Reserved</p>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <TwitterOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
            <YoutubeOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
            <GithubOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
          </div>
        </Col>

        <Col xs={24} sm={12} md={6} style={{ cursor: "pointer" }}>
          <h4 style={{ color: "#fff" }}>Company</h4>
          <p>About us</p>

          <p>Contact us </p>

          <p>Testimonials</p>
        </Col>

        <Col xs={24} sm={12} md={6} style={{ cursor: "pointer" }}>
          <h4 style={{ color: "#fff" }}>Support</h4>
          <p>Help Center</p>
          <p>Terms of Service</p>

          <p>Privacy Policy</p>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{ color: "#fff" }}>Stay up to date</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
              placeholder="Your email address"
              style={{
                borderRadius: "5px",
                borderColor: "#0cf",
                color: "#000",
              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<MailOutlined />}
              style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
            />
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterSection;
