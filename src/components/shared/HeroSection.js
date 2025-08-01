import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import PrimaryButton from './PrimaryButton';
import PropTypes from 'prop-types';

import defaultBackground from '../../assets/images/sohof-background-image1.jpg';
import secondBackground from '../../assets/images/sohof-background-image2.jpg';

const HeroSection = ({ title, subtitle }) => {
    const theme = useTheme();
    const [bgImage, setBgImage] = useState(defaultBackground);

    useEffect(() => {
        const interval = setInterval(() => {
            setBgImage((prev) =>
                prev === defaultBackground ? secondBackground : defaultBackground
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const particles = document.createElement('div');
            particles.className = 'particles';
            hero.appendChild(particles);

            return () => hero.contains(particles) && hero.removeChild(particles);
        }
    }, []);

    return (
        <div
            className="hero-section py-5 position-relative overflow-hidden"
            style={{
                color: theme.light,
                backgroundImage: `linear-gradient(rgba(15, 85, 120, 0.85), rgba(15, 85, 120, 0.85)), url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                direction: 'rtl',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'right',
                transition: 'background-image 1s ease-in-out'
            }}
        >
            <Container>
                <Row>
                    <Col lg={8} className="text-end position-relative ms-auto">
                        <p
                            className="mb-2"
                            style={{
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: theme.light,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <span style={{ color: theme.primary, marginLeft: '10px', fontWeight: 'bold', fontSize: '2.2rem', lineHeight: '1', display: 'inline-block' }}>|</span>
                            <span style={{ flex: 1 }}>أكاديمية القرآن الكريم عبر الإنترنت</span>
                        </p>

                        <h1
                            className="mb-4 floating"
                            style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                                lineHeight: '1.3',
                                textAlign: 'right'
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            className="lead mb-4"
                            style={{
                                fontSize: '1.5rem',
                                lineHeight: '1.6',
                                maxWidth: '800px',
                                textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
                                textAlign: 'right'
                            }}
                        >
                            {subtitle}
                        </p>

                        {/* الزرين مباشرة تحت الكلام */}
                        <div className="d-flex flex-column flex-sm-row justify-content-start align-items-center gap-3 mt-3 w-100" style={{ textAlign: 'right' }}>
                            <PrimaryButton
                                href="/booking"
                                className="pulse"
                                style={{
                                    padding: '12px 30px',
                                    fontSize: '1.1rem',
                                    minWidth: '160px'
                                }}
                            >
                                احجز كورس
                            </PrimaryButton>
                            <PrimaryButton
                                href="/contact"
                                className="pulse"
                                style={{
                                    padding: '12px 30px',
                                    fontSize: '1.1rem',
                                    minWidth: '160px'
                                }}
                            >
                                اتصل بنا
                            </PrimaryButton>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

HeroSection.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

HeroSection.defaultProps = {
    subtitle: ''
};

export default HeroSection;
