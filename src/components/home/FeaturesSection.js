import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';

const features = [
    {
        icon: 'bi-book',
        title: 'معلمين ومعلمات معتمدين بخبرة عالية',
        description: 'نخبة من المعلمين المتخصصين في تعليم القرآن الكريم والتجويد.'
    },
    {
        icon: 'bi-heart-fill',
        title: 'أسلوب تعليمي ممتع ومحفّز',
        description: 'نقدّم طرق تدريس تفاعلية تُحبب الطلاب في التعلم وتحفّزهم على الاستمرار.'
    },
    {
        icon: 'bi-clock-fill',
        title: 'أوقات مرنة تناسب الجميع',
        description: 'إمكانية اختيار الأوقات التي تناسبك لضمان استمرارية التعلم.'
    },
    {
        icon: 'bi-award-fill',
        title: 'شهادات معتمدة عند الإنجاز',
        description: 'نوفر شهادات معتمدة لكل من يتم دراسته وإتمامه بنجاح.'
    }
];

const FeaturesSection = () => {
    const theme = useTheme();

    return (
        <section style={{ padding: '80px 0', backgroundColor: theme.light, direction: 'rtl' }}>
            <Container>
                <Row className="text-center">
                    {features.map((feature, index) => (
                        <Col xs={12} sm={6} md={3} key={index} className="mb-5">
                            <div
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: theme.primary,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}
                            >
                                <i className={`bi ${feature.icon}`} style={{ color: theme.light, fontSize: '32px' }}></i>
                            </div>
                            <h5 style={{ color: theme.text, fontWeight: 'bold', marginBottom: '10px' }}>
                                {feature.title}
                            </h5>
                            <p style={{ color: theme.muted, maxWidth: '90%', margin: '0 auto' }}>
                                {feature.description}
                            </p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default FeaturesSection;
