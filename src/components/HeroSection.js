import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from './shared/ThemeProvider';
import PropTypes from 'prop-types';

import defaultBackground from '../assets/images/sohof-background-image.jpg';

const HeroSection = ({ title, subtitle, customBackground }) => {
    const theme = useTheme();
    const bgImage = customBackground || defaultBackground;

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
                textAlign: 'right',
                direction: 'rtl',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center position-relative">
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
                        <p
                            className="lead mb-0"
                            style={{
                                fontSize: '1.5rem',
                                lineHeight: '1.6',
                                maxWidth: '800px',
                                margin: '0 auto',
                                textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            {subtitle}
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

HeroSection.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    backgroundImage: PropTypes.string
};

HeroSection.defaultProps = {
    subtitle: '',
    backgroundImage: null
};

export default HeroSection;