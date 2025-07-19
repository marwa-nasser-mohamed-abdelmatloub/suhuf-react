import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useTheme } from './shared/ThemeProvider';
import PrimaryButton from './shared/PrimaryButton';
import AnimatedTitle from './shared/AnimatedTitle';

const CourseCard = ({ course }) => {
    const theme = useTheme();

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
            {course.image && (
                <Card.Img 
                    variant="top" 
                    src={course.image} 
                    alt={course.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            )}
            <div className="course-card-overlay"></div>
            <Card.Body className="d-flex flex-column position-relative" style={{ zIndex: 2 }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <AnimatedTitle level={5} style={{ marginBottom: '0', flex: 1 }}>
                        {course.title}
                    </AnimatedTitle>
                    <Badge 
                        bg={getLevelBadgeVariant(course.level)}
                        className="ms-2"
                        style={{ fontSize: '0.7rem' }}
                    >
                        {getLevelText(course.level)}
                    </Badge>
                </div>
                
                <Card.Text className="text-muted" style={{ flex: 1, fontSize: '0.9rem' }}>
                    {course.description.length > 120 
                        ? `${course.description.substring(0, 120)}...` 
                        : course.description
                    }
                </Card.Text>
                
                <div className="course-info mb-3">
                    {course.instructor && (
                        <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
                            <strong>المدرب:</strong> {course.instructor}
                        </div>
                    )}
                    {course.duration && (
                        <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
                            <strong>المدة:</strong> {course.duration}
                        </div>
                    )}
                </div>
                
                <Card.Text
                    className="text-muted course-price"
                    style={{
                        fontWeight: '600',
                        color: theme.accent,
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem'
                    }}
                >
                    السعر: {course.price} جنيه مصري
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