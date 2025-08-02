import React from 'react';
import Navbar from '../components/shared/Navbar';
import BabyHeroSection from '../components/shared/BabyHeroSection';
import Start from '../components/home/Start';
import Footer from '../components/shared/Footer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ContactUs from './../components/shared/ContactUs';

const ContactPage = () => {
    return (
        <>
            <Navbar />

            <BabyHeroSection
                title="اتصل بنا"
                breadcrumb="اتصل بنا"
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

            <ContactUs />

            <Start />

            <Footer />

        </>
    );
};

export default ContactPage;