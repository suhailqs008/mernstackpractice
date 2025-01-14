import React from "react";
import "../styles/receipt.css";
import logo from "../assets/schoollogo.png";

const FeesReceiptModal = ({ selectedRow, indianTime, capitalizeFirstWord }) => {
  return (
    <div className="receipt-container">
      <div className="header">
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        </div>
        <div className="school-details">
          <h1>APNA SCHOOL SHAHABAD,HARDOI</h1>
          <p>English/HINDI Medium School </p>
          <p>Shahabad, Hardoi, Uttar Pradesh-241124.</p>
          <p>Phone No.: 0265-2316677</p>
        </div>
        <div className="receipt-label">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        </div>
      </div>
      <div className="student-details">
        <div className="fees-details">
          <p>
            <strong>Student Name:</strong> {selectedRow.studentName}
          </p>
          <p>
            <strong>Father Name:</strong> {selectedRow.parentName}
          </p>
          <p>
            <strong>Session:</strong> {selectedRow.session}
          </p>
        </div>
        <div className="fees-details">
          <p>
            <p>
              <strong>Payment Date:</strong>{" "}
              {new Date(selectedRow.date).toLocaleDateString()}
            </p>
          </p>
          <p>
            <strong>Amount:</strong> {selectedRow.amount}
          </p>
          <p>
            <strong>Month:</strong> {selectedRow.month}
          </p>
        </div>
        <div className="fees-details">
          <p>
            <strong>Payment Method:{selectedRow.paymentMethod}</strong>
          </p>
          <p>
            <strong>
              Roll Number:-
              {selectedRow.rollNumber ? selectedRow.rollNumber : "--"}
            </strong>
          </p>
          <p>
            <strong>{capitalizeFirstWord(selectedRow.class)}</strong>
          </p>
        </div>
      </div>
      <table className="fee-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Particulars</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Monthly Fees</td>
            <td>{selectedRow.amount}</td>
          </tr>
        </tbody>
      </table>
      <div className="total-section">
        <p>
          <strong>Total Amount:</strong> Rs. {selectedRow.amount}
        </p>
      </div>
      <div className="remarks">
        <p>Fees Amount once paid will not be refundable or transferable.</p>
      </div>
      <div className="footer">
        <p>
          <strong>Payment Date:</strong>{" "}
          {new Date(selectedRow.date).toLocaleDateString()}
        </p>

        <p>
          <strong>Sign:</strong> _______________________
        </p>
      </div>
      <p style={{ fontSize: "10px" }}> {indianTime}</p>
    </div>
  );
};

export default FeesReceiptModal;
