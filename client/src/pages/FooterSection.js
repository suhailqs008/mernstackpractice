import React from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import {
  TwitterOutlined,
  YoutubeOutlined,
  GithubOutlined,
  MailOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.jpg";
import "../styles/footer.css";

const { Footer } = Layout;

const FooterSection = () => {
  return (
    <Footer style={{ background: "#000", color: "#fff", padding: "40px 20px" }}>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={6}>
          <div style={{ textAlign: "center" }}>
            <img
              src={logo}
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
            className="social-icons"
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <TwitterOutlined className="icon" />
            <YoutubeOutlined className="icon" />
            <GithubOutlined className="icon" />
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 className="footer-heading">Company</h4>
          <p className="footer-item">About us</p>
          <p className="footer-item">Contact us</p>
          <p className="footer-item">Testimonials</p>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 className="footer-heading">Support</h4>
          <p className="footer-item">Help Center</p>
          <p className="footer-item">Terms of Service</p>
          <p className="footer-item">Privacy Policy</p>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 className="footer-heading">Stay up to date</h4>
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
