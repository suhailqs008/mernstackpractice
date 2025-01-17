import React, { useEffect, useState } from "react";
import { Table as AntdTable, Spin, Input, Select } from "antd";
import "../styles/table.css";

const Table = ({
  columns,
  dataSource,
  onPageChange,
  pageSize,
  currentPage,
  isVisble = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const filterStudents = () => {
    let filtered = dataSource;

    if (selectedSession) {
      filtered = filtered.filter(
        (student) => student.session === selectedSession
      );
    }

    if (selectedClass) {
      filtered = filtered.filter((student) => student.class === selectedClass);
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
  }, [selectedSession, selectedClass, searchTerm, dataSource]);

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, filteredStudents.length);

  const sessionOptions = Array.from(
    new Set(dataSource.map((student) => student.session))
  );
  const classOptions = Array.from(
    new Set(dataSource.map((student) => student.class))
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSessionFilterChange = (value) => {
    setSelectedSession(value);
  };

  const handleClassFilterChange = (value) => {
    setSelectedClass(value);
  };

  return (
    <div>
      {isVisble ? (
        <div className="table-header">
          <p>
            Showing {startRecord} to {endRecord} out of{" "}
            {filteredStudents.length} students
          </p>
          Total {filteredStudents.length} students
        </div>
      ) : (
        ""
      )}
      {isVisble ? (
        <div className="class-table-filters-search">
          <div
            style={{ display: "flex", flexDirection: "column", width: "30%" }}
          >
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

          <div
            style={{ display: "flex", flexDirection: "column", width: "30%" }}
          >
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

          <div
            style={{ display: "flex", flexDirection: "column", width: "30%" }}
          >
            <label
              htmlFor="class-select"
              style={{ marginBottom: "8px", fontWeight: "bold" }}
            >
              Filter by Class
            </label>
            <Select
              id="class-select"
              placeholder="Filter by Class"
              value={selectedClass}
              onChange={handleClassFilterChange}
              style={{ marginBottom: 16 }}
            >
              <Select.Option value="">All Classes</Select.Option>
              {classOptions.map((cls) => (
                <Select.Option key={cls} value={cls}>
                  {cls}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      ) : (
        ""
      )}

      <AntdTable
        className="custom-table"
        columns={columns}
        dataSource={filteredStudents.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={{
          showSizeChanger: false,
          pageSize,
          onChange: (page) => onPageChange(page),
          total: filteredStudents.length,
        }}
        scroll={{ y: 400, x: "max-content" }}
      />
    </div>
  );
};

export default Table;
