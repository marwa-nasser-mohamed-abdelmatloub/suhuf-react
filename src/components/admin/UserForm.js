import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, FloatingLabel, Spinner, Alert } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import PrimaryButton from '../shared/PrimaryButton';
import { checkUsernameAvailability, checkEmailAvailability, checkPhoneAvailability } from '../../services/api';

const UserForm = ({
    show,
    handleClose,
    handleSubmit,
    initialData = {},
    isEdit = false,
    isSubmitting = false
}) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        phone_number: '',
        is_student: false,
        is_quran_teacher: false,
        password: '',
        confirm_password: '',
    });
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordHasText, setPasswordHasText] = useState(false);
    const [confirmPasswordHasText, setConfirmPasswordHasText] = useState(false);
    const [formError, setFormError] = useState('');
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.username || '',
                email: initialData.email || '',
                full_name: initialData.full_name || '',
                phone_number: initialData.phone_number || '',
                is_student: initialData.is_student || false,
                is_quran_teacher: initialData.is_quran_teacher || false,
                password: '',
                confirm_password: '',
            });
        }
        setErrors({});
        setValidated({});
        setFormError('');
    }, [initialData]);

    const checkAvailability = async (field, value) => {
        if (!value) return true;

        if (isEdit && initialData && value === initialData[field]) {
            return true;
        }
        if (isEdit && initialData && value !== initialData[field]) {
            setIsCheckingAvailability(true);
            try {
                let isAvailable = true;
                const id = initialData.id;
                if (field === 'username') {
                    isAvailable = await checkUsernameAvailability(value, id);
                } else if (field === 'email') {
                    isAvailable = await checkEmailAvailability(value, id);
                } else if (field === 'phone_number') {
                    isAvailable = await checkPhoneAvailability(value, id);
                }
                return isAvailable;
            } catch (error) {
                console.error('Error checking availability:', error);
                return false;
            } finally {
                setIsCheckingAvailability(false);
            }
        }
        if (!isEdit) {
            setIsCheckingAvailability(true);
            try {
                let isAvailable = true;
                if (field === 'username') {
                    isAvailable = await checkUsernameAvailability(value);
                } else if (field === 'email') {
                    isAvailable = await checkEmailAvailability(value);
                } else if (field === 'phone_number') {
                    isAvailable = await checkPhoneAvailability(value);
                }
                return isAvailable;
            } catch (error) {
                console.error('Error checking availability:', error);
                return false;
            } finally {
                setIsCheckingAvailability(false);
            }
        }
        return true;
    };

    const validateField = async (name, value) => {
        const newErrors = { ...errors };
        const newValidated = { ...validated };
        const phoneRegex = /^01[0125][0-9]{8}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

        if (name === 'username') {
            if (!value.trim()) {
                newErrors.username = 'اسم المستخدم مطلوب';
                newValidated.username = false;
            } else if (value.length < 4) {
                newErrors.username = 'يجب أن يكون اسم المستخدم 4 أحرف على الأقل';
                newValidated.username = false;
            } else {
                const isAvailable = await checkAvailability('username', value);
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
                const isAvailable = await checkAvailability('email', value);
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
                const isAvailable = await checkAvailability('phone_number', value);
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
            if (!value) {
                newErrors.password = 'كلمة المرور مطلوبة';
                newValidated.password = false;
            } else if (!passwordRegex.test(value)) {
                newErrors.password = 'يجب أن تحتوي على حرف صغير وكبير ورقم ورمز خاص، و8 أحرف على الأقل';
                newValidated.password = false;
            } else {
                delete newErrors.password;
                newValidated.password = true;
            }
        }

        if (name === 'confirm_password') {
            if (!value) {
                newErrors.confirm_password = 'تأكيد كلمة المرور مطلوب';
                newValidated.confirm_password = false;
            } else if (value !== formData.password) {
                newErrors.confirm_password = 'كلمات المرور غير متطابقة';
                newValidated.confirm_password = false;
            } else {
                delete newErrors.confirm_password;
                newValidated.confirm_password = true;
            }
        }

        setErrors(newErrors);
        setValidated(newValidated);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: fieldValue
        }));

        if (name === 'password') {
            setPasswordHasText(value.length > 0);
        } else if (name === 'confirm_password') {
            setConfirmPasswordHasText(value.length > 0);
        }
    };

    const handleBlur = async (e) => {
        const { name, value } = e.target;
        await validateField(name, value);
    };

    const validateForm = async () => {
        let isValid = true;
        const fieldsToValidate = ['username', 'email', 'phone_number', 'full_name', 'password', 'confirm_password'];

        for (const field of fieldsToValidate) {
            await validateField(field, formData[field]);
            if (errors[field]) {
                isValid = false;
            }
        }

        return isValid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        const isValid = await validateForm();
        if (!isValid) {
            setFormError('يوجد أخطاء في النموذج، يرجى تصحيحها قبل الإرسال');
            return;
        }

        try {
            const submitData = { ...formData };
            await handleSubmit(submitData);
        } catch (error) {
            setFormError(error.message || 'حدث خطأ أثناء حفظ البيانات');
        }
    };

    const isFormValid = () => {
        return Object.keys(errors).length === 0 &&
            formData.username &&
            formData.email &&
            formData.full_name &&
            formData.phone_number &&
            formData.password &&
            formData.confirm_password &&
            !isCheckingAvailability;
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="user-form-modal-responsive">
            <Modal.Header style={{ backgroundColor: theme.primary, color: theme.light }}>
                <Modal.Title>
                    <i className={isEdit ? 'fas fa-user-edit ms-2' : 'fas fa-user-plus ms-2'}></i>
                    {isEdit ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formError && (
                    <Alert variant="danger" onClose={() => setFormError('')} dismissible className="mb-4">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {formError}
                    </Alert>
                )}

                <Form onSubmit={onSubmit} className="user-form-responsive">
                    <FloatingLabel controlId="username" label="اسم المستخدم" className="mb-3 position-relative">
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isEdit || isCheckingAvailability}
                            placeholder="اسم المستخدم"
                            isInvalid={!!errors.username}
                            isValid={validated.username}
                            style={{ minWidth: 0 }}
                        />
                        {isCheckingAvailability && (
                            <div className="position-absolute" style={{ top: '50%', right: '0.75rem', transform: 'translateY(-50%)' }}>
                                <Spinner animation="border" size="sm" />
                            </div>
                        )}
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="email" label="البريد الإلكتروني" className="mb-3 position-relative">
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isEdit || isCheckingAvailability}
                            placeholder="البريد الإلكتروني"
                            isInvalid={!!errors.email}
                            isValid={validated.email}
                            style={{ minWidth: 0 }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="full_name" label="الاسم الكامل" className="mb-3">
                        <Form.Control
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="الاسم الكامل"
                            isInvalid={!!errors.full_name}
                            isValid={validated.full_name}
                            style={{ minWidth: 0 }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.full_name}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="phone_number" label="رقم الهاتف" className="mb-3 position-relative">
                        <Form.Control
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isEdit || isCheckingAvailability}
                            placeholder="رقم الهاتف"
                            isInvalid={!!errors.phone_number}
                            isValid={validated.phone_number}
                            style={{ minWidth: 0 }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone_number}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Label>نوع المستخدم</Form.Label>
                        <div className="d-flex flex-column flex-md-row gap-2 gap-md-4">
                            <Form.Check
                                type="radio"
                                id="student"
                                label="طالب"
                                name="userType"
                                checked={formData.is_student}
                                onChange={() => setFormData({
                                    ...formData,
                                    is_student: true,
                                    is_quran_teacher: false,
                                })}
                                disabled={isSubmitting}
                            />
                            <Form.Check
                                type="radio"
                                id="teacher"
                                label="مدرس"
                                name="userType"
                                checked={formData.is_quran_teacher}
                                onChange={() => setFormData({
                                    ...formData,
                                    is_student: false,
                                    is_quran_teacher: true,
                                })}
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form.Group>

                    <FloatingLabel controlId="password" label="كلمة المرور" className="mb-3 position-relative">
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="كلمة المرور"
                            isInvalid={!!errors.password}
                            isValid={validated.password}
                            style={{
                                paddingRight: passwordHasText ? '3.5rem' : '2rem',
                                minWidth: 0,
                                height: 'calc(3.5rem + 2px)'
                            }}
                        />
                        {passwordHasText && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    top: '35%',
                                    right: '1.5rem',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    padding: '0.375rem',
                                    color: '#6c757d',
                                    cursor: 'pointer'
                                }}
                            >
                                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                            </button>
                        )}
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="confirm_password" label="تأكيد كلمة المرور" className="mb-3 position-relative">
                        <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="تأكيد كلمة المرور"
                            isInvalid={!!errors.confirm_password}
                            isValid={validated.confirm_password}
                            style={{
                                paddingRight: confirmPasswordHasText ? '3.5rem' : '2rem',
                                minWidth: 0,
                                height: 'calc(3.5rem + 2px)'
                            }}
                        />
                        {confirmPasswordHasText && (
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    top: '35%',
                                    right: '1.5rem',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    padding: '0.375rem',
                                    color: '#6c757d',
                                    cursor: 'pointer'
                                }}
                            >
                                <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                            </button>
                        )}
                        <Form.Control.Feedback type="invalid">
                            {errors.confirm_password}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <div className="d-flex flex-column flex-md-row justify-content-end gap-2 gap-md-3 mt-4">
                        <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                            إلغاء
                        </Button>
                        <PrimaryButton type="submit" disabled={isSubmitting || !isFormValid()}>
                            {isSubmitting ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    {isEdit ? 'جاري الحفظ...' : 'جاري الإضافة...'}
                                </>
                            ) : isEdit ? (
                                'حفظ التعديلات'
                            ) : (
                                'إضافة المستخدم'
                            )}
                        </PrimaryButton>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UserForm;