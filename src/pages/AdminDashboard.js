import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner, Alert } from 'react-bootstrap';
import { fetchCourses } from '../services/api';
// [REHAB] استيراد دالة جلب المستخدمين
import axios from 'axios';

const fetchUsers = async () => {
  // [REHAB] جلب المستخدمين من الباك إند
  const response = await axios.get('http://127.0.0.1:8000/api/accounts/users/', {
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]); // [REHAB] حالة المستخدمين
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
      } catch (err) {
        setError('فشل في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4" style={{ color: '#0f5578', fontWeight: 700 }}>لوحة تحكم الأدمن</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h5>عدد الكورسات</h5>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#0a93b0' }}>{courses.length}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h5>عدد المستخدمين</h5>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#8e24aa' }}>{users.length}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h5>إضافة كورس جديد</h5>
              <Button variant="success" style={{ borderRadius: 20, padding: '8px 24px' }} disabled>
                + إضافة كورس
              </Button>
              <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>[قريباً]</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3" style={{ color: '#0f5578' }}>قائمة الكورسات</h5>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
              <div>جاري تحميل البيانات...</div>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : courses.length === 0 ? (
            <Alert variant="info">لا توجد كورسات حالياً.</Alert>
          ) : (
            <Table striped bordered hover responsive className="text-center">
              <thead style={{ background: '#e3f2fd' }}>
                <tr>
                  <th>#</th>
                  <th>اسم الكورس</th>
                  <th>المدرب</th>
                  <th>المستوى</th>
                  <th>السعر</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={course.id}>
                    <td>{idx + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.instructor || '-'}</td>
                    <td>{course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}</td>
                    <td>{course.price} ريال</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard; 