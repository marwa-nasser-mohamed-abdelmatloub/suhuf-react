import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import AnimatedTitle from './AnimatedTitle';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    studentsCount: "",
    studentsNames: "",
    studentAge: "",
    preferredTeacher: "",
    address: "",
    whatsapp: "",
    programName: "",
    freeSessionTime: "",
    weeklySessions: "",
    communicationMethod: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentsCount.trim())
      newErrors.studentsCount = "عدد الطلاب مطلوب";
    else if (isNaN(formData.studentsCount) || formData.studentsCount <= 0)
      newErrors.studentsCount = "أدخل رقم صحيح";

    if (!formData.studentsNames.trim())
      newErrors.studentsNames = "أسماء الطلاب مطلوبة";

    if (!formData.studentAge.trim()) newErrors.studentAge = "عمر الطالب مطلوب";

    if (!formData.preferredTeacher.trim())
      newErrors.preferredTeacher = "اختر المعلم/ة";

    if (!formData.address.trim()) newErrors.address = "العنوان مطلوب";

    if (!formData.whatsapp.trim()) newErrors.whatsapp = "رقم الواتساب مطلوب";
    else if (!/^(\+?\d{10,15})$/.test(formData.whatsapp))
      newErrors.whatsapp = "أدخل رقم واتساب صحيح";

    if (!formData.programName.trim())
      newErrors.programName = "اسم البرنامج مطلوب";

    if (!formData.freeSessionTime.trim())
      newErrors.freeSessionTime = "حدد وقت الحصة المجانية";

    if (!formData.weeklySessions.trim())
      newErrors.weeklySessions = "عدد الحصص مطلوب";

    if (!formData.communicationMethod.trim())
      newErrors.communicationMethod = "اختر طريقة التواصل";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        studentsCount: "",
        studentsNames: "",
        studentAge: "",
        preferredTeacher: "",
        address: "",
        whatsapp: "",
        programName: "",
        freeSessionTime: "",
        weeklySessions: "",
        communicationMethod: "",
        comment: "",
      });
    }, 4000);
  };

  return (
    <div className="py-5" dir="rtl">
      <Container>
        <Row className="mb-5">
          <Col xs={12} sm={6} md={3} className="text-center mb-4">
            <i className="bi bi-telephone-fill fs-2 text-success mb-2"></i>
            <h5>رقم الهاتف والواتساب</h5>
            <p dir="ltr">(+20)01112922085</p>
          </Col>

          <Col xs={12} sm={6} md={3} className="text-center mb-4">
            <i className="bi bi-whatsapp fs-2 text-success mb-2"></i>
            <h5>رقم الواتساب</h5>
            <p dir="ltr">(+20)01080290663</p>
          </Col>

          <Col xs={12} sm={6} md={3} className="text-center mb-4">
            <i className="bi bi-envelope-fill fs-2 text-primary mb-2"></i>
            <h5>البريد الإلكتروني</h5>
            <p>sohofacademy1@gmail.com</p>
          </Col>

          <Col xs={12} sm={6} md={3} className="text-center mb-4">
            <i className="bi bi-geo-alt-fill fs-2 text-danger mb-2"></i>
            <h5>العنوان</h5>
            <p>مصر</p>
          </Col>
        </Row>

        <div className="text-center mb-3">
          <AnimatedTitle level={2}>
            طلب اشتراك
          </AnimatedTitle>
        </div>

        <p className="text-center text-muted mb-5">
          من فضلك قم بتعبئة البيانات التالية ليتم التواصل معك.
        </p>

        <Row className="justify-content-center">
          <Col md={8}>
            <Form
              action="https://formsubmit.co/sohofacademy1@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow-sm bg-light"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={window.location.href} />

              {/* عدد الطلاب */}
              <Form.Group className="mb-3">
                <Form.Label>عدد الطلاب</Form.Label>
                <Form.Control
                  type="number"
                  name="studentsCount"
                  value={formData.studentsCount}
                  onChange={handleChange}
                  isInvalid={!!errors.studentsCount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.studentsCount}
                </Form.Control.Feedback>
              </Form.Group>

              {/* أسماء الطلاب */}
              <Form.Group className="mb-3">
                <Form.Label>أسماء الطلاب</Form.Label>
                <Form.Control
                  type="text"
                  name="studentsNames"
                  value={formData.studentsNames}
                  onChange={handleChange}
                  isInvalid={!!errors.studentsNames}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.studentsNames}
                </Form.Control.Feedback>
              </Form.Group>

              {/* عمر الطالب */}
              <Form.Group className="mb-3">
                <Form.Label>عمر الطالب</Form.Label>
                <Form.Control
                  type="text"
                  name="studentAge"
                  value={formData.studentAge}
                  onChange={handleChange}
                  isInvalid={!!errors.studentAge}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.studentAge}
                </Form.Control.Feedback>
              </Form.Group>

              {/* المعلم/ة */}
              <Form.Group className="mb-3">
                <Form.Label>تفضل أن يكون المعلم/ة</Form.Label>
                <Form.Select
                  name="preferredTeacher"
                  value={formData.preferredTeacher}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredTeacher}
                >
                  <option value="">اختر</option>
                  <option value="معلم">معلم</option>
                  <option value="معلمة">معلمة</option>
                  <option value="لا فرق">لا فرق</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.preferredTeacher}
                </Form.Control.Feedback>
              </Form.Group>

              {/* العنوان */}
              <Form.Group className="mb-3">
                <Form.Label>العنوان</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              {/* الواتساب */}
              <Form.Group className="mb-3">
                <Form.Label>رقم الواتساب</Form.Label>
                <Form.Control
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  isInvalid={!!errors.whatsapp}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.whatsapp}
                </Form.Control.Feedback>
              </Form.Group>

              {/* اسم البرنامج */}
              <Form.Group className="mb-3">
                <Form.Label>اسم البرنامج المطلوب</Form.Label>
                <Form.Control
                  type="text"
                  name="programName"
                  value={formData.programName}
                  onChange={handleChange}
                  isInvalid={!!errors.programName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.programName}
                </Form.Control.Feedback>
              </Form.Group>

              {/* وقت الحصة المجانية */}
              <Form.Group className="mb-3">
                <Form.Label>أقرب وقت للحصة المجانية</Form.Label>
                <Form.Control
                  type="text"
                  name="freeSessionTime"
                  value={formData.freeSessionTime}
                  onChange={handleChange}
                  isInvalid={!!errors.freeSessionTime}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.freeSessionTime}
                </Form.Control.Feedback>
              </Form.Group>

              {/* الحصص المطلوبة */}
              <Form.Group className="mb-3">
                <Form.Label>
                  عدد الحصص المطلوبة/الأسبوع ، ومدة كل حصة
                </Form.Label>
                <Form.Control
                  type="text"
                  name="weeklySessions"
                  value={formData.weeklySessions}
                  onChange={handleChange}
                  isInvalid={!!errors.weeklySessions}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.weeklySessions}
                </Form.Control.Feedback>
              </Form.Group>

              {/* طريقة التواصل */}
              <Form.Group className="mb-3">
                <Form.Label>أفضل طريقة للتواصل</Form.Label>
                <Form.Select
                  name="communicationMethod"
                  value={formData.communicationMethod}
                  onChange={handleChange}
                  isInvalid={!!errors.communicationMethod}
                >
                  <option value="">اختر</option>
                  <option value="واتساب">واتساب</option>
                  <option value="مكالمة">مكالمة</option>
                  <option value="بريد إلكتروني">بريد إلكتروني</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.communicationMethod}
                </Form.Control.Feedback>
              </Form.Group>

              {/* تعليق */}
              <Form.Group className="mb-3">
                <Form.Label>تعليق</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" className="px-5">
                  إرسال
                </Button>
              </div>

              {submitted && (
                <Alert variant="success" className="mt-3 text-center">
                  ✅ تم إرسال بياناتك بنجاح!
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
