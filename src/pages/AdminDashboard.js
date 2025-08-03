import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import StatCard from '../components/admin/StatCard';
import Sidebar from '../components/admin/Sidebar';
import { fetchCourses, fetchUsers } from '../services/api';
import { useTheme } from '../components/shared/ThemeProvider';
import AdminNavbar from '../components/admin/AdminNavbar';

const AdminDashboard = () => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, usersData] = await Promise.all([
          fetchCourses(),
          fetchUsers()
        ]);
        setCourses(coursesData);
        setUsers(usersData);
        setError('');
      } catch (err) {
        setError(err.message || 'فشل في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getLevelCount = (level) => {
    return courses.filter(c => c.level === level).length;
  };

  const getUserTypeCount = (type) => {
    if (type === 'student') return users.filter(u => u.is_student).length;
    if (type === 'teacher') return users.filter(u => u.is_quran_teacher).length;
    return users.filter(u => !u.is_student && !u.is_quran_teacher).length;
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <Container fluid className="p-4" style={{ background: theme.secondary, minHeight: '100vh' }}>
          <h2 className="mb-4 fw-bold" style={{ color: theme.primary }}>
            <i className="fas fa-tachometer-alt ms-2"></i>
            لوحة تحكم الأدمن
          </h2>

          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Row className="mb-4 g-4">
            <Col md={3}>
              <StatCard
                title="إجمالي الكورسات"
                value={courses.length}
                color={theme.primary}
              />
            </Col>
            <Col md={3}>
              <StatCard
                title="إجمالي المستخدمين"
                value={users.length}
                color="#8e24aa"
              />
            </Col>
            <Col md={3}>
              <StatCard
                title="عدد الطلاب"
                value={getUserTypeCount('student')}
                color={theme.success}
              />
            </Col>
            <Col md={3}>
              <StatCard
                title="عدد المدرسين"
                value={getUserTypeCount('teacher')}
                color={theme.info}
              />
            </Col>
          </Row>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
              <div>جاري تحميل البيانات...</div>
            </div>
          ) : (
            <div className="mb-4">
              <h4 className="mb-3" style={{ color: theme.primary }}>
                <i className="fas fa-chart-line ms-2"></i>
                نظرة عامة
              </h4>
              <Row className="g-4">
                <Col md={6}>
                  <StatCard
                    title="كورسات المبتدئين"
                    value={getLevelCount('beginner')}
                    color={theme.success}
                  />
                </Col>
                <Col md={6}>
                  <StatCard
                    title="كورسات المتوسطين"
                    value={getLevelCount('intermediate')}
                    color={theme.warning}
                  />
                </Col>
                <Col md={6}>
                  <StatCard
                    title="كورسات المتقدمين"
                    value={getLevelCount('advanced')}
                    color={theme.danger}
                  />
                </Col>
                <Col md={6}>
                  <StatCard
                    title="مستخدمين آخرين"
                    value={getUserTypeCount('other')}
                    color={theme.muted}
                  />
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;