import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/shared/ThemeProvider';
import AnimatedTitle from '../components/shared/AnimatedTitle';
import { registerUser } from '../services/api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        full_name: '',
        phone_number: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const theme = useTheme();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.password2) {
            setError('كلمات المرور غير متطابقة');
            setLoading(false);
            return;
        }

        try {
            const data = await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password2: formData.password2, // [REHAB] أضفت إرسال تأكيد كلمة المرور
                full_name: formData.full_name,
                phone_number: formData.phone_number
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/courses', { replace: true });
        } catch (error) {
            // اطبع كل تفاصيل الخطأ في الكونسول
            console.error('Registration error:', error);
            if (error.response && error.response.data) {
                // اطبع تفاصيل الخطأ في الكونسول
                console.error('Error response data:', error.response.data);
                // اعرض الرسالة للمستخدم بشكل واضح
                if (typeof error.response.data === 'string') {
                    setError(error.response.data);
                } else if (error.response.data.message) {
                    setError(error.response.data.message);
                } else if (error.response.data.errors) {
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    setError(errorMessages.join(', '));
                } else {
                    setError(JSON.stringify(error.response.data));
                }
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('حدث خطأ غير متوقع');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg" style={{
                        border: 'none',
                        borderRadius: '15px',
                        overflow: 'hidden'
                    }}>
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <AnimatedTitle level={2} style={{
                                    color: theme.primary,
                                    marginBottom: '10px'
                                }}>
                                    تسجيل حساب جديد
                                </AnimatedTitle>
                                <p className="text-muted">
                                    أنشئ حسابك للوصول إلى جميع الميزات
                                </p>
                            </div>

                            {error && (
                                <Alert variant="danger" className="text-center">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>اسم المستخدم</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: '10px' }}
                                                placeholder="أدخل اسم المستخدم"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>البريد الإلكتروني</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: '10px' }}
                                                placeholder="أدخل البريد الإلكتروني"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>الاسم الكامل</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: '10px' }}
                                                placeholder="أدخل الاسم الكامل"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>رقم الهاتف</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: '10px' }}
                                                placeholder="أدخل رقم الهاتف"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>كلمة المرور</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: '10px' }}
                                                placeholder="أدخل كلمة المرور"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>تأكيد كلمة المرور</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password2"
                                                value={formData.password2}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: '10px' }}
                                                placeholder="أعد إدخال كلمة المرور"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100 mb-3"
                                    disabled={loading}
                                    style={{
                                        borderRadius: '25px',
                                        padding: '12px',
                                        backgroundColor: theme.primary,
                                        borderColor: theme.primary
                                    }}
                                >
                                    {loading ? 'جاري التسجيل...' : 'تسجيل الحساب'}
                                </Button>

                                <div className="text-center">
                                    <p className="mb-0">
                                        لديك حساب بالفعل؟{' '}
                                        <Link 
                                            to="/login"
                                            style={{ color: theme.primary, textDecoration: 'none' }}
                                        >
                                            سجل دخولك
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage; 