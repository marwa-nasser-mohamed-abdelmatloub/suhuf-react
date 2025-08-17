import React from 'react';
import Navbar from '../components/shared/Navbar';
import HeroSection from '../components/shared/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
// import StatsSection from '../components/home/StatsSection';
import StepsSection from '../components/home/StepsSection';
import AboutAcademySection from '../components/home/AboutAcademySection';
import Start from '../components/home/Start';
import Footer from '../components/shared/Footer';
import ParentsFeedbackSection from '../components/home/ParentsFeedbackSection';

const HomePage = () => {
    return (
        <>
            <Navbar />

            <HeroSection
                title="أكاديمية صحف للقرآن الكريم"
                subtitle="مركز متخصص في تعليم القرآن الكريم وعلومه بأفضل الطرق التعليمية"
                backgroundImage="/path-to-background-image.jpg"
            />

            <AboutAcademySection />
            <FeaturesSection />
            <AboutSection />
            <ServicesSection />
            {/* <StatsSection /> */}
            <StepsSection />
            <ParentsFeedbackSection />
            <Start />
            <Footer />

            <style>{`
                body, #root {
                    overflow-x: hidden !important;
                    background: #fff !important;
                }
            `}</style>
        </>
    );
};

export default HomePage;