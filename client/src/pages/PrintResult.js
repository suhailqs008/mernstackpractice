import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Spin, Table } from "antd";
import axios from "axios";

import { useReactToPrint } from "react-to-print";
import ReportCard from "./StudentResultModel";
const { Search } = Input;

const PrintResult = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const printRef = useRef(null);
  const resultUrl = process.env.REACT_APP_RESULT_URL;

  function capitalizeFirstWord(str) {
    return str.replace(/^\w/, (char) => char.toUpperCase());
  }

  const currentDate = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const indianTime = currentDate.toLocaleString("en-IN", options);

  const handleSearch = async (value) => {
    if (!value) {
      message.warning("Please enter a name to search.");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.get(resultUrl, {
        params: { search: value },
      });
      setAdmissions(response.data);
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

  const handleModalOpen = (record) => {
    setSelectedRow(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: selectedRow?.studentName,
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      fixed: "left",
    },
    {
      title: "Father Name",
      dataIndex: "parentName",
      key: "parentName",
      fixed: "left",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
      fixed: "left",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      fixed: "left",
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateofBirth",
      key: "dateofBirth",
      render: (dob) => {
        const validDob = dayjs(dob);
        return validDob.isValid()
          ? validDob.format("YYYY-MM-DD")
          : "Invalid Date";
      },
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => handleModalOpen(record)}>
            <PrinterOutlined />
            Print Result
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Student</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Search
          placeholder="Enter student name/roll no"
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
          style={{ display: "flex", flexDirection: "column", width: "80px" }}
        >
          <Spin style={{ marginBottom: "10px" }} size="large" />
          Searching......
        </div>
      ) : (
        <>
          {admissions.length > 0 ? (
            <Table
              columns={columns}
              dataSource={admissions}
              rowKey="key"
              bordered
            />
          ) : (
            searched && <h3>No student details found.</h3>
          )}
        </>
      )}

      <Modal
        open={isModalOpen}
        width={700}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
          <Button key="print" type="primary" onClick={printFn}>
            Print
          </Button>,
        ]}
      >
        <div ref={printRef}>
          {selectedRow ? (
            <ReportCard
              selectedRow={selectedRow}
              indianTime={indianTime}
              capitalizeFirstWord={capitalizeFirstWord}
            />
          ) : (
            <p>No record selected for printing.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PrintResult;
