import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import heroBackground from '../../assets/images/mission.jpg'; 

const BabyHeroSection = ({ title, subtitle, breadcrumb, children }) => {
    const theme = useTheme();

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
                backgroundImage: `url(${heroBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                direction: 'rtl',
                minHeight: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1,
                }}
            />

            <Container style={{ position: 'relative', zIndex: 2 }}>
                <Row className="justify-content-center text-center">
                    <Col lg={10}>
                        <h1
                            className="mb-4 floating"
                            style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                color: theme.light,
                                textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
                                lineHeight: '1.3',
                            }}
                        >
                            {title}
                        </h1>

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

                        {breadcrumb && (
                            <div
                                className="mb-2"
                                style={{
                                    fontSize: '1rem',
                                    color: theme.secondary,
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
                                }}
                            >
                                <Link
                                    to="/"
                                    style={{
                                        color: theme.success,
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        marginLeft: '5px',
                                    }}
                                >
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
};

BabyHeroSection.defaultProps = {
    subtitle: '',
    breadcrumb: '',
};

export default BabyHeroSection;
