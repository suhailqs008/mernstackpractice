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

const { Content } = Layout;

function HomePage() {
  return (
    <Layout id="home-section">
      <Navbar />
      <Content style={{ padding: "0px 30px" }}>
        <ScrollingText text="Admission Open 2024-25" />
        <AboutUs />
        <CarouselSection />
        <Goals />
        <Teachers />
        <MediaGallery />
      </Content>
      <ContactUs />
      <FooterSection />
    </Layout>
  );
}

export default HomePage;
