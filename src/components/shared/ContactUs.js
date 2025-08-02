import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactUs = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="py-5" dir="rtl">
            <Container>
                <h2 className="text-center mb-3">تواصل معنا</h2>
                <p className="text-center text-muted mb-5">نحن سعداء بالتواصل معكم لأي استفسارات أو اقتراحات.</p>

                {/* معلومات التواصل */}
                <Row className="mb-5">
                    <Col md={4} className="text-center mb-4">
                        <i className="bi bi-telephone-fill fs-2 text-success mb-2"></i>
                        <h5>رقم الهاتف</h5>
                        <p>+20 01080290663</p>
                    </Col>

                    <Col md={4} className="text-center mb-4">
                        <i className="bi bi-envelope-fill fs-2 text-primary mb-2"></i>
                        <h5>البريد الإلكتروني</h5>
                        <p>info@domain.com</p>
                    </Col>

                    <Col md={4} className="text-center mb-4">
                        <i className="bi bi-geo-alt-fill fs-2 text-danger mb-2"></i>
                        <h5>العنوان</h5>
                        <p>المنيا، مصر</p>
                    </Col>
                </Row>

                {/* نموذج الإرسال */}
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form
                            action="https://formsubmit.co/marwa.nasser8133@gmail.com"
                            method="POST"
                            onSubmit={handleSubmit}
                            className="p-4 border rounded shadow-sm bg-light"
                        >
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value={window.location.href} />

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>الاسم</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="اكتب اسمك"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>البريد الإلكتروني</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label>الرسالة</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    rows={5}
                                    placeholder="اكتب رسالتك هنا..."
                                    required
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button type="submit" variant="primary" className="px-5">
                                    إرسال
                                </Button>
                            </div>

                            {submitted && (
                                <Alert variant="success" className="mt-3 text-center">
                                    ✅ تم إرسال رسالتك بنجاح!
                                </Alert>
                            )}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ContactUs;
