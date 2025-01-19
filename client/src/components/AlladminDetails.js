import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import { Button, Popconfirm, message, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlladminDetails = ({ dataUpdated }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const url = process.env.REACT_APP_ALL_ADMIN_URL;

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(url);
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [dataUpdated]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      toast.success("Record Deleted Succesfully!");
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
      message.error("Failed to delete admin.");
    }
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Popconfirm
            title="Are you sure to delete this admin?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="heading">Admin List</h1>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>Loading...</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={admins.map((admin) => ({
            key: admin._id,
            ...admin,
          }))}
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          pageSize={pageSize}
          totalRecord={admins.length}
          isVisble={false}
        />
      )}
    </div>
  );
};

export default AlladminDetails;
