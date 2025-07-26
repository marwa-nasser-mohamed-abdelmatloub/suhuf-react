import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../components/shared/ThemeProvider';
import AnimatedTitle from '../components/shared/AnimatedTitle';
import { loginUser } from '../services/api';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/courses';

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

        try {
            const data = await loginUser(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // [REHAB] إذا كان المستخدم أدمن، redirect للداشبورد
            if (data.user && (data.user.is_staff || data.user.is_superuser)) {
                navigate('/admin-dashboard');
            } else {
                navigate(from, { replace: true });
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
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
                                    تسجيل الدخول
                                </AnimatedTitle>
                                <p className="text-muted">
                                    سجل دخولك للوصول إلى جميع الميزات
                                </p>
                            </div>

                            {error && (
                                <Alert variant="danger" className="text-center">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
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

                                <Form.Group className="mb-4">
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
                                    {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                                </Button>

                                <div className="text-center">
                                    <p className="mb-0">
                                        ليس لديك حساب؟{' '}
                                        <Link 
                                            to="/register"
                                            style={{ color: theme.primary, textDecoration: 'none' }}
                                        >
                                            سجل حساب جديد
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

export default LoginPage; 