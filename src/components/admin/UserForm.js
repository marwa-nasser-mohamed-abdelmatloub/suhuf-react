import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import PrimaryButton from '../shared/PrimaryButton';

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
        credit: 0,
        password: '',
        confirm_password: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.username || '',
                email: initialData.email || '',
                full_name: initialData.full_name || '',
                phone_number: initialData.phone_number || '',
                is_student: initialData.is_student || false,
                is_quran_teacher: initialData.is_quran_teacher || false,
                credit: initialData.credit || 0,
                password: '',
                confirm_password: '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const submitData = { ...formData };
        if (isEdit) {
            delete submitData.password;
            delete submitData.confirm_password;
        } else {
            if (formData.password !== formData.confirm_password) {
                alert('كلمة المرور وتأكيدها غير متطابقين');
                return;
            }
        }
        handleSubmit(submitData);
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
                <Form onSubmit={onSubmit} className="user-form-responsive">
                    <FloatingLabel controlId="username" label="اسم المستخدم" className="mb-3">
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={isEdit}
                            placeholder="اسم المستخدم"
                            style={{ minWidth: 0 }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="email" label="البريد الإلكتروني" className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="البريد الإلكتروني"
                            style={{ minWidth: 0 }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="full_name" label="الاسم الكامل" className="mb-3">
                        <Form.Control
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="الاسم الكامل"
                            style={{ minWidth: 0 }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="phone_number" label="رقم الهاتف" className="mb-3">
                        <Form.Control
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                            placeholder="رقم الهاتف"
                            style={{ minWidth: 0 }}
                        />
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
                                onChange={() =>
                                    setFormData({
                                        ...formData,
                                        is_student: true,
                                        is_quran_teacher: false,
                                    })
                                }
                                disabled={isSubmitting}
                            />
                            <Form.Check
                                type="radio"
                                id="teacher"
                                label="مدرس"
                                name="userType"
                                checked={formData.is_quran_teacher}
                                onChange={() =>
                                    setFormData({
                                        ...formData,
                                        is_student: false,
                                        is_quran_teacher: true,
                                    })
                                }
                                disabled={isSubmitting}
                            />
                            <Form.Check
                                type="radio"
                                id="other"
                                label="آخر"
                                name="userType"
                                checked={!formData.is_student && !formData.is_quran_teacher}
                                onChange={() =>
                                    setFormData({
                                        ...formData,
                                        is_student: false,
                                        is_quran_teacher: false,
                                    })
                                }
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form.Group>

                    <FloatingLabel controlId="credit" label="الرصيد" className="mb-3">
                        <Form.Control
                            type="number"
                            name="credit"
                            value={formData.credit}
                            onChange={handleChange}
                            min="0"
                            placeholder="الرصيد"
                            disabled={isSubmitting}
                            style={{ minWidth: 0 }}
                        />
                    </FloatingLabel>

                    {!isEdit && (
                        <>
                            <FloatingLabel controlId="password" label="كلمة المرور" className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="كلمة المرور"
                                    disabled={isSubmitting}
                                    style={{ minWidth: 0 }}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="confirm_password" label="تأكيد كلمة المرور" className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    required
                                    placeholder="تأكيد كلمة المرور"
                                    disabled={isSubmitting}
                                    style={{ minWidth: 0 }}
                                />
                            </FloatingLabel>
                        </>
                    )}

                    <div className="d-flex flex-column flex-md-row justify-content-end gap-2 gap-md-3 mt-4">
                        <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                            إلغاء
                        </Button>
                        <PrimaryButton type="submit" disabled={isSubmitting}>
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
