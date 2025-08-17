import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';

import missionImg from "../../assets/images/about3.jpg";
import visionImg from '../../assets/images/vision.jpg';
import valuesImg from '../../assets/images/values.jpg';

const AboutCardsSection = () => {
    const theme = useTheme();

    const items = [
        {
            title: 'رسالتنا',
            image: missionImg,
            text: 'في أكاديمية صحف ، نؤمن أن غرس حب القرآن في قلوب الأطفال هو استثمار أبدي. نقدم برامج تعليمية تجمع بين الأصالة والطرق الحديثة، لنربي جيلًا متمسكًا بكتاب الله.'
        },
        {
            title: 'رؤيتنا',
            image: visionImg,
            text: 'أن نكون الوجهة الأولى لتعليم القرآن الكريم عالميًا بطريقة احترافية ومميزة.'
        },
        {
            title: 'قيمنا',
            image: valuesImg,
            text: 'نلتزم بالقيم الإسلامية مثل الإخلاص، والصدق، والاحترام في تقديم خدماتنا التعليمية.'
        }
    ];

    return (
        <section style={{ padding: '80px 0', direction: 'rtl' }}>
            <Container>
                <Row>
                    {items.map((item, index) => (
                        <Col key={index} md={4} className="mb-5 text-center">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="img-fluid mb-4 rounded shadow-sm"
                            />
                            <h4 style={{ color: theme.primary, fontWeight: 'bold' }}>{item.title}</h4>
                            <p style={{ color: theme.muted }}>{item.text}</p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default AboutCardsSection;
