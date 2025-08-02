import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';

import topImage from '../../assets/images/sohof-boy.jpg';
import bottomImage from '../../assets/images/about1.jpg';

const ServiceComponent = () => {
    const theme = useTheme();

    return (
        <div dir="rtl" style={{ padding: '60px 0', backgroundColor: theme.light, color: theme.text }}>
            <Container>
                {/* الصورة الكبيرة فوق */}
                <img src={topImage} alt="Noorani Qaida" className="img-fluid rounded shadow mb-4" />

                {/* العنوان + فقرتين نص */}
                <h3 style={{ fontWeight: 'bold', color: theme.dark }}>أكاديمية صحف أونلاين</h3>
                <p style={{ color: theme.muted }}>
                    نقدم دورة القاعدة النورانية لتعليم الأطفال القراءة الصحيحة للقرآن الكريم بشكل تفاعلي وسهل، مع مراعاة الفروق الفردية.
                    نعتمد على معلمين متخصصين وخطط دراسية فعالة في بيئة تعليمية آمنة.
                </p>
                <p style={{ color: theme.muted }}>
                    يتم تدريس الحروف ومخارجها بطريقة شيقة ومبسطة تضمن استيعاب الطالب، وتؤهله للانتقال لتعلم التلاوة بشكل صحيح.
                </p>

                {/* عنوان: المميزات */}
                <h5 style={{ color: theme.dark, marginTop: '40px' }}>ماذا نقدم في هذه الدورة:</h5>
                <p style={{ color: theme.muted }}>
                    الدورة مناسبة للمبتدئين، خاصة الأطفال، وتعتمد على المنهج الأصلي للقاعدة النورانية، بإشراف معلمين مجازين.
                </p>

                {/* ✅ المميزات (قائمة) */}
                <ul className="list-unstyled" style={{ color: theme.text, paddingRight: 0, marginRight: 0, textAlign: 'right' }}>
                    <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success ms-2"></i>
                        تعليم الحروف والأصوات بطريقة ممتعة وتفاعلية
                    </li>
                    <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success ms-2"></i>
                        معلمون مؤهلون وذوو خبرة عالية في تعليم الأطفال
                    </li>
                    <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success ms-2"></i>
                        تقييم دوري لتقدم الطالب وتشجيعه
                    </li>
                </ul>

                {/* الصورة + نص في صف (نص يسار وصورة يمين) */}
                <Row className="align-items-center mt-5">
                    <Col md={6} className="order-md-2">
                        <img src={bottomImage} alt="kids learning" className="img-fluid rounded shadow" />
                    </Col>
                    <Col md={6} className="order-md-1 mt-4 mt-md-0">
                        <p style={{ color: theme.muted }}>
                            من خلال هذه الدورة سيتمكن الطالب من نطق الحروف العربية نطقًا سليمًا مع التمييز بين الحروف المتشابهة،
                            وتعلم قواعد التهجئة والتنوين والسكون والتشديد وغيرها.
                        </p>
                        <p style={{ color: theme.muted }}>
                            نستخدم وسائل تفاعلية ومتابعة شخصية مع كل طالب، ونوفر بيئة مشجعة ومحفزة للطفل لبناء علاقة قوية مع القرآن الكريم.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ServiceComponent;
