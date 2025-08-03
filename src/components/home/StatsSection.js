import React from 'react';
import { useTheme } from '../shared/ThemeProvider';
import bgImage from '../../assets/images/quran-bg.jpg';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
    const theme = useTheme();
    const { ref, inView } = useInView({ triggerOnce: true });

    const stats = [
        { icon: 'bi bi-person-hearts', value: 1920, suffix: '+', label: 'طلاب سعداء' },
        { icon: 'bi bi-people', value: 250, suffix: '+', label: 'المعلمون المحترفون' },
        { icon: 'bi bi-journal', value: 100, suffix: '+', label: 'بلدان' },
        { icon: 'bi bi-star', value: 10, suffix: '+', label: 'سنوات من الخبرة' },
    ];

    return (
        <section
            ref={ref}
            className="position-relative text-center text-white"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '90px 0',
            }}
        >
            {/* Overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: 'rgba(15, 85, 120, 0.7)', zIndex: 1 }}
            ></div>

            {/* Content */}
            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row justify-content-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-6 col-md-3 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center mb-4"
                                    style={{
                                        width: '90px',
                                        height: '90px',
                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                        border: '2px solid white',
                                    }}
                                >
                                    <i className={`${stat.icon}`} style={{ fontSize: '34px', color: theme.light }}></i>
                                </div>
                                <h3 className="fw-bold mb-2">
                                    {inView && (
                                        <CountUp
                                            start={0}
                                            end={stat.value}
                                            duration={2}
                                            separator=","
                                            suffix={stat.suffix}
                                        />
                                    )}
                                </h3>
                                <p className="mb-0">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
