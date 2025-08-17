import React from "react";
import Navbar from "../components/shared/Navbar";
import BabyHeroSection from "../components/shared/BabyHeroSection";
import AboutSection from "../components/home/AboutSection";
import Start from "../components/home/Start";
import Footer from "../components/shared/Footer";
import AboutCardsSection from "../components/shared/AboutCardsSection";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AboutPage = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Navbar />

        <BabyHeroSection
          title="من نحن"
          breadcrumb="من نحن"
          backgroundImage="/path-to-background-image.jpg"
        ></BabyHeroSection>

        <div className="text-center my-4">
          <Link to="/">
            <Button
              variant="outline-primary"
              style={{ borderRadius: "25px", padding: "8px 20px" }}
            >
              ← العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>

        <AboutSection />

        <AboutCardsSection />

        <Start />

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
