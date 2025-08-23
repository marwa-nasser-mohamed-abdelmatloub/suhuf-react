import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import logo from "../../assets/images/sohof-logo-removebg-preview.png";

const CustomNavbar = () => {
  const theme = useTheme();

  const navItems = [
    { label: "الرئيسية", path: "/" },
    { label: "اتصل بنا", path: "/contact" },
    { label: "من نحن", path: "/about" },
    { label: "الخدمات", path: "/service" },
    { label: "الدورات", path: "/courses" },
    { label: "البرامج", path: "/programs" },
  ];

  return (
    <div dir="rtl">
      <div
        style={{
          backgroundColor: theme.light,
          color: theme.primary,
          padding: "10px 0",
          fontSize: "18px",
        }}
      >
        <Container className="px-0">
          <Row className="align-items-center mx-0">
            <Col className="text-end">
              إِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ
              مِنْ عَلَقٍ
            </Col>
            <Col className="text-start d-flex justify-content-end">
              <a
                href="https://www.facebook.com/share/1B1LDRsnQa/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/sohofacademy?igsh=MTU0cG43aTMxcDVtNg=="
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a href="tel:201112922085" className="social-icon">
                <i className="bi bi-telephone"></i>
              </a>
              <a
                href="https://wa.me/201080290663"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </Col>
          </Row>
        </Container>
      </div>

      <Navbar
        expand="md"
        style={{ backgroundColor: theme.light }}
        dir="rtl"
        className="py-0"
      >
        <Container className="px-0">
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="border-0"
            style={{ color: theme.text }}
          />
          <Navbar.Collapse id="responsive-navbar-nav" className="flex-grow-1">
            <Nav className="d-flex flex-column flex-md-row align-items-center text-center m-0">
              {navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `fw-bold px-2 py-3 d-flex align-items-center nav-item-hover nav-link ${
                      isActive ? "active-link" : ""
                    }`
                  }
                  style={{
                    color: theme.text,
                    flexDirection: "row-reverse",
                    fontSize: "1.1rem",
                    position: "relative",
                    display: "inline-flex",
                  }}
                >
                  <span className="nav-text">{item.label}</span>
                </NavLink>
              ))}
            </Nav>
          </Navbar.Collapse>

          <NavLink to="/" className="d-flex align-items-center p-0 m-0">
            <img
              src={logo}
              alt="Quran For All"
              style={{
                maxWidth: "200px",
                display: "block",
                marginBottom: "5px",
              }}
              className="hover-grow"
            />
          </NavLink>
        </Container>
      </Navbar>

      <style>{`
                .hover-grow {
                    transition: transform 0.3s ease;
                }
                .hover-grow:hover {
                    transform: scale(1.05);
                }

                .nav-item-hover .nav-text {
                    position: relative;
                    display: inline-block;
                }

                .nav-item-hover .nav-text::after {
                    content: '';
                    position: absolute;
                    top: -4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background-color: ${theme.primary};
                    transition: width 0.3s ease;
                }

                .nav-item-hover:hover .nav-text::after {
                    width: 100%;
                }

                .active-link .nav-text {
                    color: ${theme.primary} !important;
                }

                .social-icon {
                    color: ${theme.primary};
                    font-size: 1.2rem;
                    margin-left: 12px;
                    transition: transform 0.3s ease;
                }

                .social-icon:hover {
                    transform: scale(1.2);
                }

                @media (max-width: 991.98px) {
                    .navbar-nav,
                    .navbar-nav .nav-link {
                        width: 100% !important;
                        text-align: right !important;
                        direction: rtl !important;
                        justify-content: flex-end !important;
                        align-items: flex-end !important;
                        margin-bottom: 8px;
                    }

                    .social-icon {
                        font-size: 1.5rem;
                        margin-left: 8px;
                    }

                    .text-end, .text-start {
                        text-align: center !important;
                        margin-bottom: 8px;
                    }
                }
            `}</style>
    </div>
  );
};

export default CustomNavbar;
