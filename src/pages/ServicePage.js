import React from 'react';
import Navbar from '../components/shared/Navbar';
import Start from '../components/home/Start';
import Footer from '../components/shared/Footer';
import ServiceComponent from './../components/shared/ServiceComponent';
import BabyHeroSection from '../components/shared/BabyHeroSection';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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

            <div className="text-center my-4">
                <Link to="/">
                    <Button
                        variant="outline-primary"
                        style={{ borderRadius: '25px', padding: '8px 20px' }}
                    >
                        ← العودة للصفحة الرئيسية
                    </Button>
                </Link>
            </div>

            <ServiceComponent />

            <Start />

            <Footer />

        </>
    );
};

export default ServicePage;