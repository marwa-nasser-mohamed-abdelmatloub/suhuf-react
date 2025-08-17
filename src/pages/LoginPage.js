import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../components/shared/ThemeProvider';
import Logo from '../components/shared/Logo';
import PrimaryButton from '../components/shared/PrimaryButton';
import AuthContext from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { login, isAuthenticated, user, isTeacher } = useContext(AuthContext);

    const [passwordHasText, setPasswordHasText] = useState(false);

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        const newValidated = { ...validated };

        if (name === 'username') {
            if (!value.trim()) {
                newErrors.username = 'اسم المستخدم مطلوب';
                newValidated.username = false;
            } else if (value.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                newErrors.username = 'البريد الإلكتروني غير صالح';
                newValidated.username = false;
            } else {
                delete newErrors.username;
                newValidated.username = true;
            }
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
            if (!value) {
                newErrors.password = 'كلمة المرور مطلوبة';
                newValidated.password = false;
            } else if (!passwordRegex.test(value)) {
                newErrors.password = 'يجب أن تحتوي كلمة المرور على حرف صغير وحرف كبير ورقم ورمز خاص، وطولها 8 أحرف على الأقل';
                newValidated.password = false;
            } else {
                delete newErrors.password;
                newValidated.password = true;
            }
        }

        setErrors(newErrors);
        setValidated(newValidated);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'password') {
            setPasswordHasText(value.length > 0);
        }

        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        const newValidated = {};

        if (!formData.username.trim()) {
            newErrors.username = 'اسم المستخدم مطلوب';
            newValidated.username = false;
            isValid = false;
        } else if (formData.username.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
            newErrors.username = 'البريد الإلكتروني غير صالح';
            newValidated.username = false;
            isValid = false;
        } else {
            newValidated.username = true;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!formData.password) {
            newErrors.password = 'كلمة المرور مطلوبة';
            newValidated.password = false;
            isValid = false;
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'يجب أن تحتوي كلمة المرور على حرف صغير وحرف كبير ورقم ورمز خاص، وطولها 8 أحرف على الأقل';
            newValidated.password = false;
            isValid = false;
        } else {
            newValidated.password = true;
        }

        setErrors(newErrors);
        setValidated(newValidated);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await login(formData);
            Swal.fire({
                icon: 'success',
                title: 'تم تسجيل الدخول بنجاح',
                showConfirmButton: false,
                timer: 1500,
                background: theme.secondary,
                color: theme.text
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ في تسجيل الدخول',
                text: error.message || 'بيانات الدخول غير صحيحة',
                confirmButtonColor: theme.primary,
                background: theme.secondary,
                color: theme.text
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            const redirectPath = isTeacher ? '/admin' : from;
            navigate(redirectPath, { replace: true });
        }
    }, [isAuthenticated, isTeacher, user, navigate, from]);

    return (
        <Container className="d-flex flex-column justify-content-center min-vh-100 py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                    <Card className="shadow-lg border-0" style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        background: theme.light
                    }}>
                        <Card.Body>
                            <div className="text-center mb-4">
                                <Logo size="md" className="mb-4" />
                                <h2 style={{
                                    color: theme.primary,
                                    fontWeight: '700',
                                    marginBottom: '10px'
                                }}>
                                    مرحباً بعودتك
                                </h2>
                                <p style={{ color: theme.muted }}>
                                    سجل دخولك للوصول إلى حسابك
                                </p>
                            </div>

                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: '500' }}>اسم المستخدم</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.username}
                                            isValid={validated.username}
                                            style={{
                                                borderRadius: '12px',
                                                padding: '12px 0',
                                                textAlign: 'center',
                                                borderColor: errors.username ? theme.danger : validated.username ? theme.success : '#ddd'
                                            }}
                                            placeholder="أدخل اسم المستخدم"
                                        />
                                        {validated.username && (
                                            <InputGroup.Text style={{
                                                position: 'absolute',
                                                left: '12px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'transparent',
                                                border: 'none',
                                                zIndex: 5,
                                                padding: 0
                                            }}>
                                            </InputGroup.Text>
                                        )}
                                    </InputGroup>
                                    {errors.username && (
                                        <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
                                            {errors.username}
                                        </div>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: '500' }}>كلمة المرور</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.password}
                                            isValid={validated.password}
                                            style={{
                                                borderRadius: '12px',
                                                padding: '12px 0px',
                                                textAlign: 'center',
                                                borderColor: errors.password ? theme.danger : validated.password ? theme.success : '#ddd'
                                            }}
                                            placeholder="أدخل كلمة المرور"
                                        />
                                        {validated.password && (
                                            <InputGroup.Text style={{
                                                position: 'absolute',
                                                left: '12px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'transparent',
                                                border: 'none',
                                                zIndex: 5,
                                                padding: 0
                                            }}>
                                            </InputGroup.Text>
                                        )}
                                        {passwordHasText && (
                                            <span
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '30px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    color: theme.muted,
                                                    zIndex: 5,
                                                    padding: '0 8px'
                                                }}
                                            >
                                                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} style={{ fontSize: '18px' }}></i>
                                            </span>
                                        )}
                                    </InputGroup>
                                    {errors.password && (
                                        <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
                                            {errors.password}
                                        </div>
                                    )}
                                </Form.Group>

                                <div className="d-flex align-items-center justify-content-center">
                                    <PrimaryButton
                                        type="submit"
                                        className="w-50 mb-3"
                                        disabled={loading}
                                        style={{
                                            fontSize: '1.1rem',
                                            padding: '14px',
                                        }}
                                    >
                                        {loading ? (
                                            <span className="d-flex align-items-center justify-content-center">
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                جاري تسجيل الدخول...
                                            </span>
                                        ) : 'تسجيل الدخول'}
                                    </PrimaryButton>
                                </div>

                                <div className="text-center mt-4" style={{ color: theme.muted }}>
                                    ليس لديك حساب؟{' '}
                                    <Link
                                        to="/register"
                                        style={{
                                            color: theme.primary,
                                            textDecoration: 'none',
                                            fontWeight: '600'
                                        }}
                                    >
                                        سجل حساب جديد
                                    </Link>
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