import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../services/api';
import CourseList from '../components/CourseList';
import HeroSection from '../components/HeroSection';
import { Container, Alert, Spinner } from 'react-bootstrap';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
                setError(null);
            } catch (error) {
                setError('فشل في تحميل الكورسات. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.');
                console.error('Failed to load courses:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    if (loading) {
        return (
            <Container className="py-5 text-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">جاري التحميل...</span>
                </Spinner>
                <p className="mt-3">جاري تحميل الكورسات...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <HeroSection
                title="كورسات أكاديمية صحف القرآنية"
                subtitle="تعلم الطريقة الصحيحة لتلاوة وحفظ القرآن الكريم مع نخبة من المعلمين المتخصصين"
            />
            <div id="courses" className="fade-in-up">
                <CourseList courses={courses} />
            </div>
        </>
    );
};

export default CoursesPage;