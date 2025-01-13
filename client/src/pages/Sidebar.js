import React, { useState } from "react";
import { DesktopOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { FaSquarePhone } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { PiCurrencyInrBold } from "react-icons/pi";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { SiGoogleforms } from "react-icons/si";
import ScrollingText from "./ScrollingText";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Admission Form", "/admin/admissionform", <SiGoogleforms />),
  getItem("Admission Data", "/admin/admissiondata", <FaDatabase />),
  getItem("Fees", "/admin/fees", <PiCurrencyInrBold />),
  getItem("Fees Record", "/admin/feerecord", <FaRupeeSign />),
  getItem("Results", "/admin/result", <DesktopOutlined />),
  getItem("All Classes", "", <BsFillBuildingsFill />, [
    getItem("Class-1", "/admin/class-1", <FaBuilding />),
    getItem("Class-2", "/admin/class-2", <FaBuilding />),
    getItem("Class-3", "/admin/class-3", <FaBuilding />),
    getItem("Class-4", "/admin/class-4", <FaBuilding />),
    getItem("Class-5", "/admin/class-5", <FaBuilding />),
    getItem("Class-6", "/admin/class-6", <FaBuilding />),
    getItem("Class-7", "/admin/class-7", <FaBuilding />),
    getItem("Class-8", "/admin/class-8", <FaBuilding />),
  ]),
  getItem("Bus Record", "/admin/buses", <FaBus />),
  getItem("Qyery request", "/admin/contact", <FaSquarePhone />),
  getItem("Manage", "/admin/user", <IoSettings />),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const adminEmail = localStorage.getItem("admin") || [];

  return (
    <Layout style={{ minHeight: "100vh", fontWeight: "16px" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 20px",
            background: colorBgContainer,
          }}
        >
          <div
            className="header-hello-admin"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span className="gif-animation" style={{ marginRight: "10px" }}>
              welcome: {adminEmail}
            </span>
            <div style={{ width: "50%" }}>
              <ScrollingText text="Welcome Admin" />
            </div>

            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{
                  fontSize: "16px",
                  padding: "0",
                  marginTop: "15px",
                }}
              >
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content>
          {location.pathname === "/admin" ? (
            <div>
              <img
                style={{ width: "95%" }}
                src="https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
                alt="school"
              />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
