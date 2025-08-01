import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import PrimaryButton from './PrimaryButton';
import Logo from './Logo';

const Footer = () => {
    const theme = useTheme();

    return (
        <>
            <footer
                style={{
                    backgroundColor: theme.dark,
                    color: theme.light,
                    padding: '60px 0',
                    direction: 'rtl',
                    textAlign: 'right'
                }}
            >
                <Container>
                    <Row className="gy-4">
                        {/* الشعار + الوصف */}
                        <Col md={3}>
                            <Logo size="md" />
                            <p style={{ color: theme.secondary, marginTop: 20 }}>
                                أكاديمية متخصصة في تعليم القرآن الكريم والتجويد للأطفال والكبار من خلال الإنترنت.
                            </p>
                            <div className="d-flex gap-3 mt-3 justify-content-start">
                                <i className="bi bi-facebook" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                                <i className="bi bi-youtube" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                                <i className="bi bi-whatsapp" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                                <i className="bi bi-twitter" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                            </div>
                        </Col>

                        {/* الخدمات */}
                        <Col md={3}>
                            <h5 style={{ fontWeight: 'bold' }}>خدمات الأكاديمية</h5>
                            <div style={{ height: 2, width: 30, backgroundColor: theme.primary, margin: '10px 0' }}></div>
                            <ul className="list-unstyled" style={{ color: theme.secondary, paddingRight: 0, marginRight: 0, textAlign: 'right' }}>
                                <li><i className="bi bi-arrow-left-short"></i> تلاوة القرآن الكريم</li>
                                <li><i className="bi bi-arrow-left-short"></i> القاعدة النورانية</li>
                                <li><i className="bi bi-arrow-left-short"></i> القرآن بالتجويد</li>
                                <li><i className="bi bi-arrow-left-short"></i> تفسير القرآن</li>
                            </ul>
                        </Col>

                        {/* معلومات التواصل */}
                        <Col md={3}>
                            <h5 style={{ fontWeight: 'bold' }}>معلومات التواصل</h5>
                            <div style={{ height: 2, width: 30, backgroundColor: theme.primary, margin: '10px 0' }}></div>
                            <ul className="list-unstyled" style={{ color: theme.secondary, paddingRight: 0, marginRight: 0, textAlign: 'right' }}>
                                <li><i className="bi bi-geo-alt"></i> 8448 شارع نيكولز، جامايكا، نيويورك</li>
                                <li><i className="bi bi-telephone"></i> (+1) 111-1234567</li>
                                <li><i className="bi bi-globe"></i> info@domain.com</li>
                                <li><i className="bi bi-clock"></i> من الإثنين إلى السبت: 09:00 - 17:00</li>
                            </ul>
                        </Col>

                        {/* الاشتراك */}
                        <Col md={3}>
                            <div style={{ border: '1px solid white', padding: 20 }}>
                                <h5 style={{ fontWeight: 'bold' }}>اشترك الآن</h5>
                                <div style={{ height: 2, width: 30, backgroundColor: theme.primary, margin: '10px 0 20px' }}></div>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder="بريدك الإلكتروني"
                                        className="text-end"
                                    />
                                </Form.Group>
                                <PrimaryButton className="mt-3 w-100">اشترك الآن</PrimaryButton>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {/* الحقوق */}
            <div
                style={{
                    backgroundColor: theme.primary,
                    padding: '10px 0',
                    color: theme.light,
                    direction: 'rtl',
                }}
            >
                <Container style={{ textAlign: 'start' }}>
                    جميع الحقوق محفوظة © 2025
                </Container>
            </div>

        </>
    );
};

export default Footer;
