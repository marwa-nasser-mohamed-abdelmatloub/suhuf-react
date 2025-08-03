import React, { useContext } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import logo from '../../assets/images/sohof-logo.jpg';
import PrimaryButton from './PrimaryButton';
import AuthContext from '../../contexts/AuthContext';

const CustomNavbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
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
            {/* Top Verse and Icons */}
            <div
                style={{
                    backgroundColor: theme.primary,
                    color: theme.light,
                    padding: '10px 0',
                    fontSize: '18px',
                }}
            >
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

            {/* Logo and Info */}
            <div className="bg-white border-bottom py-3">
                <Container>
                    <Row className="align-items-center text-center text-md-end">
                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <NavLink to="/">
                                <img
                                    src={logo}
                                    alt="Quran For All"
                                    style={{ maxWidth: '120px' }}
                                    className="hover-grow"
                                />
                            </NavLink>
                        </Col>
                        <Col xs={12} md={9}>
                            <div className="d-flex flex-column flex-md-row-reverse justify-content-center justify-content-md-start align-items-center align-items-md-end gap-3">
                                <div className="d-flex align-items-center hover-grow">
                                    <i className="bi bi-telephone-fill ms-2 fs-4 text-success"></i>
                                    <div className="text-center text-md-end">
                                        <div style={{ color: theme.dark }}>
                                            <strong>(+20) 01080290663</strong>
                                        </div>
                                        <div style={{ color: theme.muted, fontSize: '14px' }}>
                                            info@domain.com
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center hover-grow">
                                    <i className="bi bi-geo-alt-fill ms-2 fs-4 text-success"></i>
                                    <div className="text-center text-md-end">
                                        <div style={{ color: theme.dark }}>
                                            <strong>المنيا, مصر</strong>
                                        </div>
                                        <div style={{ color: theme.muted, fontSize: '14px' }}>
                                            المنيا, مصر
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Navbar */}
            <Navbar expand="md" style={{ backgroundColor: theme.dark }} dir="rtl" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto border-0 text-light" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className="w-100 d-flex flex-column flex-md-row justify-content-md-between align-items-center py-2">
                            <Nav className="navbar-nav flex-column flex-md-row align-items-center text-center w-100">
                                {navItems.map((item, idx) => (
                                    <NavLink
                                        key={idx}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `fw-bold px-2 py-1 d-flex align-items-center nav-item-hover nav-link ${isActive ? 'active-link' : ''}`
                                        }
                                        style={{
                                            color: theme.light,
                                            flexDirection: 'row-reverse',
                                            fontSize: '0.95rem',
                                            justifyContent: 'center',
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {item.hasPlus && (
                                            <i className="bi bi-plus-lg me-2" style={{ fontSize: '0.8rem' }}></i>
                                        )}
                                        {item.label}
                                    </NavLink>
                                ))}
                            </Nav>

                            <div className="d-flex flex-column flex-md-row align-items-md-center user-buttons-section gap-2 w-100 justify-content-md-end text-center">
                                <PrimaryButton className="d-flex align-items-center nav-btn-responsive" style={{ padding: '5px 12px' }}>
                                    <i className="bi bi-book-fill ms-2"></i>
                                    تجربة مجانية
                                </PrimaryButton>

                                {!isAuthenticated ? (
                                    <>
                                        <NavLink to="/login" className="w-auto">
                                            <PrimaryButton
                                                className="d-flex align-items-center nav-btn-responsive"
                                                style={{ backgroundColor: theme.success, borderColor: theme.success, padding: '5px 12px' }}
                                            >
                                                <i className="bi bi-person ms-2"></i>
                                                تسجيل الدخول
                                            </PrimaryButton>
                                        </NavLink>
                                        <NavLink to="/register" className="w-auto">
                                            <PrimaryButton
                                                className="d-flex align-items-center nav-btn-responsive"
                                                style={{ backgroundColor: theme.primary, borderColor: theme.primary, padding: '5px 12px' }}
                                            >
                                                <i className="bi bi-person-plus ms-2"></i>
                                                تسجيل جديد
                                            </PrimaryButton>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <span className="welcome-text mb-2 mb-md-0">
                                            أهلاً، {user?.first_name || user?.username || 'مستخدم'}
                                        </span>
                                        <PrimaryButton
                                            className="d-flex align-items-center nav-btn-responsive"
                                                style={{ backgroundColor: theme.danger, borderColor: theme.danger, padding: '5px 12px' }}
                                            onClick={logout}
                                        >
                                            <i className="bi bi-box-arrow-right ms-2"></i>
                                            تسجيل الخروج
                                        </PrimaryButton>
                                    </>
                                )}
                            </div>
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

                .nav-btn-responsive {
                    padding: 10px 18px;
                    font-size: 1.05rem;
                    min-width: 140px;
                    justify-content: center;
                }

                .welcome-text {
                    color: ${theme.primary};
                    font-weight: bold;
                    font-size: 0.9rem;
                }

                @media (max-width: 991.98px) {
                    .nav-btn-responsive {
                        width: 200px !important;
                        min-width: 60px !important;
                        font-size: 0.92rem !important;
                        padding: 10px 6px !important;
                        display: block !important;
                    }

                    .navbar-nav,
                    .navbar-nav .nav-link {
                        width: 100% !important;
                        text-align: right !important;
                        direction: rtl !important;
                        justify-content: flex-end !important;
                        align-items: flex-end !important;
                        margin-bottom: 8px;
                    }

                    .user-buttons-section {
                        align-items: center !important;
                        justify-content: center !important;
                        text-align: center;
                    }

                    .user-buttons-section > * {
                        width: 100%;
                    }

                    .welcome-text {
                        text-align: center !important;
                        margin-bottom: 6px;
                    }
                }

                @media (min-width: 992px) {
                    .navbar-nav .nav-link {
                        margin-inline: 2px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CustomNavbar;
