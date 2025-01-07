import React, { useState } from "react";
import { Button, Flex, Input, Spin, Table, message } from "antd";
import axios from "axios";
const { Search } = Input;

const AdmissionSearch = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false);
  const url = process.env.REACT_APP_ADMISSION_URL;

  const handleSearch = async (value) => {
    if (!value) {
      message.warning("Please enter a name to search.");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.get(url, {
        params: { search: value },
      });
      setAdmissions(response.data);
      console.log(response.data, "response");
    } catch (error) {
      message.error("Failed to fetch admissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAdmissions([]);
    setSearchValue("");
    setSearched(false);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Admission Date",
      dataIndex: "admissionDate",
      key: "admissionDate",
    },
    {
      title: "Parent Name",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Student</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Search
          placeholder="Enter student name"
          enterButton="Search"
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: "400px" }}
        />
        <Button onClick={handleReset} type="primary" size="large">
          Reset
        </Button>
      </div>

      {loading ? (
        <div
          style={{
            width: "30%",
            padding: "10px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Spin size="large"></Spin>
          <h3 style={{ marginTop: "10px" }}>Searching...</h3>
        </div>
      ) : (
        <>
          {admissions.length > 0 ? (
            <Table
              columns={columns}
              dataSource={admissions}
              rowKey="_id"
              bordered
            />
          ) : (
            searched && (
              <h1 style={{ textAlign: "left" }}>Student details not found</h1>
            )
          )}
        </>
      )}
    </div>
  );
};

export default AdmissionSearch;
