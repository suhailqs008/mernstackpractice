import React from "react";
import { Menu, Layout, Button, Dropdown } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        School Login
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#001529",
        padding: "0 20px",
        position: "sticky",
        top: "0",
        zIndex: "100",
      }}
    >
      <div style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}>
        <ScrollLink
          to="home-section"
          smooth={true}
          duration={500}
          offset={-100}
        >
          <img
            style={{ width: "40px", height: "40px", borderRadius: "5px" }}
            src="https://i.pinimg.com/474x/58/8d/6e/588d6ef34e23dd63d5edfc9a59645ff3.jpg"
            alt="logo"
          />
        </ScrollLink>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flex: 1, justifyContent: "right" }}
      >
        <Menu.Item key="about">
          <ScrollLink
            to="about-section"
            smooth={true}
            duration={500}
            offset={-100}
          >
            About Us
          </ScrollLink>
        </Menu.Item>
        <Menu.Item key="gallery">
          <ScrollLink
            to="gallery-section"
            smooth={true}
            duration={500}
            offset={-100}
          >
            Gallery
          </ScrollLink>
        </Menu.Item>
        <Menu.Item key="goalsection">
          <ScrollLink
            to="ourGoal-section"
            smooth={true}
            duration={500}
            offset={-100}
          >
            Our Goals
          </ScrollLink>
        </Menu.Item>
        <Menu.Item key="instructor">
          <ScrollLink
            to="instructor-section"
            smooth={true}
            duration={500}
            offset={-100}
          >
            Contact
          </ScrollLink>
        </Menu.Item>
        <Menu.Item key="about">
          <ScrollLink
            to="teacher-section"
            smooth={true}
            duration={500}
            offset={-100}
          >
            Teachers
          </ScrollLink>
        </Menu.Item>
      </Menu>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="text"
          icon={<UserOutlined />}
          style={{
            color: "#fff",
            border: "none",
            background: "transparent",
            fontSize: "16px",
          }}
        >
          <DownOutlined />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
