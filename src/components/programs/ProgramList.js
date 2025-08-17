import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProgramCard from './ProgramCard';
import AnimatedTitle from '../shared/AnimatedTitle';

const ProgramList = ({ programs }) => {
    return (
        <Container className="section fade-in">
            <AnimatedTitle level={2} className="text-center my-5" style={{ fontSize: '2.4rem', fontWeight: 900 }}>
                برامجنا التعليمية
            </AnimatedTitle>
            <Row>
                {programs.map((program, idx) => (
                    <Col key={program.id} md={4} className="mb-5 program-list-col">
                        <ProgramCard program={program} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProgramList;