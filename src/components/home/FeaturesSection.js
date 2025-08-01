import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';

const features = [
    {
        icon: 'bi-person-lines-fill',
        title: 'مدرسون محترفون',
        description: 'نخبة من المعلمين المتخصصين في تعليم القرآن الكريم والتجويد.'
    },
    {
        icon: 'bi-camera-video',
        title: 'حصص أونلاين',
        description: 'تعلّم عن بعد من خلال دروس تفاعلية في أي وقت ومن أي مكان.'
    },
    {
        icon: 'bi-person-fill',
        title: 'معلمات للنساء',
        description: 'نوفر معلمات مؤهلات لتدريس النساء والفتيات بكل خصوصية.'
    }
];

const FeaturesSection = () => {
    const theme = useTheme();

    return (
        <section style={{ padding: '80px 0', backgroundColor: theme.light, direction: 'rtl' }}>
            <Container>
                <Row className="text-center">
                    {features.map((feature, index) => (
                        <Col md={4} key={index} className="mb-5">
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
