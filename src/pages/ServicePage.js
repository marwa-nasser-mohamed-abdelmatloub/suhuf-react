import React from 'react';
import Navbar from '../components/shared/Navbar';
import Start from '../components/home/Start';
import Footer from '../components/shared/Footer';
import ServiceComponent from './../components/shared/ServiceComponent';
import BabyHeroSection from '../components/shared/BabyHeroSection';

const ServicePage = () => {
    return (
        <>
            <Navbar />

            <BabyHeroSection
                title="الخدمات"
                breadcrumb="الخدمات"
                backgroundImage="/path-to-background-image.jpg"
            >
            </BabyHeroSection>

            <ServiceComponent />

            <Start />

            <Footer />

        </>
    );
};

export default ServicePage;