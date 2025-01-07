import React from "react";
import { Row, Col, Card } from "antd";

const Teachers = () => {
  const images = [
    "https://www.teacheracademy.eu/wp-content/uploads/2021/07/Improving_teaching_styles.png",
    "https://gsep.pepperdine.edu/blog/images/how-much-could-a-masters-degree-increase-your-teaching-salary.png",
    "https://rockwoodsinternationalschool.com/auth/uploads/pages/OUBaiDW63S7jkvkzOPyDqKpMb0HtUWED.png",
    "https://classplusapp.com/growth/wp-content/uploads/2022/05/30.jpg",
  ];

  return (
    <div id="teacher-section" style={{ marginBottom: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Our Teachers</h2>
      <Row gutter={[16, 16]}>
        {images.map((src, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              cover={
                <img
                  style={{ height: "250px" }}
                  alt={`gallery-${index}`}
                  src={src}
                />
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Teachers;
