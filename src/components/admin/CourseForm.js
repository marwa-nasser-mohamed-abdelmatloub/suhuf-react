import React, { useState, useEffect } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import { useTheme } from "../shared/ThemeProvider";
import PrimaryButton from "../shared/PrimaryButton";

const CourseForm = ({
  show,
  handleClose,
  onCreate,
  onUpdate,
  initialData = {},
  isEdit = false,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    level: "beginner",
    price: "",
  });
  const [errors, setErrors] = useState({});
  // const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      instructor: initialData.instructor || "",
      level: initialData.level || "beginner",
      price: initialData.price || "",
    });
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "title":
        if (!value.trim()) error = "اسم الدورة مطلوب";
        else if (value.trim().length < 3)
          error = "يجب أن يكون الاسم 3 أحرف على الأقل";
        break;
      case "description":
        if (!value.trim()) error = "الوصف مطلوب";
        else if (value.trim().length < 10)
          error = "يجب أن يكون الوصف 10 أحرف على الأقل";
        break;
      case "instructor":
        if (!value.trim()) error = "اسم المعلم مطلوب";
        break;
      case "price":
        if (value && isNaN(value)) error = "يجب أن يكون السعر رقمًا";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const validateForm = () => {
    const requiredFields = ["title", "description", "instructor"];
    let isValid = true;
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `حقل ${
          field === "title"
            ? "اسم الدورة"
            : field === "description"
            ? "الوصف"
            : "المعلم"
        } مطلوب`;
        isValid = false;
      }
    });

    if (formData.title?.trim().length < 3) {
      newErrors.title = "يجب أن يكون الاسم 3 أحرف على الأقل";
      isValid = false;
    }

    if (formData.description?.trim().length < 10) {
      newErrors.description = "يجب أن يكون الوصف 10 أحرف على الأقل";
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
            icon: "success",
            title: "تم تعديل الدورة بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await onCreate(formData);
          await Swal.fire({
            icon: "success",
            title: "تم إضافة الدورة بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleClose();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "خطأ أثناء حفظ الدورة",
          text: error.message || "حدث خطأ أثناء حفظ الدورة",
          showConfirmButton: true,
        });
      }
    } else {
      await Swal.fire({
        icon: "error",
        title: "يوجد أخطاء في النموذج",
        text: "يرجى تصحيحها قبل الإرسال",
        showConfirmButton: true,
      });
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => !error) &&
      formData.title &&
      formData.description &&
      formData.instructor
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="course-form-modal-responsive"
    >
      <Modal.Header
        style={{ backgroundColor: theme.primary, color: theme.light }}
      >
        <Modal.Title>
          <i className={isEdit ? "fas fa-edit ms-2" : "fas fa-plus ms-2"}></i>
          {isEdit ? "تعديل الدورة" : "إضافة دورة جديدة"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {showAlert && (
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        ❌ يوجد أخطاء في النموذج، يرجى تصحيحها قبل الإرسال
                    </Alert>
                )} */}

        <Form onSubmit={onSubmit} className="course-form-responsive">
          <FloatingLabel controlId="title" label="اسم الدورة" className="mb-3">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="اسم الدورة"
              style={{ minWidth: 0 }}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="description" label="الوصف" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ height: "100px", minWidth: 0 }}
              placeholder="الوصف"
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="instructor"
            label="المعلم/ة"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="المعلم/ة"
              style={{ minWidth: 0 }}
              isInvalid={!!errors.instructor}
            />
            <Form.Control.Feedback type="invalid">
              {errors.instructor}
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* يمكنك إلغاء التعليق عن هذه الحقول عند الحاجة */}
          {/* <FloatingLabel controlId="level" label="المستوى" className="mb-3">
                        <Form.Select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            style={{ minWidth: 0 }}
                        >
                            <option value="beginner">مبتدئ</option>
                            <option value="intermediate">متوسط</option>
                            <option value="advanced">متقدم</option>
                        </Form.Select>
                    </FloatingLabel> */}

          {/* <FloatingLabel controlId="price" label="السعر (ريال)" className="mb-3">
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            placeholder="السعر"
                            style={{ minWidth: 0 }}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </FloatingLabel> */}

          <div className="d-flex flex-column flex-md-row justify-content-end gap-2 gap-md-3 mt-4">
            <Button variant="secondary" onClick={handleClose}>
              إلغاء
            </Button>
            <PrimaryButton type="submit" disabled={!isFormValid()}>
              {isEdit ? "حفظ التعديلات" : "إضافة الدورة"}
            </PrimaryButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourseForm;
