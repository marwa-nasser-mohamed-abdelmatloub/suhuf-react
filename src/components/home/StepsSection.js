import React, { useState } from 'react';
import { useTheme } from '../shared/ThemeProvider';
import girlPraying from '../../assets/images/girl-praying.jpg';

const StepsSection = () => {
    const theme = useTheme();
    const [showVideo, setShowVideo] = useState(false);

    const steps = [
        {
            icon: 'bi bi-hand-index-thumb', title: 'أرسل رسالة على واتساب للتسجيل', text: 'تواصل معنا مباشرة عبر الواتساب لإتمام التسجيل بسهولة.' },
        { icon: 'bi bi-calendar-event', title: 'اختر وقتًا للتجربة المجانية', text: 'اختر اليوم والساعة التي تناسبك لبدء أول تجربة تعليمية لك.' },
        {
            icon: 'bi bi-book', title: 'إبدأ أول خطواتك لتعلم القرآن', text: 'انضم للحصة الأولى وابدأ رحلتك في تعلم القرآن.' },
    ];

    return (
        <section style={{ backgroundColor: theme.secondary, padding: '80px 0' }}>
            <div className="container">
                <div className="row align-items-center g-5">

                    <div className="col-lg-6 order-1 order-lg-0 position-relative d-flex justify-content-center">
                        <img src={girlPraying} alt="Learn Quran" className="img-fluid rounded shadow" />
                        <button
                            className="btn rounded-circle position-absolute d-flex justify-content-center align-items-center shadow video-btn"
                            style={{
                                backgroundColor: theme.primary,
                                color: theme.light,
                                width: '90px',
                                height: '90px',
                                fontSize: '32px',
                                border: `4px solid ${theme.light}`,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                            onClick={() => setShowVideo(true)}
                        >
                            <span className="video-pulse-outer" style={{
                                background: theme.primary,
                                opacity: 0.2
                            }}></span>
                            <i className="bi bi-play-fill position-relative" style={{ zIndex: 2 }}></i>
                        </button>
                    </div>

                    <div className="col-lg-6 order-0 order-lg-1">
                        <h6 className="mb-3" style={{ color: theme.primary, fontWeight: '700' }}>| خطوات التعلم</h6>
                        <h2 className="fw-bold mb-3" style={{ color: theme.text }}>
                            ابدأ بتعلم القرآن الكريم الآن <br /> في 3 خطوات سهلة
                        </h2>
                        <p className="text-muted mb-4">
                            تعلم القرآن أصبح أسهل من أي وقت مضى، كل ما عليك فعله هو اتباع هذه الخطوات البسيطة للبدء فورًا.
                        </p>

                        {steps.map((step, index) => (
                            <div key={index} className="d-flex mb-4 align-items-start">
                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center ms-3 flex-shrink-0"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        backgroundColor: theme.primary,
                                    }}
                                >
                                    <i className={step.icon} style={{ color: theme.light, fontSize: '24px' }}></i>
                                </div>
                                <div>
                                    <h5 className="mb-1" style={{ color: theme.text }}>{step.title}</h5>
                                    <p className="text-muted mb-0">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <style>{`
                .video-btn { position: relative; overflow: visible; }
                .video-pulse-outer {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 120px;
                    height: 120px;
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

                @media (max-width: 767.98px) {
                    .video-btn {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 22px !important;
                        border-width: 3px !important;
                    }
                    .video-pulse-outer {
                        width: 80px;
                        height: 80px;
                    }
                }
            `}</style>
        </section>
    );
};

export default StepsSection;
