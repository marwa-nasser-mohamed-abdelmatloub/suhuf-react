import React from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { useTheme } from './shared/ThemeProvider';
import PrimaryButton from './shared/PrimaryButton';
import AnimatedTitle from './shared/AnimatedTitle';

const CourseDetails = ({ course }) => {
    const theme = useTheme();

    if (!course) {
        return (
            <Container className="py-5 text-center">
                <p>لا تتوفر بيانات للدورة.</p>
            </Container>
        );
    }

    return (
        <Container className="py-5 course-details" data-aos="fade-in">
            <Card className="shadow-lg" style={{
                border: 'none',
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.5s ease'
            }}>
                <Card.Body>
                    <Row>
                        <Col md={8} data-aos="fade-right">
                            <AnimatedTitle level={2} style={{ marginBottom: '20px' }}>
                                {course.title}
                            </AnimatedTitle>
                            <p className="text-muted" style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                transition: 'all 0.3s ease'
                            }}>
                                {course.description}
                            </p>
                            <div className="course-meta mt-4">
                                <Badge
                                    pill
                                    className="pulse"
                                    style={{
                                        backgroundColor: theme.tertiary,
                                        color: 'white',
                                        fontSize: '1rem',
                                        padding: '8px 15px',
                                        marginLeft: '10px'
                                    }}
                                >
                                    السعر: {course.price}
                                </Badge>
                                <Badge
                                    pill
                                    style={{
                                        backgroundColor: theme.tertiary,
                                        color: 'white',
                                        fontSize: '1rem',
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
                                    تاريخ الإنشاء: {new Date(course.created_at).toLocaleDateString()}
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