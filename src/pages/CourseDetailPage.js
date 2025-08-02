import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/api';
import CourseDetails from '../components/courses/CourseDetails';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import BabyHeroSection from '../components/shared/BabyHeroSection';
import { Spinner, Alert, Button } from 'react-bootstrap';
import backgroundImage from '../assets/images/sohof-background-image1.jpg';

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourseDetails = async () => {
            try {
                const data = await fetchCourseDetails(id);
                setCourse(data);
                setError(null);
            } catch (error) {
                setError('فشل في تحميل تفاصيل الدورة. يرجى المحاولة مرة أخرى.');
                console.error('Failed to load course details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCourseDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="text-center fade-in-up">
                    <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem', color: '#0f5578' }}>
                        <span className="visually-hidden">جاري التحميل...</span>
                    </Spinner>
                    <h5 className="mt-4" style={{ color: '#0f5578' }}>جاري تحميل تفاصيل الدورة...</h5>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Alert variant="danger" className="text-center w-100" style={{ maxWidth: '600px' }}>
                    <div className="mb-3">
                        <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                    </div>
                    <h5>{error}</h5>
                    <Button
                        variant="outline-danger"
                        onClick={() => window.location.reload()}
                        className="mt-3"
                        style={{ borderRadius: '20px', padding: '6px 20px' }}
                    >
                        إعادة المحاولة
                    </Button>
                </Alert>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Alert variant="warning" className="text-center w-100" style={{ maxWidth: '600px' }}>
                    <div className="mb-3">
                        <i className="bi bi-info-circle-fill" style={{ fontSize: '2rem', color: '#ffc107' }}></i>
                    </div>
                    <h5>لم يتم العثور على الدورة المطلوبة.</h5>
                </Alert>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <BabyHeroSection
                title="الدورات"
                breadcrumb="تفاصيل الدورة"
                background={backgroundImage}
            />

            <CourseDetails course={course} />

            <Footer />
        </>
    );
};

export default CourseDetailPage;
