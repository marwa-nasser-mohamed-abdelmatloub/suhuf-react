import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
                    padding: '50px 0',
                    direction: 'rtl',
                    textAlign: 'right'
                }}
            >
                <Container>
                    <Row className="gy-4" style={{ alignItems: 'flex-start' }}>
                        <Col xs={12} sm={6} md={3} style={{ marginTop: '-40px' }}>
                            <div style={{ marginBottom: '-50px' }}>
                                <Logo size="md" />
                            </div>
                            <p style={{
                                color: theme.secondary,
                                marginTop: '1rem'
                            }}>
                                أكاديمية متخصصة في تعليم القرآن الكريم والتجويد للأطفال والكبار من خلال الإنترنت.
                            </p>
                            <div className="d-flex gap-3 mt-3 justify-content-start">
                                <a href="https://www.facebook.com/share/1B1LDRsnQa/" target="_blank" rel="noreferrer">
                                    <i className="bi bi-facebook" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                                </a>
                                <a href="https://www.instagram.com/sohofacademy?igsh=MTU0cG43aTMxcDVtNg==" target="_blank" rel="noreferrer">
                                    <i className="bi bi-instagram" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                                </a>
                                <a href="https://wa.me/201112922085" target="_blank" rel="noreferrer">
                                    <i className="bi bi-telephone" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                                </a>
                                <a href="https://wa.me/201112922085" target="_blank" rel="noreferrer">
                                    <i className="bi bi-whatsapp" style={{ color: theme.primary, fontSize: 20, cursor: 'pointer' }}></i>
                                </a>
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={3}>
                            <h5 style={{ fontWeight: 'bold' }}>خدمات الأكاديمية</h5>
                            <div style={{ height: 2, width: 30, backgroundColor: theme.primary, margin: '10px 0' }}></div>
                            <ul className="list-unstyled" style={{ color: theme.secondary, paddingRight: 0, marginRight: 0, textAlign: 'right' }}>
                                <li><i className="bi bi-bullseye"></i> برنامج الحفظ والمراجعة</li>
                                <li><i className="bi bi-laptop"></i> حصص فردية أونلاين</li>
                                <li><i className="bi bi-people"></i> حصص جماعية تفاعلية</li>
                                <li><i className="bi bi-book"></i> برنامج التلاوة الصحيحة</li>
                                <li><i className="bi bi-pencil-square"></i> برنامج القراءة من الصفر</li>
                            </ul>
                        </Col>

                        <Col xs={12} sm={6} md={3}>
                            <h5 style={{ fontWeight: 'bold' }}>معلومات التواصل</h5>
                            <div style={{ height: 2, width: 30, backgroundColor: theme.primary, margin: '10px 0' }}></div>
                            <ul className="list-unstyled" style={{ color: theme.secondary, paddingRight: 0, marginRight: 0, textAlign: 'right' }}>
                                <li><i className="bi bi-geo-alt"></i> مصر</li>
                                <li><i className="bi bi-telephone"></i> <span dir='ltr'>(+20)1112922085</span></li>
                                <li><i className="bi bi-whatsapp"></i> <span dir='ltr'>(+20)1112922085</span></li>
                                <li><i className="bi bi-envelope"></i> sohofacademy1@gmail.com</li>
                            </ul>
                        </Col>

                        <Col xs={12} sm={6} md={3}>
                            <div style={{ border: '1px solid white', padding: 20 }}>
                                <h5 style={{ fontWeight: 'bold' }}>اشترك الآن</h5>
                                <div style={{ height: 2, width: 30, backgroundColor: theme.primary, margin: '10px 0 20px' }}></div>

                                <a
                                    href="https://wa.me/201112922085?text=مرحبًا، أريد الاشتراك في أكاديمية صحوف."
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <PrimaryButton className="w-100">
                                        اشترك الآن
                                    </PrimaryButton>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>

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
