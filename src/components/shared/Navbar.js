import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import logo from '../../assets/images/sohof-logo.jpg';

const CustomNavbar = () => {
    const theme = useTheme();

    return (
        <div dir="rtl">
            {/* Top Row: Verse and Social Icons */}
            <div style={{
                backgroundColor: theme.primary,
                color: theme.light,
                padding: '10px 0',
                fontSize: '18px'
            }}>
                <Container>
                    <Row className="align-items-center">
                        <Col className="text-end">
                            إِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ
                        </Col>
                        <Col className="text-start">
                            <i className="bi bi-facebook ms-3 fs-5 text-light hover-grow"></i>
                            <i className="bi bi-skype ms-3 fs-5 text-light hover-grow"></i>
                            <i className="bi bi-whatsapp fs-5 text-light hover-grow"></i>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Logo and Contact Info */}
            <div className="bg-white border-bottom py-3">
                <Container>
                    <Row className="align-items-center text-center text-md-end">
                        {/* Logo */}
                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <img src={logo} alt="Quran For All" style={{ maxWidth: '120px' }} className="hover-grow" />
                        </Col>

                        {/* Contact Info */}
                        <Col xs={12} md={9}>
                            <div className="d-flex flex-column flex-md-row-reverse justify-content-center justify-content-md-start align-items-center align-items-md-end gap-3">
                                {/* Phone */}
                                <div className="d-flex align-items-center hover-grow">
                                    <div className="text-center text-md-end">
                                        <div style={{ color: theme.dark }}><strong>(+1) 111-1234567</strong></div>
                                        <div style={{ color: theme.muted, fontSize: '14px' }}>info@domain.com</div>
                                    </div>
                                    <i className="bi bi-telephone-fill ms-2 fs-4 text-success"></i>
                                </div>

                                {/* Address */}
                                <div className="d-flex align-items-center hover-grow">
                                    <div className="text-center text-md-end">
                                        <div style={{ color: theme.dark }}><strong>8448 Nicolls Ave</strong></div>
                                        <div style={{ color: theme.muted, fontSize: '14px' }}>Jamaica, NY 11434</div>
                                    </div>
                                    <i className="bi bi-geo-alt-fill ms-2 fs-4 text-success"></i>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            {/* Navigation Bar with Toggle */}
            <Navbar expand="md" style={{ backgroundColor: theme.dark }} dir="rtl" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto border-0 text-light" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto flex-row">
                            {[
                                { label: 'الرئيسية' },
                                { label: 'اتصل بنا' },
                                { label: 'من نحن', hasPlus: true },
                                { label: 'الخدمات', hasPlus: true },
                                { label: 'الرسوم' },
                                { label: 'التحميلات' },
                                { label: 'المدونة' },
                            ].map((item, idx) => (
                                <Nav.Link
                                    key={idx}
                                    href="#"
                                    className="fw-bold px-3 d-flex align-items-center nav-item-hover"
                                    style={{
                                        color: idx === 0 ? theme.primary : theme.light,
                                        flexDirection: 'row-reverse',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {item.hasPlus && (
                                        <i className="bi bi-plus-lg me-2" style={{ fontSize: '0.8rem' }}></i>
                                    )}
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Styles */}
            <style jsx>{`
                .hover-grow {
                    transition: transform 0.3s ease;
                }
                .hover-grow:hover {
                    transform: scale(1.05);
                }
                .nav-item-hover:hover {
                    color: ${theme.primary} !important;
                    transform: translateY(-2px);
                }
                .nav-item-hover:hover i {
                    color: ${theme.primary} !important;
                }

                @media (max-width: 767.98px) {
                    .navbar-nav {
                        flex-direction: column !important;
                        align-items: flex-start;
                        padding-right: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default CustomNavbar;
