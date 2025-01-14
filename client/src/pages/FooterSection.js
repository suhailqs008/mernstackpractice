import React from "react";
import { Layout, Row, Col } from "antd";
import {
  TwitterOutlined,
  YoutubeOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import logo from "../assets/schoollogo.png";

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
                cursor: "pointer",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p>© Apna School 2025. All Rights Reserved</p>
          </div>
          <div
            className="social-icons"
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramOutlined className="instagram-icon" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <TwitterOutlined className="twitter-icon" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <YoutubeOutlined className="youtube-icon" />
            </a>
            <a
              href="https://wa.me/919598125005"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsAppOutlined className="whatsapp-icon" />
            </a>
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
          <h4 className="footer-heading">Our Location</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ textAlign: "center", borderRadius: "50px" }}>
              <div
                style={{
                  width: "80%",
                  maxWidth: "300px",
                  margin: "0 auto",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d56549.823802942985!2d79.90350984487414!3d27.644208146389996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x399fade6237f3951%3A0x21113f5078813a11!2sShahabad%2C%20Hardoi%2C%20Uttar%20Pradesh!3m2!1d27.6441382!2d79.9447096!4m0!5e0!3m2!1sen!2sin!4v1736825933771!5m2!1sen!2sin"
                  width="100%"
                  height="50"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="footer-item" style={{ marginTop: "10px" }}>
                Visit us at: Shahabad, Hardoi, Uttar Pradesh
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterSection;
