import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useTheme } from "./ThemeProvider";
import PrimaryButton from "./PrimaryButton";
import Logo from "./Logo";

const Footer = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (email && !emailRegex.test(email)) {
      setEmailError("البريد الإلكتروني غير صالح");
    } else {
      setEmailError("");
    }
  }, [email]);

  return (
    <>
      <footer
        style={{
          backgroundColor: theme.dark,
          color: theme.light,
          padding: "50px 0",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <Container>
          <Row className="gy-4" style={{ alignItems: "flex-start" }}>
            <Col xs={12} sm={6} md={3} style={{ marginTop: "-40px" }}>
              <div style={{ marginBottom: "-50px" }}>
                <Logo size="md" />
              </div>
              <p
                style={{
                  color: theme.secondary,
                  marginTop: "1rem",
                }}
              >
                أكاديمية متخصصة في تعليم القرآن الكريم والتجويد للأطفال والكبار
                من خلال الإنترنت.
              </p>
              <div className="d-flex gap-3 mt-3 justify-content-start">
                <a
                  href="https://www.facebook.com/share/1B1LDRsnQa/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    className="bi bi-facebook"
                    style={{
                      color: theme.primary,
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  ></i>
                </a>
                <a
                  href="https://www.instagram.com/sohofacademy?igsh=MTU0cG43aTMxcDVtNg=="
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    className="bi bi-instagram"
                    style={{
                      color: theme.primary,
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  ></i>
                </a>
                <a
                  href="https://wa.me/201112922085"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    className="bi bi-telephone"
                    style={{
                      color: theme.primary,
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  ></i>
                </a>
                <a
                  href="https://wa.me/201112922085"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    className="bi bi-whatsapp"
                    style={{
                      color: theme.primary,
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  ></i>
                </a>
              </div>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <h5 style={{ fontWeight: "bold" }}>خدمات الأكاديمية</h5>
              <div
                style={{
                  height: 2,
                  width: 30,
                  backgroundColor: theme.primary,
                  margin: "10px 0",
                }}
              ></div>
              <ul
                className="list-unstyled"
                style={{
                  color: theme.secondary,
                  paddingRight: 0,
                  marginRight: 0,
                  textAlign: "right",
                }}
              >
                <li>
                  <i className="bi bi-bullseye"></i> برنامج الحفظ والمراجعة
                </li>
                <li>
                  <i className="bi bi-people"></i> حصص أونلاين (فردية أو جماعية)
                </li>
                <li>
                  <i className="bi bi-book"></i> برنامج التلاوة الصحيحة
                </li>
                <li>
                  <i className="bi bi-pencil-square"></i> برنامج القراءة من
                  الصفر
                </li>
                <li>
                  <i className="bi bi-moon-stars"></i> قسم الإسلاميات
                </li>
              </ul>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <h5 style={{ fontWeight: "bold" }}>معلومات التواصل</h5>
              <div
                style={{
                  height: 2,
                  width: 30,
                  backgroundColor: theme.primary,
                  margin: "10px 0",
                }}
              ></div>
              <ul
                className="list-unstyled"
                style={{
                  color: theme.secondary,
                  paddingRight: 0,
                  marginRight: 0,
                  textAlign: "right",
                }}
              >
                <li>
                  <i className="bi bi-geo-alt"></i> مصر
                </li>
                <li>
                  <i className="bi bi-telephone"></i>{" "}
                  <i className="bi bi-whatsapp"></i>{" "}
                  <span dir="ltr">(+20)1112922085</span>
                </li>
                <li>
                  <i className="bi bi-whatsapp"></i>{" "}
                  <span dir="ltr">(+20)1080290663</span>
                </li>
                <li>
                  <i className="bi bi-envelope"></i> sohofacademy1@gmail.com
                </li>
              </ul>
            </Col>

            {/* === الاشتراك بالإيميل === */}
            <Col xs={12} sm={6} md={3}>
              <div style={{ border: "1px solid white", padding: 20 }}>
                <h5 style={{ fontWeight: "bold" }}>اشترك الآن</h5>
                <div
                  style={{
                    height: 2,
                    width: 30,
                    backgroundColor: theme.primary,
                    margin: "10px 0 20px",
                  }}
                ></div>

                <Form
                  action="https://formsubmit.co/sohofacademy1@gmail.com"
                  method="POST"
                  onSubmit={(e) => {
                    if (emailError || !email) {
                      e.preventDefault();
                    } else {
                      setSubmitted(true);
                      setTimeout(() => {
                        setSubmitted(false);
                        setEmail("");
                      }, 4000);
                    }
                  }}
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_next"
                    value={window.location.href}
                  />

                  <Form.Group controlId="formEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="بريدك الإلكتروني"
                      isInvalid={!!emailError}
                      className="text-end"
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <PrimaryButton
                    type="submit"
                    className="mt-3 w-100"
                    disabled={!!emailError || !email}
                  >
                    اشترك الآن
                  </PrimaryButton>

                  {submitted && (
                    <Alert variant="success" className="mt-3 text-center">
                      ✅ تم إرسال رسالتك بنجاح!
                    </Alert>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      <div
        style={{
          backgroundColor: theme.primary,
          padding: "10px 0",
          color: theme.light,
          direction: "rtl",
        }}
      >
        <Container style={{ textAlign: "start" }}>
          جميع الحقوق محفوظة © 2025
        </Container>
      </div>
    </>
  );
};

export default Footer;
