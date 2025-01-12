import React from "react";
import { Layout } from "antd";

import "antd/dist/reset.css";

import Navbar from "../components/Navbar";
import AboutUs from "./About";
import CarouselSection from "./CarouselSection";
import MediaGallery from "./MediaGallery";
import FooterSection from "./FooterSection";
import ScrollingText from "./ScrollingText";
import ContactUs from "./ContactUs";
import Teachers from "./Teachers";
import Goals from "./Goal";
import Home from "./Home";

const { Content } = Layout;

function HomePage() {
  return (
    <Layout id="home-section">
      <Navbar />
      <Content style={{ padding: "20px" }}>
        <ScrollingText text="Admission Open 2024-25" />
        <CarouselSection />
        <AboutUs />
        <MediaGallery />
        <Goals />
        <Teachers />
      </Content>
      <ContactUs />
      <FooterSection />
    </Layout>
  );
}

export default HomePage;
