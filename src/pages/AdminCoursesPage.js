import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/admin/Sidebar';
import CoursesTable from '../components/admin/CoursesTable';
import { fetchCourses, createCourse, updateCourse } from '../services/api';
import { useTheme } from '../components/shared/ThemeProvider';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatCard from '../components/admin/StatCard';

const AdminCoursesPage = () => {
    const theme = useTheme();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadCourses = async () => {
        try {
            setLoading(true);
            const data = await fetchCourses();
            setCourses(data);
            setError('');
        } catch (err) {
            setError(err.message || 'فشل في تحميل الكورسات');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCourse = async (courseData) => {
        try {
            await createCourse(courseData);
            await loadCourses();
        } catch (err) {
            setError(err.message || 'فشل في إنشاء الكورس');
        }
    };

    const handleUpdateCourse = async (courseData) => {
        try {
            await updateCourse(courseData.id, courseData);
            await loadCourses();
        } catch (err) {
            setError(err.message || 'فشل في تحديث الكورس');
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const getLevelCount = (level) => {
        return courses.filter(c => c.level === level).length;
    };

    return (
        <div className="admin-dashboard-wrapper" style={{ minHeight: '100vh', background: theme.secondary, overflowX: 'hidden' }}>
            <div className="d-flex flex-column flex-md-row">
                <Sidebar />
                <div className="flex-grow-1 w-100">
                    <AdminNavbar />
                    <Container fluid className="p-2 p-md-4" style={{ minHeight: '100vh' }}>
                        <h2 className="mb-4 fw-bold" style={{ color: theme.primary, fontSize: '1.5rem' }}>
                            <i className="fas fa-book ms-2"></i>
                            إدارة الكورسات
                        </h2>

                        {error && (
                            <Alert variant="danger" onClose={() => setError('')} dismissible>
                                {error}
                            </Alert>
                        )}

                        <Row className="mb-4 g-3 g-md-4">
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="إجمالي الكورسات"
                                    value={courses.length}
                                    color={theme.primary}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="كورسات المبتدئين"
                                    value={getLevelCount('beginner')}
                                    color={theme.success}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="كورسات المتوسطين"
                                    value={getLevelCount('intermediate')}
                                    color={theme.warning}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="كورسات المتقدمين"
                                    value={getLevelCount('advanced')}
                                    color={theme.danger}
                                />
                            </Col>
                        </Row>

                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" />
                                <div>جاري تحميل الكورسات...</div>
                            </div>
                        ) : (
                            <CoursesTable
                                courses={courses}
                                refreshCourses={loadCourses}
                                onCreate={handleCreateCourse}
                                onUpdate={handleUpdateCourse}
                            />
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default AdminCoursesPage;
