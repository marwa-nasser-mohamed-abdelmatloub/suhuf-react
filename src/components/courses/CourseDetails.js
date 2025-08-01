import React from 'react';
import { Container, Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import PrimaryButton from '../shared/PrimaryButton';
import AnimatedTitle from '../shared/AnimatedTitle';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // [REHAB] استخدم SweetAlert2

const CourseDetails = ({ course }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const getLevelBadgeVariant = (level) => {
        switch (level) {
            case 'beginner':
                return 'success';
            case 'intermediate':
                return 'warning';
            case 'advanced':
                return 'danger';
            default:
                return 'primary';
        }
    };

    const getLevelText = (level) => {
        switch (level) {
            case 'beginner':
                return 'مبتدئ';
            case 'intermediate':
                return 'متوسط';
            case 'advanced':
                return 'متقدم';
            default:
                return level;
        }
    };

    const handleBooking = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: { pathname: `/courses/${course.id}` } } });
        } else {
            // [REHAB] استخدم SweetAlert2 بدلاً من alert
            Swal.fire({
                title: 'قريباً!',
                text: 'سيتم إضافة منطق الحجز قريباً!',
                icon: 'info',
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#8e24aa'
            });
        }
    };

    if (!course) {
        return (
            <Container className="py-5 text-center">
                <p>لا تتوفر بيانات للدورة.</p>
            </Container>
        );
    }

    return (
        <Container className="py-5 course-details" data-aos="fade-in">
            <div className="text-center mb-4">
                <Link to="/courses">
                    <Button 
                        variant="outline-primary" 
                        style={{ borderRadius: '25px', padding: '8px 20px' }}
                    >
                        ← العودة لصفحة الكورسات
                    </Button>
                </Link>
            </div>
            
            <Card className="shadow-lg" style={{
                border: 'none',
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.5s ease'
            }}>
                {course.image && (
                    <Card.Img 
                        variant="top" 
                        src={course.image} 
                        alt={course.title}
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                )}
                <Card.Body>
                    <Row>
                        <Col md={8} data-aos="fade-right">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <AnimatedTitle level={2} style={{ marginBottom: '0', flex: 1 }}>
                                    {course.title}
                                </AnimatedTitle>
                                <Badge 
                                    bg={getLevelBadgeVariant(course.level)}
                                    className="ms-3"
                                    style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                                >
                                    {getLevelText(course.level)}
                                </Badge>
                            </div>
                            
                            <p className="text-muted" style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                transition: 'all 0.3s ease'
                            }}>
                                {course.description}
                            </p>
                            
                            <div className="course-info mt-4">
                                <Row>
                                    {course.instructor && (
                                        <Col md={6} className="mb-3">
                                            <div className="info-item">
                                                <strong>المدرب:</strong> {course.instructor}
                                            </div>
                                        </Col>
                                    )}
                                    {course.duration && (
                                        <Col md={6} className="mb-3">
                                            <div className="info-item">
                                                <strong>المدة:</strong> {course.duration}
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </div>
                            
                            <div className="course-meta mt-4">
                                <Badge
                                    pill
                                    className="pulse"
                                    style={{
                                        backgroundColor: theme.tertiary,
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        padding: '10px 20px',
                                        marginLeft: '10px'
                                    }}
                                >
                                    السعر: {course.price} ريال
                                </Badge>
                                <Badge
                                    pill
                                    style={{
                                        backgroundColor: theme.tertiary,
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        padding: '8px 15px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.backgroundColor = theme.accent;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.backgroundColor = theme.tertiary;
                                    }}
                                >
                                    تاريخ الإنشاء: {new Date(course.created_at).toLocaleDateString('ar-SA')}
                                </Badge>
                            </div>
                        </Col>
                        <Col md={4} data-aos="fade-left" data-aos-delay="200">
                            <Card className="border-0 shadow-sm floating" style={{
                                borderRadius: '15px',
                                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.tertiary} 100%)`,
                                color: 'white'
                            }}>
                                <Card.Body className="text-center">
                                    <h5 style={{ color: 'white' }}>سجل الآن</h5>
                                    <PrimaryButton
                                        className="w-100 mt-3 pulse"
                                        style={{
                                            padding: '12px',
                                            backgroundColor: theme.accent,
                                            borderColor: theme.accent
                                        }}
                                        onClick={handleBooking}
                                    >
                                        انضم إلى الدورة
                                    </PrimaryButton>
                                    <div className="mt-4">
                                        <p style={{ fontWeight: '600', color: 'white' }}>للتواصل:</p>
                                        <PrimaryButton
                                            variant="outline-light"
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderColor: 'white',
                                                color: 'white',
                                                width: '100%',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            +02 01080290663
                                        </PrimaryButton>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CourseDetails;