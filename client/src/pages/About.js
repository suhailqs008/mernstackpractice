import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <>
      <Card
        id="about-section"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <h1 level={2}>About Us</h1>
        <div>
          Welcome to [Your School Name], where education meets inspiration, and
          every student’s potential is nurtured to flourish. Our institution
          stands as a beacon of learning, growth, and holistic development,
          committed to shaping the leaders and innovators of tomorrow. At [Your
          School Name], we believe that education extends beyond textbooks and
          classrooms. It’s about igniting curiosity, fostering creativity, and
          building a foundation of strong values that empower students to excel
          in every aspect of life. Through a well-rounded curriculum,
          state-of-the-art facilities, and an experienced faculty, we strive to
          create an environment where every child feels valued, inspired, and
          ready to achieve their dreams.
        </div>
      </Card>
    </>
  );
};

export default AboutUs;
