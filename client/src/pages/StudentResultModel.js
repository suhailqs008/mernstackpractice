import React from "react";
import "../styles/report-card.css";
import logo from "../assets/logo.jpg";

const ReportCard = ({ selectedRow, indianTime }) => {
  const totalMarks = Object.values(selectedRow.marks || {}).reduce(
    (total, marks) => total + (marks || 0),
    0
  );

  const percentage = ((totalMarks / 600) * 100).toFixed(2);

  let remarks = "";
  if (percentage < 33) {
    remarks = "Failed";
  } else if (percentage >= 33 && percentage < 40) {
    remarks = "Third Division";
  } else if (percentage >= 40 && percentage < 60) {
    remarks = "Second Division";
  } else {
    remarks = "First Division";
  }

  const resultColor = percentage < 33 ? "black" : "green";

  return (
    <div className="report-card">
      <header className="header">
        <img src={logo} alt="School Logo" className="school-logo" />
        <div className="header-text">
          <h1>Result Hosting ™</h1>
          <p>
            Online Web Platform To Host Exam Results Online <br />
            Display Your School, University Exam Results Online
          </p>
        </div>
        <img src={logo} alt="School Logo" className="school-logo" />
      </header>

      <h2 className="school-name">APNA SCHOOL SHAHABAD, HARDOI</h2>
      <p className="affiliation">
        Affiliated to CBSE, Affiliation No. ABCS120 <br />
        Kamachha, Varanasi, Uttar Pradesh <br />
        Ph. +91 478 XXX XXX, Email: xyz@email.com
      </p>

      <h3 className="report-title">
        <span className="report"> Report Card</span>
        <br />
        Class : {selectedRow.class} <br />
        Academic Session: {selectedRow.session} Yearly
      </h3>

      <div className="student-details">
        <div>
          <p>
            Student's Name: <strong>{selectedRow.studentName}</strong>
          </p>
          <p>
            Father's Name: <strong>{selectedRow.parentName}</strong>
          </p>
          <p>
            Date of Birth:{" "}
            <strong>{selectedRow.dateOfBirth?.slice(0, 10)}</strong>
          </p>
        </div>
        <div className="roll-info">
          <p>
            Roll Number: <strong>{selectedRow.rollNumber}</strong>
          </p>
        </div>
      </div>

      <table className="marks-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Subjects</th>
            <th>Half Yearly</th>
            <th>Maximum Marks (100)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>English</td>
            <td>{selectedRow.marks?.english || 0}</td>
            <td>100</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Hindi</td>
            <td>{selectedRow.marks?.hindi || 0}</td>
            <td>100</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mathematics</td>
            <td>{selectedRow.marks?.mathematics || 0}</td>
            <td>100</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Science</td>
            <td>{selectedRow.marks?.science || 0}</td>
            <td>100</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Social Studies</td>
            <td>{selectedRow.marks?.socialstudies || 0}</td>
            <td>100</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Sports</td>
            <td>{selectedRow.marks?.sports || 0}</td>
            <td>100</td>
          </tr>
          <tr>
            <td colSpan="2">
              <strong>Total</strong>
            </td>
            <td>
              <strong>{totalMarks}</strong>
            </td>
            <td>600</td>
          </tr>
        </tbody>
      </table>

      <h1>Remarks:</h1>
      <p
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          color: resultColor,
        }}
      >
        <span>
          Result Status: <strong>{remarks}</strong>
        </span>
        <span>
          Percentage: <strong>{percentage}%</strong>
        </span>
      </p>

      <footer className="footer">
        <p style={{ fontSize: "10px" }}>{indianTime}</p>
        <p>Class Teacher</p>
        <p>Principal Signature</p>
      </footer>
    </div>
  );
};

export default ReportCard;
