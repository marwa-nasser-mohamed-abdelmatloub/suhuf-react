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
                <Row className="align-items-end mb-5 about-academy-row" data-aos="fade-up">
                    <Col
                        md={6}
                        className="mb-4 mb-md-0 about-academy-logo"
                        data-aos="fade-right"
                    >
                        <Logo size="lg" className="floating" />
                    </Col>
                    <Col
                        md={6}
                        className="about-academy-col text-md-end text-center"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <h2
                            className="mb-4 d-inline-block"
                            style={{
                                color: theme.primary,
                                fontWeight: '700',
                                position: 'relative',
                                display: 'inline-block'
                            }}
                        >
                            رسالتنا
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
                                fontWeight: '600',
                                color: theme.text
                            }}
                        >
                            في أكاديمية صحف ، نؤمن أن غرس حب القرآن في قلوب الأطفال هو استثمار أبدي. نقدم برامج تعليمية تجمع بين الأصالة والطرق الحديثة، لنربي جيلًا متمسكًا بكتاب الله.
                        </p>
                        <PrimaryButton
                            href="/courses"
                            className="mt-3 pulse"
                            style={{
                                padding: '12px 30px',
                                fontSize: '1.1rem'
                            }}
                        >
                            اعرف أكثر عنّا
                        </PrimaryButton>
                    </Col>
                </Row>
            </Container>

            <style>{`
                @media (min-width: 992px) {
                    .about-academy-logo {
                        display: flex;
                        justify-content: center;
                        position: relative;
                        left: 80px;
                    }
                }

                @media (max-width: 991.98px) {
                    .about-academy-row {
                        justify-content: center !important;
                        text-align: center !important;
                    }
                    .about-academy-logo {
                        display: flex;
                        justify-content: center !important;
                        position: static;
                        left: auto;
                        right: auto;
                    }
                    .about-academy-col {
                        text-align: center !important;
                        align-items: center !important;
                        justify-content: center !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default AboutAcademySection;
