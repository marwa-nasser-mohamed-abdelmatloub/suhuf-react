import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/shared/ThemeProvider';
import AnimatedTitle from '../components/shared/AnimatedTitle';
import AuthContext from '../contexts/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        full_name: '',
        phone_number: '',
        is_student: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const theme = useTheme();
    const navigate = useNavigate();
    const { login, isTeacher, isAuthenticated } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const [redirectAfterRegister, setRedirectAfterRegister] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.password2) {
            setError('كلمات المرور غير متطابقة');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
            setLoading(false);
            return;
        }

        try {
            const body = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                is_student: formData.is_student,
                is_quran_teacher: !formData.is_student
            };

            const response = await fetch('http://localhost:8000/api/accounts/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message ||
                    errorData.username?.[0] ||
                    errorData.email?.[0] ||
                    'حدث خطأ أثناء التسجيل'
                );
            }

            await login({ username: formData.username, password: formData.password });
            setRedirectAfterRegister(true);
        } catch (error) {
            setError(error.message || 'حدث خطأ غير متوقع أثناء التسجيل');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (redirectAfterRegister && isAuthenticated) {
            if (isTeacher) {
                navigate('/admin-dashboard');
            } else {
                navigate('/');
            }
        }
    }, [redirectAfterRegister, isAuthenticated, isTeacher, navigate]);

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
                                                minLength="8"
                                                style={{ borderRadius: '10px' }}
                                                placeholder="أدخل كلمة المرور (8 أحرف على الأقل)"
                                                autoComplete="new-password"
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
                                                autoComplete="new-password"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Check
                                        type="switch"
                                        id="role-switch"
                                        label="هل أنت معلم قرآن؟"
                                        name="is_student"
                                        checked={!formData.is_student}
                                        onChange={() => handleChange({
                                            target: {
                                                name: 'is_student',
                                                type: 'checkbox',
                                                checked: !formData.is_student
                                            }
                                        })}
                                    />
                                </Form.Group>

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