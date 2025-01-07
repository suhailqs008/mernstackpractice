import React from "react";
import { Row, Col, Card } from "antd";

const MediaGallery = () => {
  const images = [
    "https://static.toiimg.com/thumb/msid-103307436,width-1280,height-720,resizemode-4/103307436.jpg",
    "https://www.talibx.com/media/Original/Articles/2022/03/06/6kvMk7iRzzKr2WJu.jpg",
    "https://t3.ftcdn.net/jpg/06/46/90/30/360_F_646903073_HT2f4DQ3DGVmwdYqRBUthp1hR1PmYNXK.jpg",
    "https://t4.ftcdn.net/jpg/04/11/19/61/360_F_411196155_bAztsXMFRSprbiFP8mWtDIG6WNVJCg6d.jpg",
    "https://static.toiimg.com/thumb/msid-103307436,width-1280,height-720,resizemode-4/103307436.jpg",
    "https://www.talibx.com/media/Original/Articles/2022/03/06/6kvMk7iRzzKr2WJu.jpg",
    "https://t3.ftcdn.net/jpg/06/46/90/30/360_F_646903073_HT2f4DQ3DGVmwdYqRBUthp1hR1PmYNXK.jpg",
    "https://t4.ftcdn.net/jpg/04/11/19/61/360_F_411196155_bAztsXMFRSprbiFP8mWtDIG6WNVJCg6d.jpg",
  ];

  return (
    <div id="gallery-section" style={{ marginBottom: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Gallery</h2>
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

export default MediaGallery;
