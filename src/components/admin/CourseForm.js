import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import PrimaryButton from '../shared/PrimaryButton';

const CourseForm = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    initialData = {},
    isEdit = false
}) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        level: 'beginner',
        price: ''
    });

    useEffect(() => {
        setFormData({
            title: initialData.title || '',
            description: initialData.description || '',
            instructor: initialData.instructor || '',
            level: initialData.level || 'beginner',
            price: initialData.price || ''
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        isEdit ? onUpdate({ ...formData, id: initialData.id }) : onCreate(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="course-form-modal-responsive">
            <Modal.Header style={{ backgroundColor: theme.primary, color: theme.light }}>
                <Modal.Title>
                    <i className={isEdit ? "fas fa-edit ms-2" : "fas fa-plus ms-2"}></i>
                    {isEdit ? 'تعديل الكورس' : 'إضافة كورس جديد'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit} className="course-form-responsive">
                    <FloatingLabel controlId="title" label="اسم الكورس" className="mb-3">
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="اسم الكورس"
                            style={{ minWidth: 0 }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="description" label="الوصف" className="mb-3">
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={{ height: '100px', minWidth: 0 }}
                            placeholder="الوصف"
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="instructor" label="المدرب" className="mb-3">
                        <Form.Control
                            type="text"
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            placeholder="المدرب"
                            style={{ minWidth: 0 }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="level" label="المستوى" className="mb-3">
                        <Form.Select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            required
                            style={{ minWidth: 0 }}
                        >
                            <option value="beginner">مبتدئ</option>
                            <option value="intermediate">متوسط</option>
                            <option value="advanced">متقدم</option>
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel controlId="price" label="السعر (ريال)" className="mb-3">
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            placeholder="السعر"
                            style={{ minWidth: 0 }}
                        />
                    </FloatingLabel>

                    <div className="d-flex flex-column flex-md-row justify-content-end gap-2 gap-md-3 mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            إلغاء
                        </Button>
                        <PrimaryButton type="submit">
                            {isEdit ? 'حفظ التعديلات' : 'إضافة الكورس'}
                        </PrimaryButton>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CourseForm;
