import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useTheme } from '../../components/shared/ThemeProvider';
import PrimaryButton from '../../components/shared/PrimaryButton';

const ProgramForm = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    initialData = {},
    isEdit = false
}) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: '',
        price: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData({
            name: initialData.name || '',
            description: initialData.description || '',
            duration: initialData.duration || '',
            price: initialData.price || ''
        });
        setErrors({});
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let error = '';

        switch (fieldName) {
            case 'name':
                if (!value.trim()) error = 'اسم البرنامج مطلوب';
                else if (value.trim().length < 3) error = 'يجب أن يكون الاسم 3 أحرف على الأقل';
                break;
            case 'description':
                if (!value.trim()) error = 'الوصف مطلوب';
                else if (value.trim().length < 10) error = 'يجب أن يكون الوصف 10 أحرف على الأقل';
                break;
            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
    };

    const validateForm = () => {
        const requiredFields = ['name', 'description'];
        let isValid = true;
        const newErrors = {};

        requiredFields.forEach(field => {
            if (!formData[field]?.trim()) {
                newErrors[field] = `حقل ${field === 'name' ? 'اسم البرنامج' :
                    field === 'description' ? 'الوصف' : 'المدة'} مطلوب`;
                isValid = false;
            }
        });

        if (formData.name?.trim().length < 3) {
            newErrors.name = 'يجب أن يكون الاسم 3 أحرف على الأقل';
            isValid = false;
        }

        if (formData.description?.trim().length < 10) {
            newErrors.description = 'يجب أن يكون الوصف 10 أحرف على الأقل';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                if (isEdit) {
                    await onUpdate({ ...formData, id: initialData.id });
                    await Swal.fire({
                        icon: 'success',
                        name: 'تم تعديل البرنامج بنجاح',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    await onCreate(formData);
                    await Swal.fire({
                        icon: 'success',
                        name: 'تم إضافة البرنامج بنجاح',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                handleClose();
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    name: 'خطأ أثناء حفظ البرنامج',
                    text: error.message || 'حدث خطأ أثناء حفظ البرنامج',
                    showConfirmButton: true
                });
            }
        } else {
            await Swal.fire({
                icon: 'error',
                name: 'يوجد أخطاء في النموذج',
                text: 'يرجى تصحيحها قبل الإرسال',
                showConfirmButton: true
            });
        }
    };

    const isFormValid = () => {
        return Object.values(errors).every(error => !error) &&
            formData.name.trim().length >= 3 &&
            formData.description.trim().length >= 10;
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header style={{ backgroundColor: theme.primary, color: theme.light }}>
                <Modal.Title>
                    <i className={isEdit ? "fas fa-edit ms-2" : "fas fa-plus ms-2"}></i>
                    {isEdit ? 'تعديل البرنامج' : 'إضافة برنامج جديد'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FloatingLabel controlId="name" label="اسم البرنامج" className="mb-3">
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="اسم البرنامج"
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="description" label="الوصف" className="mb-3">
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={{ height: '100px' }}
                            placeholder="الوصف"
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <div className="d-flex justify-content-end gap-3 mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            إلغاء
                        </Button>
                        <PrimaryButton type="submit" disabled={!isFormValid()}>
                            {isEdit ? 'حفظ التعديلات' : 'إضافة البرنامج'}
                        </PrimaryButton>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProgramForm;