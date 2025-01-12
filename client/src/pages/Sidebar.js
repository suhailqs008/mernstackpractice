import React, { useState } from "react";
import {
  DatabaseOutlined,
  DesktopOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
              Hello Admin
              <img
                style={{ width: "30px", marginRight: "10px" }}
                src="https://camo.githubusercontent.com/d552948e7884c41fde2d32b9221d79f0df2076c7d824aaab954ca93f53d95884/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6876524a434c467a6361737252346961377a2f67697068792e676966"
                alt="gif"
              />
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
