import React, { useState } from "react";
import { Tabs } from "antd";
import CreateAdmin from "../components/CreateAdmin";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import AlladminDetails from "../components/AlladminDetails";
import AdminCard from "./AdminCard";
import { DashboardOutlined } from "@ant-design/icons";

const AdminPageTabs = () => {
  const [dataUpdated, setDataUpdated] = useState(false);
  return (
    <Tabs
      type="card"
      items={[
        {
          label: (
            <span className="tabs-item">
              <DashboardOutlined style={{ marginRight: 8 }} />
              Dashboard
            </span>
          ),
          key: "1",
          children: <AdminCard />,
        },
        {
          label: (
            <span className="tabs-item">
              <FaUserPlus style={{ marginRight: 8 }} />
              Create Admin
            </span>
          ),
          key: "2",
          children: <CreateAdmin setDataUpdated={setDataUpdated} />,
        },
        {
          label: (
            <span className="tabs-item">
              <FaUsers style={{ marginRight: 8 }} />
              All Admin
            </span>
          ),
          key: "3",
          children: <AlladminDetails dataUpdated={dataUpdated} />,
        },
      ]}
    />
  );
};

export default AdminPageTabs;
