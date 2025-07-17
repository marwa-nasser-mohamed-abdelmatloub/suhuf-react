import React from 'react';
import HeroSection from '../components/HeroSection';
import { Container, Row, Col } from 'react-bootstrap';
import PrimaryButton from '../components/shared/PrimaryButton';
import Logo from '../components/shared/Logo';

const HomePage = () => {
    return (
        <>
            <HeroSection
                title="أكاديمية صحف للقرآن الكريم"
                subtitle="مركز متخصص في تعليم القرآن الكريم وعلومه بأفضل الطرق التعليمية"
                backgroundImage="/path-to-background-image.jpg"
            />

            <Container className="py-5">
                <Row className="align-items-center mb-5" data-aos="fade-up">
                    <Col md={6} className="mb-4 mb-md-0" data-aos="fade-right">
                        <Logo size="lg" className="mx-auto d-block floating" />
                    </Col>
                    <Col md={6} data-aos="fade-left" data-aos-delay="200">
                        <h2 className="mb-4" style={{
                            color: '#0f5578',
                            fontWeight: '700',
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            عن أكاديمية صحف
                            <span style={{
                                position: 'absolute',
                                bottom: '-10px',
                                right: '0',
                                width: '50%',
                                height: '4px',
                                background: 'linear-gradient(90deg, #0f5578, #0a93b0)',
                                borderRadius: '2px'
                            }}></span>
                        </h2>
                        <p className="lead" style={{
                            lineHeight: '1.8',
                            fontSize: '1.2rem'
                        }}>
                            أكاديمية صحف هي منصة تعليمية متخصصة في تعليم القرآن الكريم وعلومه،
                            نقدم كورسات متخصصة في التجويد، التلاوة، الحفظ، والفهم الصحيح للقرآن الكريم
                            مع نخبة من المعلمين المؤهلين.
                        </p>
                        <PrimaryButton
                            href="/courses"
                            className="mt-3 pulse"
                            style={{
                                padding: '12px 30px',
                                fontSize: '1.1rem'
                            }}
                        >
                            اكتشف كورساتنا
                        </PrimaryButton>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;