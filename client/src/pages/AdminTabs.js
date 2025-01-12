import React from "react";
import { Tabs } from "antd";
import CreateAdmin from "../components/CreateAdmin";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import AlladminDetails from "../components/AlladminDetails";

const AdminPageTabs = () => (
  <Tabs
    type="card"
    items={[
      {
        label: (
          <span>
            <FaUserPlus style={{ marginRight: 8 }} />
            Create Admin
          </span>
        ),
        key: "1",
        children: <CreateAdmin />,
      },
      {
        label: (
          <span>
            <FaUsers style={{ marginRight: 8 }} />
            All Admin
          </span>
        ),
        key: "2",
        children: <AlladminDetails />,
      },
    ]}
  />
);

export default AdminPageTabs;
