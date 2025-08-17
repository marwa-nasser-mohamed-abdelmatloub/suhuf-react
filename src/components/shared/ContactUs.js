import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        const newErrors = { ...errors };

        if (formData.name && !formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب';
        } else if (errors.name && formData.name.trim()) {
            delete newErrors.name;
        }

        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صالح';
        } else if (errors.email && emailRegex.test(formData.email)) {
            delete newErrors.email;
        }

        if (formData.message && !formData.message.trim()) {
            newErrors.message = 'الرسالة مطلوبة';
        } else if (errors.message && formData.message.trim()) {
            delete newErrors.message;
        }

        setErrors(newErrors);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صالح';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'الرسالة مطلوبة';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 4000);
    };

    return (
        <div className="py-5" dir="rtl">
            <Container>
                <h2 className="text-center mb-3">تواصل معنا</h2>
                <p className="text-center text-muted mb-5">نحن سعداء بالتواصل معكم لأي استفسارات أو اقتراحات.</p>

                <Row className="mb-5">
                    <Col md={4} className="text-center mb-4">
                        <i className="bi bi-telephone-fill fs-2 text-success mb-2"></i>
                        <h5>رقم الهاتف</h5>
                        <p dir='ltr'>(+20)01080290663</p>
                    </Col>

                    <Col md={4} className="text-center mb-4">
                        <i className="bi bi-envelope-fill fs-2 text-primary mb-2"></i>
                        <h5>البريد الإلكتروني</h5>
                        <p>sohofacademy1@gmail.com</p>
                    </Col>

                    <Col md={4} className="text-center mb-4">
                        <i className="bi bi-geo-alt-fill fs-2 text-danger mb-2"></i>
                        <h5>العنوان</h5>
                        <p>مصر</p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form
                            action="https://formsubmit.co/sohofacademy1@gmail.com"
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
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="اكتب اسمك"
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>البريد الإلكتروني</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="بريدك الإلكتروني"
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label>الرسالة</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="اكتب رسالتك هنا..."
                                    isInvalid={!!errors.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="text-center">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="px-5"
                                    disabled={Object.keys(errors).length > 0 ||
                                        !formData.name ||
                                        !formData.email ||
                                        !formData.message}
                                >
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
