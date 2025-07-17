import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import CourseCard from './CourseCard';
import AnimatedTitle from './shared/AnimatedTitle';

const CourseList = ({ courses }) => {
    return (
        <Container className="section fade-in">
            <AnimatedTitle level={2} className="text-center my-5" style={{ fontSize: '2.4rem', fontWeight: 900 }}>
                كورساتنا التعليمية
            </AnimatedTitle>
            <Row>
                {courses.map((course, idx) => (
                    <Col key={course.id} md={4} className="mb-5 course-list-col">
                        <CourseCard course={course} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CourseList;