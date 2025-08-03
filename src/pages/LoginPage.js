import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../components/shared/ThemeProvider';
import AnimatedTitle from '../components/shared/AnimatedTitle';
import AuthContext from '../contexts/AuthContext';

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

    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { login, isAuthenticated, user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData);
        } catch (error) {
            setError(error.message || 'خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    const { isTeacher } = useContext(AuthContext);
    useEffect(() => {
        if (isAuthenticated && user) {
            if (isTeacher) {
                navigate('/admin-dashboard', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        }
    }, [isAuthenticated, isTeacher, user, navigate, from]);

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
                                        autoComplete="current-password"
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