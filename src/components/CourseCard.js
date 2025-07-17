import React from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from './shared/ThemeProvider';
import PrimaryButton from './shared/PrimaryButton';
import AnimatedTitle from './shared/AnimatedTitle';

const CourseCard = ({ course }) => {
    const theme = useTheme();

    return (
        <Card
            className="mb-4 shadow-sm course-card"
            style={{
                height: '100%',
                transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                border: 'none',
                borderRadius: '15px',
                overflow: 'hidden',
                position: 'relative',
                '--hover-color': theme.primary
            }}
            data-aos="fade-up"
            data-aos-delay={course.id % 3 * 100}
        >
            <div className="course-card-overlay"></div>
            <Card.Body className="d-flex flex-column position-relative" style={{ zIndex: 2 }}>
                <AnimatedTitle level={5} style={{ marginBottom: '15px' }}>
                    {course.title}
                </AnimatedTitle>
                <Card.Text className="text-muted" style={{ flex: 1 }}>
                    {course.description}
                </Card.Text>
                <Card.Text
                    className="text-muted course-price"
                    style={{
                        fontWeight: '600',
                        color: theme.accent,
                        transition: 'all 0.3s ease'
                    }}
                >
                    السعر: {course.price}
                </Card.Text>
                <div className="mt-auto">
                    <PrimaryButton
                        href={`/courses/${course.id}`}
                        style={{ width: '100%' }}
                        className="course-card-button"
                    >
                        عرض التفاصيل
                    </PrimaryButton>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;