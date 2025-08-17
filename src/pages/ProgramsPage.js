import React, { useEffect, useState } from "react";
import { fetchPrograms } from "../services/api";
import ProgramList from "../components/programs/ProgramList";
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

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await fetchPrograms();
        setPrograms(data);
        setFilteredPrograms(data);
        setError(null);
      } catch (error) {
        setError(
          "فشل في تحميل البرامج. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى."
        );
        console.error("Failed to load programs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  useEffect(() => {
    let filtered = programs;

    if (searchTerm) {
      filtered = filtered.filter(
        (program) =>
          (program.name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (program.description || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPrograms(filtered);
  }, [programs, searchTerm]);

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
            جاري تحميل البرامج، يرجى الانتظار...
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

  // رسالة احترافية إذا لا يوجد برامج نهائياً
  if (programs.length === 0) {
    return (
      <>
        <Navbar />
        <BabyHeroSection
          title="البرامج"
          breadcrumb="البرامج"
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
              className="bi bi-calendar-x"
              style={{ fontSize: "3rem", color: "#0f5578" }}
            ></i>
            <h4
              className="mt-3 mb-2"
              style={{ color: "#0f5578", fontWeight: "700" }}
            >
              لا توجد برامج متاحة حالياً
            </h4>
            <p className="text-muted mb-3" style={{ fontSize: "1.1rem" }}>
              سيتم إضافة برامج جديدة قريباً.
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
        title="البرامج"
        breadcrumb="البرامج"
        backgroundImage="/path-to-background-image.jpg"
      ></BabyHeroSection>

      <Container className="py-4">
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>البحث في البرامج</Form.Label>
              <Form.Control
                type="text"
                placeholder="ابحث في عنوان البرنامج أو الوصف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>
          </Col>
        </Row>

        {filteredPrograms.length > 0 && (
          <div className="mb-4">
            <Badge bg="info" className="me-2">
              عدد البرامج: {filteredPrograms.length}
            </Badge>
            {searchTerm && (
              <Badge bg="secondary" className="me-2">
                تم تطبيق الفلترة
              </Badge>
            )}
          </div>
        )}

        {filteredPrograms.length === 0 && programs.length > 0 && (
          <Alert variant="info" className="text-center">
            لا توجد برامج تطابق معايير البحث المحددة.
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

      <div id="programs" className="fade-in-up">
        <ProgramList programs={filteredPrograms} />
      </div>

      <Footer />
    </>
  );
};

export default ProgramsPage;
