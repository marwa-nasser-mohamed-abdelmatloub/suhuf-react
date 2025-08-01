import React, { useState } from 'react';
import { useTheme } from '../shared/ThemeProvider';
import about1 from '../../assets/images/about1.jpg';
import about2 from '../../assets/images/about2.jpg';
import PrimaryButton from '../shared/PrimaryButton';

const AboutSection = () => {
    const theme = useTheme();
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section className="py-5" style={{ direction: 'rtl', backgroundColor: theme.secondary }}>
            <div className="container">
                <div className="row align-items-center g-5">

                    {/* النصوص */}
                    <div className="col-lg-6 text-center text-lg-end">
                        <h6 className="mb-3" style={{ color: theme.primary, fontSize: '22px', fontWeight: '700' }}>
                            <span style={{ color: theme.primary, marginLeft: '6px' }}>|</span> مـن نحن
                        </h6>
                        <h2 className="fw-bold mb-4" style={{ color: theme.text }}>
                            أفضل أكاديمية لتعليم القرآن أونلاين
                        </h2>
                        <p className="text-muted mb-3">
                            نحن نقدم تعليم القرآن الكريم عن بُعد مع نخبة من المعلمين والمعلمات المؤهلين.
                            يمكنك تعلم التلاوة، التجويد، التفسير، والترجمة بسهولة من منزلك.
                        </p>
                        <p className="text-muted mb-4">
                            نسعى لتوفير بيئة تعليمية تفاعلية وآمنة لجميع الأعمار مع دعم متواصل للطلاب
                            والتقييمات الدورية لضمان أفضل النتائج.
                        </p>

                        <PrimaryButton
                            style={{
                                padding: '16px 40px',
                                fontSize: '18px',
                                borderRadius: '8px'
                            }}
                        >
                            تواصل معنا
                        </PrimaryButton>
                    </div>

                    {/* الصور */}
                    <div className="col-lg-6 position-relative d-flex justify-content-center align-items-center images-wrapper">
                        <img
                            src={about1}
                            alt="About Quran"
                            className="img-fluid rounded shadow main-img"
                        />
                        <img
                            src={about2}
                            alt="About Quran 2"
                            className="img-fluid rounded shadow position-absolute second-img"
                        />

                        {/* زر الفيديو */}
                        <button
                            className="btn rounded-circle position-absolute shadow d-flex justify-content-center align-items-center video-pulse-btn"
                            style={{
                                backgroundColor: theme.primary,
                                color: theme.light,
                                width: '70px',
                                height: '70px',
                                fontSize: '28px',
                                border: '5px solid white',
                                zIndex: 3
                            }}
                            onClick={() => setShowVideo(true)}
                        >
                            <span
                                className="video-pulse-outer"
                                style={{
                                    background: theme.primary,
                                    opacity: 0.2
                                }}
                            ></span>
                            <i className="bi bi-play-fill position-relative" style={{ zIndex: 2 }}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* نافذة الفيديو */}
            {showVideo && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}
                    onClick={() => setShowVideo(false)}
                >
                    <div className="ratio ratio-16x9 w-75" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src="https://www.youtube.com/embed/bTnDvANGdY4?start=10&autoplay=1&rel=0&modestbranding=1"
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <style>{`
                .images-wrapper {
                    min-height: 350px;
                }
                .main-img {
                    max-width: 65%;
                    transition: 0.3s ease;
                }
                .second-img {
                    max-width: 32%;
                    top: 130px;
                    left: -30px;
                    z-index: 2;
                    transition: 0.3s ease;
                }

                /* زر الفيديو دايمًا في النص بالنسبة للصورة الرئيسية */
                .video-pulse-btn {
                    top: 50%;
                    left: 28%;
                    transform: translate(-50%, -50%);
                    transition: all 0.3s ease;
                }

                /* نبض زر الفيديو */
                .video-pulse-outer {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    pointer-events: none;
                    animation: video-pulse 3s cubic-bezier(0.4,0,0.2,1) infinite;
                }
                @keyframes video-pulse {
                    0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
                    60% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.7); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
                }

                /* تصغير الصور والزرار تدريجيًا بدون تغيير الشكل */
                @media (max-width: 991.98px) {
                    .main-img { max-width: 55% !important; }
                    .second-img { max-width: 28% !important; top: 110px !important; left: 20px !important; }
                    .video-pulse-btn { width: 60px !important; height: 60px !important; font-size: 24px !important; left: 30% !important; }
                }

                @media (max-width: 767.98px) {
                    .main-img { max-width: 70% !important; }
                    .second-img { max-width: 36% !important; top: 90px !important; left: -15px !important; }
                    .video-pulse-btn { width: 50px !important; height: 50px !important; font-size: 20px !important; left: 33% !important; }
                    .video-pulse-outer { width: 65px; height: 65px; }
                }
            `}</style>
        </section>
    );
};

export default AboutSection;
