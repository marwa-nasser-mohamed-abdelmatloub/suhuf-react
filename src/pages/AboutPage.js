import React from 'react';
import Navbar from '../components/shared/Navbar';
import BabyHeroSection from '../components/shared/BabyHeroSection';
import AboutSection from '../components/home/AboutSection';
import Start from '../components/home/Start';
import Footer from '../components/shared/Footer';
import AboutCardsSection from '../components/shared/AboutCardsSection';

const AboutPage = () => {
    return (
        <>
            <Navbar />

            <BabyHeroSection
                title="من نحن"
                breadcrumb="من نحن"
                backgroundImage="/path-to-background-image.jpg"
            >
            </BabyHeroSection>

            <AboutSection />
            
            <AboutCardsSection />

            <Start />

            <Footer />

        </>
    );
};

export default AboutPage;