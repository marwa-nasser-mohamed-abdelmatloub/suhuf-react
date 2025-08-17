import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import PropTypes from 'prop-types';

import img1 from '../../assets/images/slider1.jpg';
import img2 from '../../assets/images/slider2.jpg';
import img3 from '../../assets/images/slider3.jpg';
import img4 from '../../assets/images/slider4.jpg';
import img5 from '../../assets/images/slider5.jpg';
import img6 from '../../assets/images/slider6.jpg';
import img7 from '../../assets/images/slider7.jpg';

const HeroSection = () => {
    const theme = useTheme();

    const slides = [
        { image: img1, title: 'اجعل أول خطوة لطفلك نحو القرآن هنا' },
        { image: img2, title: 'معًا نربي جيلًا يعتز بكتاب الله' },
        { image: img3, title: 'ابدأ رحلة طفلك مع كلام الله اليوم' },
        { image: img4, title: 'لك تاج الوقار… حين تحفظ ابنك القرآن' },
        { image: img5, title: '﴿وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ﴾' },
        { image: img6, title: 'لك تاج الوقار… حين تحفظ ابنك القرآن' },
        { image: img7, title: 'اجعل ابنك سببًا لتاج الوقار يوم القيامة' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div
            className="hero-section position-relative overflow-hidden"
            style={{
                color: theme.light,
                backgroundImage: `url(${slides[currentIndex].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                direction: 'rtl',
                minHeight: '92vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '150px',
                textAlign: 'center',
                transition: 'background-image 1s ease-in-out',
                position: 'relative'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1
                }}
            ></div>

            <Container style={{ position: 'relative', zIndex: 2 }}>
                <Row className="justify-content-center">
                    <Col lg={8} style={{ textAlign: 'center' }}>
                        <h1
                            className="floating"
                            style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                                lineHeight: '1.3',
                                maxWidth: '800px',
                                margin: '0 auto 1.5rem auto'
                            }}
                        >
                            {slides[currentIndex].title}
                        </h1>
                        <p
                            className="lead"
                            style={{
                                fontSize: '1.5rem',
                                lineHeight: '1.6',
                                maxWidth: '800px',
                                margin: '0 auto',
                                textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            {slides[currentIndex].subtitle}
                        </p>
                    </Col>
                </Row>
            </Container>

            <div
                style={{
                    position: 'absolute',
                    bottom: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 2
                }}
            >
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => goToSlide(index)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            background: 'transparent',
                            padding: '2px',
                            cursor: 'pointer'
                        }}
                    >
                        <span
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: index === currentIndex ? theme.primary : 'rgba(255,255,255,0.6)',
                                transition: 'background 0.3s, transform 0.3s'
                            }}
                        ></span>
                    </span>
                ))}
            </div>
        </div>
    );

};

HeroSection.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default HeroSection;
