import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/api';
import CourseDetails from '../components/courses/CourseDetails';
import { Container, Spinner, Alert } from 'react-bootstrap';

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
            <Container className="py-5 text-center fade-in-up">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">جاري التحميل...</span>
                </Spinner>
                <p>جاري تحميل تفاصيل الدورة...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5 fade-in-up">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container className="py-5 text-center fade-in-up">
                <Alert variant="warning">
                    لم يتم العثور على الدورة المطلوبة.
                </Alert>
            </Container>
        );
    }

    return <CourseDetails course={course} />;
};

export default CourseDetailPage;