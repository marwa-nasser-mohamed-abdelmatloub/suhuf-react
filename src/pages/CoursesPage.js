import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/api";
import CourseList from "../components/courses/CourseList";
import Navbar from "../components/shared/Navbar";
import BabyHeroSection from "../components/shared/BabyHeroSection";
import {
  Container,
  Alert,
  Spinner,
  Form,
  Row,
  Col,
  Badge,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/shared/Footer";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel] = useState("all");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setFilteredCourses(data);
        setError(null);
      } catch (error) {
        setError(
          "فشل في تحميل الدورات. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى."
        );
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.instructor &&
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedLevel]);

  // const getLevelText = (level) => {
  //     switch (level) {
  //         case 'beginner':
  //             return 'مبتدئ';
  //         case 'intermediate':
  //             return 'متوسط';
  //         case 'advanced':
  //             return 'متقدم';
  //         default:
  //             return level;
  //     }
  // };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            role="status"
            style={{ width: "4rem", height: "4rem", color: "#0f5578" }}
          >
            <span className="visually-hidden">جاري التحميل...</span>
          </Spinner>
          <h5 className="mt-4" style={{ color: "#0f5578" }}>
            جاري تحميل الدورات، يرجى الانتظار...
          </h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Alert
          variant="danger"
          className="text-center w-100"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-3">
            <i
              className="bi bi-exclamation-triangle-fill"
              style={{ fontSize: "2rem", color: "#dc3545" }}
            ></i>
          </div>
          <h5>{error}</h5>
          <Button
            variant="outline-danger"
            onClick={() => window.location.reload()}
            className="mt-3"
            style={{ borderRadius: "20px", padding: "6px 20px" }}
          >
            إعادة المحاولة
          </Button>
        </Alert>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <>
        <Navbar />
        <BabyHeroSection
          title="الدورات"
          breadcrumb="الدورات"
          backgroundImage="/path-to-background-image.jpg"
        />
        <Container
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <div
            className="text-center p-4"
            style={{
              background: "#f8f9fa",
              borderRadius: "18px",
              boxShadow: "0 2px 12px rgba(15,85,120,0.07)",
            }}
          >
            <i
              className="bi bi-journal-x"
              style={{ fontSize: "3rem", color: "#0f5578" }}
            ></i>
            <h4
              className="mt-3 mb-2"
              style={{ color: "#0f5578", fontWeight: "700" }}
            >
              لا توجد دورات متاحة حالياً
            </h4>
            <p className="text-muted mb-3" style={{ fontSize: "1.1rem" }}>
              سيتم إضافة دورات جديدة قريباً.
              <br />
              تابعنا أو تواصل معنا لمزيد من التفاصيل.
            </p>
            <Link to="/">
              <Button
                variant="primary"
                style={{
                  borderRadius: "25px",
                  padding: "8px 24px",
                  fontWeight: "600",
                }}
              >
                العودة للصفحة الرئيسية
              </Button>
            </Link>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <BabyHeroSection
        title="الدورات"
        breadcrumb="الدورات"
        backgroundImage="/path-to-background-image.jpg"
      ></BabyHeroSection>

      <Container className="py-4">
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>البحث في الدورات</Form.Label>
              <Form.Control
                type="text"
                placeholder="ابحث في عنوان الدورة، الوصف، أو اسم المعلم/ة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>
          </Col>
          {/* <Col md={6} className="mb-3">
                        <Form.Group>
                            <Form.Label>مستوى الكورس</Form.Label>
                            <Form.Select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                style={{ borderRadius: '10px' }}
                            >
                                <option value="all">جميع المستويات</option>
                                <option value="beginner">مبتدئ</option>
                                <option value="intermediate">متوسط</option>
                                <option value="advanced">متقدم</option>
                            </Form.Select>
                        </Form.Group>
                    </Col> */}
        </Row>

        {filteredCourses.length > 0 && (
          <div className="mb-4">
            <Badge bg="info" className="me-2">
              عدد الدورات: {filteredCourses.length}
            </Badge>
            {(searchTerm || selectedLevel !== "all") && (
              <Badge bg="secondary" className="me-2">
                تم تطبيق الفلترة
              </Badge>
            )}
          </div>
        )}

        {filteredCourses.length === 0 && courses.length > 0 && (
          <Alert variant="info" className="text-center">
            لا توجد دورات تطابق معايير البحث المحددة.
          </Alert>
        )}

        <div className="text-center mb-4">
          <Link to="/">
            <Button
              variant="outline-primary"
              style={{ borderRadius: "25px", padding: "8px 20px" }}
            >
              ← العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>
      </Container>

      <div id="courses" className="fade-in-up">
        <CourseList courses={filteredCourses} />
      </div>

      <Footer />
    </>
  );
};

export default CoursesPage;
