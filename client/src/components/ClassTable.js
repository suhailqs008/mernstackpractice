import React, { useEffect, useState } from "react";
import { Table as AntdTable, Spin, Input, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";

import "../styles/classTable.css";
const ClassTable = ({ classId, pageSize = 10, url }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`${url}/class/class-${classId}`);
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId, url]);

  const handleSessionFilterChange = (value) => {
    setSelectedSession(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterStudents = () => {
    let filtered = students;

    if (selectedSession) {
      filtered = filtered.filter(
        (student) => student.session === selectedSession
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((student) =>
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  useEffect(() => {
    filterStudents();
  }, [selectedSession, searchTerm, students]);

  const sessionOptions = Array.from(
    new Set(students.map((student) => student.session))
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      fixed: "left",
      width: 80,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      fixed: "left",
      width: 100,
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
      title: "Class Name",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Session Name",
      dataIndex: "session",
      key: "session",
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
      title: "Aadhar Number",
      dataIndex: "aadharNumber",
      key: "aadharNumber",
    },
    {
      title: "Pan Number",
      dataIndex: "panNumber",
      key: "panNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Admission Date",
      dataIndex: "admissionDate",
      key: "admissionDate",
      render: (admissionDate) => new Date(admissionDate).toLocaleDateString(),
    },
  ];

  const startRecord =
    filteredStudents.length > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endRecord =
    filteredStudents.length > 0
      ? Math.min(currentPage * pageSize, filteredStudents.length)
      : 0;

  return (
    <div>
      <div className="table-header">
        {filteredStudents.length > 0 ? (
          <p>
            Showing {startRecord} to {endRecord} out of{" "}
            {filteredStudents.length} students
          </p>
        ) : (
          <p>No records available</p>
        )}
        <p>Total {filteredStudents.length} students</p>
      </div>

      <div className="class-table-filters-search">
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label
            htmlFor="search-input"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            Search by Student Name
          </label>
          <Input
            id="search-input"
            placeholder="Search by Student Name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: 16 }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label
            htmlFor="session-select"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            Filter by Session
          </label>
          <Select
            id="session-select"
            placeholder="Filter by Session"
            value={selectedSession}
            onChange={handleSessionFilterChange}
            style={{ marginBottom: 16 }}
          >
            <Select.Option value="">All Sessions</Select.Option>
            {sessionOptions.map((session) => (
              <Select.Option key={session} value={session}>
                {session}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Spin size="large" />
          Please Wait Loading....
        </div>
      ) : (
        <AntdTable
          columns={columns}
          dataSource={filteredStudents.map((student) => ({
            key: student._id,
            ...student,
          }))}
          pagination={{
            current: currentPage,
            showSizeChanger: false,

            pageSize: pageSize,
            total: filteredStudents.length,
            onChange: (page) => setCurrentPage(page),
          }}
          scroll={{ y: 400, x: "max-content" }}
        />
      )}
    </div>
  );
};

export default ClassTable;
