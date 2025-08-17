import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/shared/ThemeProvider';
import Logo from '../components/shared/Logo';
import PrimaryButton from '../components/shared/PrimaryButton';
import AuthContext from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import { checkUsernameAvailability, checkEmailAvailability, checkPhoneAvailability } from '../services/api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        full_name: '',
        phone_number: ''
    });
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [passwordHasText, setPasswordHasText] = useState(false);
    const [password2HasText, setPassword2HasText] = useState(false);
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const { login, isTeacher, isAuthenticated } = useContext(AuthContext);

    const validateField = async (name, value) => {
        const newErrors = { ...errors };
        const newValidated = { ...validated };
        const phoneRegex = /^01[0125][0-9]{8}$/;

        if (name === 'username') {
            if (!value.trim()) {
                newErrors.username = 'اسم المستخدم مطلوب';
                newValidated.username = false;
            } else if (value.length < 4) {
                newErrors.username = 'يجب أن يكون اسم المستخدم 4 أحرف على الأقل';
                newValidated.username = false;
            } else {
                setIsCheckingAvailability(true);
                const isAvailable = await checkUsernameAvailability(value);
                setIsCheckingAvailability(false);
                if (!isAvailable) {
                    newErrors.username = 'اسم المستخدم غير متاح';
                    newValidated.username = false;
                } else {
                    delete newErrors.username;
                    newValidated.username = true;
                }
            }
        }

        if (name === 'email') {
            if (!value) {
                newErrors.email = 'البريد الإلكتروني مطلوب';
                newValidated.email = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                newErrors.email = 'بريد إلكتروني غير صالح';
                newValidated.email = false;
            } else {
                setIsCheckingAvailability(true);
                const isAvailable = await checkEmailAvailability(value);
                setIsCheckingAvailability(false);
                if (!isAvailable) {
                    newErrors.email = 'البريد الإلكتروني غير متاح';
                    newValidated.email = false;
                } else {
                    delete newErrors.email;
                    newValidated.email = true;
                }
            }
        }

        if (name === 'full_name') {
            if (!value) {
                newErrors.full_name = 'الاسم الكامل مطلوب';
                newValidated.full_name = false;
            } else if (value.length < 4) {
                newErrors.full_name = 'يجب أن يكون الاسم 4 أحرف على الأقل';
                newValidated.full_name = false;
            } else {
                delete newErrors.full_name;
                newValidated.full_name = true;
            }
        }

        if (name === 'phone_number') {
            if (!value) {
                newErrors.phone_number = 'رقم الهاتف مطلوب';
                newValidated.phone_number = false;
            } else if (!phoneRegex.test(value)) {
                newErrors.phone_number = 'رقم هاتف غير صالح (يجب أن يبدأ بـ 01)';
                newValidated.phone_number = false;
            } else {
                setIsCheckingAvailability(true);
                const isAvailable = await checkPhoneAvailability(value);
                setIsCheckingAvailability(false);
                if (!isAvailable) {
                    newErrors.phone_number = 'رقم الهاتف غير متاح';
                    newValidated.phone_number = false;
                } else {
                    delete newErrors.phone_number;
                    newValidated.phone_number = true;
                }
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

        if (name === 'password2') {
            if (!value) {
                newErrors.password2 = 'تأكيد كلمة المرور مطلوب';
                newValidated.password2 = false;
            } else if (value !== formData.password) {
                newErrors.password2 = 'كلمات المرور غير متطابقة';
                newValidated.password2 = false;
            } else {
                delete newErrors.password2;
                newValidated.password2 = true;
            }
        }

        setErrors(newErrors);
        setValidated(newValidated);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'password') {
            setPasswordHasText(value.length > 0);
        } else if (name === 'password2') {
            setPassword2HasText(value.length > 0);
        }

        validateField(name, type === 'checkbox' ? checked : value);
    };

    const handleBlur = async (e) => {
        const { name, value } = e.target;
        await validateField(name, value);
    };

    const validateForm = async () => {
        let isValid = true;
        const newErrors = {};
        const newValidated = {};
        const phoneRegex = /^01[0125][0-9]{8}$/;

        if (!formData.username.trim()) {
            newErrors.username = 'اسم المستخدم مطلوب';
            newValidated.username = false;
            isValid = false;
        } else if (formData.username.length < 4) {
            newErrors.username = 'يجب أن يكون اسم المستخدم 4 أحرف على الأقل';
            newValidated.username = false;
            isValid = false;
        } else {
            const isAvailable = await checkUsernameAvailability(formData.username);
            if (!isAvailable) {
                newErrors.username = 'اسم المستخدم غير متاح';
                newValidated.username = false;
                isValid = false;
            } else {
                newValidated.username = true;
            }
        }

        if (!formData.email) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
            newValidated.email = false;
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'بريد إلكتروني غير صالح';
            newValidated.email = false;
            isValid = false;
        } else {
            const isAvailable = await checkEmailAvailability(formData.email);
            if (!isAvailable) {
                newErrors.email = 'البريد الإلكتروني غير متاح';
                newValidated.email = false;
                isValid = false;
            } else {
                newValidated.email = true;
            }
        }

        if (!formData.full_name) {
            newErrors.full_name = 'الاسم الكامل مطلوب';
            newValidated.full_name = false;
            isValid = false;
        } else if (formData.full_name.length < 4) {
            newErrors.full_name = 'يجب أن يكون الاسم 4 أحرف على الأقل';
            newValidated.full_name = false;
            isValid = false;
        } else {
            newValidated.full_name = true;
        }

        if (!formData.phone_number) {
            newErrors.phone_number = 'رقم الهاتف مطلوب';
            newValidated.phone_number = false;
            isValid = false;
        } else if (!phoneRegex.test(formData.phone_number)) {
            newErrors.phone_number = 'رقم هاتف غير صالح (يجب أن يبدأ بـ 01)';
            newValidated.phone_number = false;
            isValid = false;
        } else {
            const isAvailable = await checkPhoneAvailability(formData.phone_number);
            if (!isAvailable) {
                newErrors.phone_number = 'رقم الهاتف غير متاح';
                newValidated.phone_number = false;
                isValid = false;
            } else {
                newValidated.phone_number = true;
            }
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

        if (!formData.password2) {
            newErrors.password2 = 'تأكيد كلمة المرور مطلوب';
            newValidated.password2 = false;
            isValid = false;
        } else if (formData.password !== formData.password2) {
            newErrors.password2 = 'كلمات المرور غير متطابقة';
            newValidated.password2 = false;
            isValid = false;
        } else {
            newValidated.password2 = true;
        }

        setErrors(newErrors);
        setValidated(newValidated);
        return isValid;
    };

    const [redirectAfterRegister, setRedirectAfterRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!await validateForm()) return;

        setLoading(true);
        setErrors({});
        try {
            const body = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.password2,
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                is_student: true,
                is_quran_teacher: false
            };

            const response = await fetch('http://localhost:8000/api/accounts/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const fieldErrors = {};
                if (errorData.username) fieldErrors.username = errorData.username[0];
                if (errorData.email) fieldErrors.email = errorData.email[0];
                if (errorData.phone_number) fieldErrors.phone_number = errorData.phone_number[0];
                setErrors(prev => ({ ...prev, ...fieldErrors }));
                throw new Error(
                    errorData.message ||
                    errorData.username?.[0] ||
                    errorData.email?.[0] ||
                    errorData.phone_number?.[0] ||
                    'حدث خطأ أثناء التسجيل'
                );
            }

            await Swal.fire({
                icon: 'success',
                title: 'تم التسجيل بنجاح!',
                text: 'جاري تسجيل دخولك تلقائياً...',
                showConfirmButton: false,
                timer: 1500,
                background: theme.secondary,
                color: theme.text
            });

            await login({ username: formData.username, password: formData.password });
            setRedirectAfterRegister(true);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (redirectAfterRegister && isAuthenticated) {
            navigate(isTeacher ? '/admin' : '/', { replace: true });
        }
    }, [redirectAfterRegister, isAuthenticated, isTeacher, navigate]);

    return (
        <Container className="d-flex flex-column justify-content-center min-vh-100 py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8} xl={7}>
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
                                    انضم إلينا اليوم
                                </h2>
                                <p style={{ color: theme.muted }}>
                                    أنشئ حسابك للوصول إلى جميع الميزات
                                </p>
                            </div>

                            <Form onSubmit={handleSubmit} noValidate>
                                <Row>
                                    <Col md={6}>
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
                                                {isCheckingAvailability && (
                                                    <span
                                                        style={{
                                                            position: 'absolute',
                                                            right: '30px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            color: theme.muted,
                                                            zIndex: 5,
                                                            padding: '0 8px'
                                                        }}
                                                    >
                                                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '18px' }}></i>
                                                    </span>
                                                )}
                                            </InputGroup>
                                            {errors.username && (
                                                <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
                                                    {errors.username}
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '500' }}>البريد الإلكتروني</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={!!errors.email}
                                                    isValid={validated.email}
                                                    style={{
                                                        borderRadius: '12px',
                                                        padding: '12px 0',
                                                        textAlign: 'center',
                                                        borderColor: errors.email ? theme.danger : validated.email ? theme.success : '#ddd'
                                                    }}
                                                    placeholder="أدخل البريد الإلكتروني"
                                                />
                                                {isCheckingAvailability && (
                                                    <span
                                                        style={{
                                                            position: 'absolute',
                                                            right: '30px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            color: theme.muted,
                                                            zIndex: 5,
                                                            padding: '0 8px'
                                                        }}
                                                    >
                                                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '18px' }}></i>
                                                    </span>
                                                )}
                                            </InputGroup>
                                            {errors.email && (
                                                <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
                                                    {errors.email}
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '500' }}>الاسم الكامل</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    type="text"
                                                    name="full_name"
                                                    value={formData.full_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={!!errors.full_name}
                                                    isValid={validated.full_name}
                                                    style={{
                                                        borderRadius: '12px',
                                                        padding: '12px 0',
                                                        textAlign: 'center',
                                                        borderColor: errors.full_name ? theme.danger : validated.full_name ? theme.success : '#ddd'
                                                    }}
                                                    placeholder="أدخل الاسم الكامل"
                                                />
                                            </InputGroup>
                                            {errors.full_name && (
                                                <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
                                                    {errors.full_name}
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '500' }}>رقم الهاتف</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    type="tel"
                                                    name="phone_number"
                                                    value={formData.phone_number}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={!!errors.phone_number}
                                                    isValid={validated.phone_number}
                                                    style={{
                                                        borderRadius: '12px',
                                                        padding: '12px 0',
                                                        textAlign: 'center',
                                                        borderColor: errors.phone_number ? theme.danger : validated.phone_number ? theme.success : '#ddd'
                                                    }}
                                                    placeholder="أدخل رقم الهاتف"
                                                />
                                                {isCheckingAvailability && (
                                                    <span
                                                        style={{
                                                            position: 'absolute',
                                                            right: '30px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            color: theme.muted,
                                                            zIndex: 5,
                                                            padding: '0 8px'
                                                        }}
                                                    >
                                                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '18px' }}></i>
                                                    </span>
                                                )}
                                            </InputGroup>
                                            {errors.phone_number && (
                                                <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
                                                    {errors.phone_number}
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
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
                                                        padding: '12px 0',
                                                        textAlign: 'center',
                                                        borderColor: errors.password ? theme.danger : validated.password ? theme.success : '#ddd'
                                                    }}
                                                    placeholder="أدخل كلمة المرور"
                                                />
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
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label style={{ fontWeight: '500' }}>تأكيد كلمة المرور</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    type={showPassword2 ? 'text' : 'password'}
                                                    name="password2"
                                                    value={formData.password2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={!!errors.password2}
                                                    isValid={validated.password2}
                                                    style={{
                                                        borderRadius: '12px',
                                                        padding: '12px 0',
                                                        textAlign: 'center',
                                                        borderColor: errors.password2 ? theme.danger : validated.password2 ? theme.success : '#ddd'
                                                    }}
                                                    placeholder="أعد إدخال كلمة المرور"
                                                />
                                                {password2HasText && (
                                                    <span
                                                        onClick={() => setShowPassword2(!showPassword2)}
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
                                                        <i className={showPassword2 ? 'fas fa-eye-slash' : 'fas fa-eye'} style={{ fontSize: '18px' }}></i>
                                                    </span>
                                                )}
                                            </InputGroup>
                                            {errors.password2 && (
                                                <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
                                                    {errors.password2}
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-flex align-items-center justify-content-center">
                                    <PrimaryButton
                                        type="submit"
                                        className="w-50 mb-3"
                                        disabled={loading || isCheckingAvailability}
                                        style={{
                                            fontSize: '1.1rem',
                                            padding: '14px'
                                        }}
                                    >
                                        {loading ? (
                                            <span className="d-flex align-items-center justify-content-center">
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                جاري إنشاء الحساب...
                                            </span>
                                        ) : 'تسجيل الحساب'}
                                    </PrimaryButton>
                                </div>

                                <div className="text-center mt-4" style={{ color: theme.muted }}>
                                    لديك حساب بالفعل؟{' '}
                                    <Link
                                        to="/login"
                                        style={{
                                            color: theme.primary,
                                            textDecoration: 'none',
                                            fontWeight: '600'
                                        }}
                                    >
                                        سجل دخولك
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

export default RegisterPage;