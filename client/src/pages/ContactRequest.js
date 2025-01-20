import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactRequest = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const url = process.env.REACT_APP_CONTACT_URL;

  const fetchContactDetails = async () => {
    try {
      const response = await axios.get(url);

      setContact(response.data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      fixed: "left",
      width: 60,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div>
      <h1>Contact Request Table</h1>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>Loading...</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={contact.map((item) => ({
            key: item._id,
            ...item,
          }))}
          pagination={{
            current: currentPage,
            pageSize,
            total: contact.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      )}
    </div>
  );
};

export default ContactRequest;
