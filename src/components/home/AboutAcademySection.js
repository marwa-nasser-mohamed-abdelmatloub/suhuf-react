import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../shared/Logo';
import PrimaryButton from '../shared/PrimaryButton';
import { useTheme } from '../shared/ThemeProvider';

const AboutAcademySection = () => {
    const theme = useTheme();

    return (
        <section style={{ backgroundColor: theme.secondary, padding: '80px 0' }}>
            <Container>
                <Row className="align-items-center mb-5" data-aos="fade-up">

                    {/* الشعار */}
                    <Col md={6} className="mb-4 mb-md-0" data-aos="fade-right">
                        <Logo size="lg" className="mx-auto d-block floating" />
                    </Col>

                    {/* النصوص */}
                    <Col md={6} data-aos="fade-left" data-aos-delay="200">
                        <h2
                            className="mb-4"
                            style={{
                                color: theme.primary,
                                fontWeight: '700',
                                position: 'relative',
                                display: 'inline-block'
                            }}
                        >
                            عن أكاديمية صحف
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: '-10px',
                                    right: '0',
                                    width: '50%',
                                    height: '4px',
                                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.tertiary})`,
                                    borderRadius: '2px'
                                }}
                            ></span>
                        </h2>

                        <p
                            className="lead"
                            style={{
                                lineHeight: '1.8',
                                fontSize: '1.2rem',
                                color: theme.text
                            }}
                        >
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
                            اكتشف دورتنا
                        </PrimaryButton>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutAcademySection;
