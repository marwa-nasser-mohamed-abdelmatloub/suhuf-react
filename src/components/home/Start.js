import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PrimaryButton from '../shared/PrimaryButton';
import { useTheme } from '../shared/ThemeProvider';
import heroImage from '../../assets/images/start.jpg';

const Start = () => {
    const theme = useTheme();
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section
            className="hero-section d-flex align-items-center position-relative"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60vh',
                color: theme.light,
                direction: 'rtl'
            }}
        >
            {/* Overlay */}
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

            <Container
                style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Row
                    className="align-items-center justify-content-center flex-row-reverse w-100"
                    style={{ maxWidth: '1200px' }}
                >
                    {/* زرار الفيديو */}
                    <Col
                        md={6}
                        className="d-flex justify-content-center justify-content-md-end mb-4 mb-md-0 video-col"
                        style={{ marginTop: '80px' }}
                    >
                        <button
                            className="btn rounded-circle position-relative video-pulse-btn"
                            style={{
                                backgroundColor: theme.primary,
                                color: theme.light,
                                width: '70px',
                                height: '70px',
                                fontSize: '28px',
                                border: `5px solid rgba(255,255,255,0.6)`,
                                zIndex: 2
                            }}
                            onClick={() => setShowVideo(true)}
                        >
                            <span className="video-pulse-outer" style={{
                                background: theme.primary,
                                opacity: 0.2
                            }}></span>
                            <i className="bi bi-play-fill position-relative" style={{ zIndex: 2 }}></i>
                        </button>
                    </Col>

                    {/* النصوص والزرار */}
                    <Col md={6} className="text-center text-md-end">
                        <h1 className="fw-bold mb-4" style={{ fontSize: '3rem' }}>
                            لنبدأ بتعلم القرآن الكريم <br /> عبر الإنترنت
                        </h1>
                        <PrimaryButton
                            className="mt-2"
                            style={{
                                padding: '12px 30px',
                                fontSize: '1.1rem',
                                backgroundColor: theme.primary,
                                borderColor: theme.primary
                            }}
                        >
                            ابدأ تجربة مجانية
                        </PrimaryButton>
                    </Col>
                </Row>
            </Container>

            {/* نافذة الفيديو */}
            {showVideo && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}
                    onClick={() => setShowVideo(false)}
                >
                    <div className="ratio ratio-16x9 w-75" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src="https://www.youtube.com/embed/bTnDvANGdY4?autoplay=1&rel=0&modestbranding=1"
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <style>{`
                /* نبض زر الفيديو */
                .video-pulse-btn {
                    position: relative;
                }
                .video-pulse-outer {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    pointer-events: none;
                    animation: video-pulse 2.5s cubic-bezier(0.4,0,0.2,1) infinite;
                }
                @keyframes video-pulse {
                    0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
                    60% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.7); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
                }

                /* الشاشات الصغيرة */
                @media (max-width: 767.98px) {
                    h1 { font-size: 2rem !important; }
                    .video-pulse-btn {
                        width: 50px !important;
                        height: 50px !important;
                        font-size: 22px !important;
                    }
                    .video-pulse-outer {
                        width: 70px;
                        height: 70px;
                    }

                    /* خلي زرار الفيديو تحت النصوص ويتسنتر */
                    .video-col {
                        order: 2;
                        margin-top: 20px !important;
                        justify-content: center !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Start;
