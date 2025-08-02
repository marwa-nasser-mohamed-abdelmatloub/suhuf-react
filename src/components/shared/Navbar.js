import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import logo from '../../assets/images/sohof-logo.jpg';
import PrimaryButton from './PrimaryButton';

const CustomNavbar = () => {
    // حالة المستخدم (للتجربة، يمكن ربطها بباك اند لاحقًا)
    const [user, setUser] = React.useState(null); // null أو { name: 'اسم المستخدم' }
    const theme = useTheme();

    const navItems = [
        { label: 'الرئيسية', path: '/' },
        { label: 'اتصل بنا', path: '/contact' },
        { label: 'من نحن', path: '/about', hasPlus: true },
        { label: 'الخدمات', path: '/service', hasPlus: true },
        { label: 'الدورات', path: '/courses' },
        { label: 'الرسوم', path: '/pricing' },
        { label: 'المدونة', path: '/blog' },
    ];

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
                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <img src={logo} alt="Quran For All" style={{ maxWidth: '120px' }} className="hover-grow" />
                        </Col>

                        <Col xs={12} md={9}>
                            <div className="d-flex flex-column flex-md-row-reverse justify-content-center justify-content-md-start align-items-center align-items-md-end gap-3">
                                <div className="d-flex align-items-center hover-grow">
                                    <i className="bi bi-telephone-fill ms-2 fs-4 text-success"></i>
                                    <div className="text-center text-md-end">
                                        <div style={{ color: theme.dark }}><strong>(+20) 01080290663</strong></div>
                                        <div style={{ color: theme.muted, fontSize: '14px' }}>info@domain.com</div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center hover-grow">
                                    <i className="bi bi-geo-alt-fill ms-2 fs-4 text-success"></i>
                                    <div className="text-center text-md-end">
                                        <div style={{ color: theme.dark }}><strong>المنيا, مصر</strong></div>
                                        <div style={{ color: theme.muted, fontSize: '14px' }}>المنيا, مصر</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Navigation Bar */}
            <Navbar expand="md" style={{ backgroundColor: theme.dark }} dir="rtl" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto border-0 text-light" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between w-100">
                        <Nav className="ms-auto flex-row">
                            {navItems.map((item, idx) => (
                                <NavLink
                                    to={item.path}
                                    key={idx}
                                    className={({ isActive }) =>
                                        `fw-bold px-3 d-flex align-items-center nav-item-hover nav-link ${isActive ? 'active-link' : ''}`
                                    }
                                    style={{
                                        color: theme.light,
                                        flexDirection: 'row-reverse',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {item.hasPlus && (
                                        <i className="bi bi-plus-lg me-2" style={{ fontSize: '0.8rem' }}></i>
                                    )}
                                    {item.label}
                                </NavLink>
                            ))}
                        </Nav>


                        {/* Free Trial, Login, Register, User Info */}
                        <div className="d-flex align-items-center gap-2">
                            <PrimaryButton className="d-flex align-items-center" style={{ padding: '6px 16px' }}>
                                <i className="bi bi-book-fill ms-2"></i>
                                تجربة مجانية
                            </PrimaryButton>
                            {!user ? (
                                <>
                                    <NavLink to="/login">
                                        <PrimaryButton
                                            className="d-flex align-items-center"
                                            style={{ padding: '6px 16px', backgroundColor: theme.success, borderColor: theme.success }}
                                        >
                                            <i className="bi bi-person ms-2"></i>
                                            تسجيل الدخول
                                        </PrimaryButton>
                                    </NavLink>

                                    <NavLink to="/register">
                                        <PrimaryButton
                                            className="d-flex align-items-center"
                                            style={{ padding: '6px 16px', backgroundColor: theme.primary, borderColor: theme.primary }}
                                        >
                                            <i className="bi bi-person-plus ms-2"></i>
                                            تسجيل جديد
                                        </PrimaryButton>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <span style={{ color: theme.primary, fontWeight: 'bold', marginRight: 10 }}>
                                        Welcome, {user.name}
                                    </span>
                                    <NavLink>
                                        <PrimaryButton
                                            className="d-flex align-items-center"
                                            style={{ padding: '6px 16px', backgroundColor: theme.danger, borderColor: theme.danger }}
                                            onClick={() => setUser(null)}
                                        >
                                            <i className="bi bi-box-arrow-right ms-2"></i>
                                            تسجيل الخروج
                                        </PrimaryButton>
                                    </NavLink>
                                </>
                            )}
                        </div>
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

                .active-link {
                    color: ${theme.primary} !important;
                    transform: translateY(-2px);
                }

                .active-link i {
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
