import React from "react";
import "../styles/report-card.css";
const ReportCard = () => {
  return (
    <div className="report-card">
      <header className="header">
        <div className="school-logo">
          <img src="school-logo.png" alt="School Logo" />{" "}
        </div>
        <div className="school-info">
          <h1>YOUR SCHOOL NAME</h1>
          <p>Affiliated to CBSE, Affiliation No. ABCS120</p>
          <p>Kamachha, Varanasi, Uttar Pradesh</p>
          <p>Ph. +91 478 XXX XXX, Email: xyz@email.com</p>
        </div>
        <div className="result-hosting">
          <h2>Result Hosting™</h2>
          <p>Online Web Platform To Host Exam Results Online</p>
        </div>
      </header>

      <main className="main-content">
        <h2>Report Card</h2>
        <p>Class: IX</p>
        <p>Academic Session: 2019-20 Half Yearly</p>
        <div className="student-info">
          <p>
            Student's Name: <span>Aman Kumar</span>
          </p>
          <p>
            Father's Name: <span>Naimesh Mehta</span>
          </p>
          <p>
            Mother's Name: <span>Sheetal Rani</span>
          </p>
          <p>
            Date of Birth: <span>11/11/2001</span>
          </p>
          <p>
            Address: <span>#44, Model Town, Hisar</span>
          </p>
          <p>
            Roll No.: <span>1</span>
          </p>
          <p>
            Admission No.: <span>25445</span>
          </p>
        </div>

        <table className="marks-table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Subjects</th>
              <th>Maximum Marks</th>
              <th>Half Yearly (1)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>English</td>
              <td>10</td>
              <td>7.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Hindi</td>
              <td>10</td>
              <td>6.00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mathematics</td>
              <td>10</td>
              <td>7.00</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Science</td>
              <td>10</td>
              <td>8.00</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Social Studies</td>
              <td>10</td>
              <td>8.00</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Sanskrit</td>
              <td>10</td>
              <td>5.00</td>
            </tr>
            <tr>
              <td colSpan="2">Total</td>
              <td>60</td>
              <td>41.00</td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer className="footer">
        <p>
          Date: <span>09/05/2020</span>
        </p>
        <div className="signatures">
          <p>Class Teacher</p>
          <p>Principal Signature</p>
        </div>
      </footer>
    </div>
  );
};

export default ReportCard;
