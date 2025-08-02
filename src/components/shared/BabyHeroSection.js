import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import defaultBackground from '../../assets/images/sohof-background-image1.jpg';
import secondBackground from '../../assets/images/sohof-background-image2.jpg';

const BabyHeroSection = ({ title, subtitle, breadcrumb, children, background }) => {
    const theme = useTheme();
    const [bgImage, setBgImage] = useState(background || defaultBackground);

    useEffect(() => {
        if (!background) {
            const interval = setInterval(() => {
                setBgImage(prev =>
                    prev === defaultBackground ? secondBackground : defaultBackground
                );
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [background]);

    useEffect(() => {
        const hero = document.querySelector('.baby-hero-section');
        if (hero) {
            const particles = document.createElement('div');
            particles.className = 'particles';
            hero.appendChild(particles);

            return () => hero.contains(particles) && hero.removeChild(particles);
        }
    }, []);

    return (
        <div
            className="baby-hero-section py-5 position-relative overflow-hidden"
            style={{
                color: theme.light,
                backgroundImage: `linear-gradient(rgba(15, 85, 120, 0.85), rgba(15, 85, 120, 0.85)), url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                direction: 'rtl',
                minHeight: '40vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'background-image 1s ease-in-out'
            }}
        >
            <Container>
                <Row className="justify-content-center text-center">
                    <Col lg={10}>
                        {/* العنوان الرئيسي */}
                        <h1
                            className="mb-4 floating"
                            style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                                lineHeight: '1.3'
                            }}
                        >
                            {title}
                        </h1>

                        {/* النصوص الإضافية */}
                        {children && (
                            <div
                                style={{
                                    background: theme.light,
                                    color: theme.text,
                                    borderRadius: '8px',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    display: 'inline-block',
                                    maxWidth: '100%',
                                }}
                            >
                                {children}
                            </div>
                        )}

                        {/* breadcrumb اختيارية */}
                        {breadcrumb && (
                            <div
                                className="mb-2"
                                style={{
                                    fontSize: '1rem',
                                    color: theme.secondary,
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.3)'
                                }}
                            >
                                <Link to="/" style={{
                                    color: theme.tertiary,
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    marginLeft: '5px'
                                }}>
                                    الرئيسية
                                </Link>
                                / {breadcrumb}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

BabyHeroSection.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    breadcrumb: PropTypes.string,
    children: PropTypes.node,
    background: PropTypes.string
};

BabyHeroSection.defaultProps = {
    subtitle: '',
    breadcrumb: '',
    background: null
};

export default BabyHeroSection;
