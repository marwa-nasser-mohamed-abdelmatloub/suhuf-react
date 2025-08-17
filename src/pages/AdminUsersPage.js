import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { fetchUsers, registerUser, updateUser } from '../services/api';
import UsersTable from '../components/admin/UsersTable';
import Sidebar from '../components/admin/Sidebar';
import { useTheme } from '../components/shared/ThemeProvider';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatCard from '../components/admin/StatCard';

const AdminUsersPage = () => {
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await fetchUsers();
            setUsers(data);
            setError('');
        } catch (err) {
            setError(err.message || 'فشل في تحميل المستخدمين');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (userData) => {
        try {
            await registerUser(userData);
            setSuccessMessage('تم إضافة المستخدم بنجاح');
            setTimeout(() => setSuccessMessage(''), 3000);
            await loadUsers();
        } catch (err) {
            setError(err.message || 'فشل في إنشاء المستخدم');
        }
    };

    const handleUpdateUser = async (userData) => {
        try {
            const { password, confirm_password, ...updateData } = userData;
            await updateUser(userData.id, updateData);
            setSuccessMessage('تم تحديث المستخدم بنجاح');
            setTimeout(() => setSuccessMessage(''), 3000);
            await loadUsers();
        } catch (err) {
            setError(err.message || 'فشل في تحديث المستخدم');
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const getUserTypeCount = (type) => {
        if (type === 'student') return users.filter(u => u.is_student).length;
        if (type === 'teacher') return users.filter(u => u.is_quran_teacher).length;
        return users.filter(u => !u.is_student && !u.is_quran_teacher).length;
    };

    return (
        <div className="admin-dashboard-wrapper" style={{ minHeight: '100vh', background: theme.secondary, overflowX: 'hidden' }}>
            <div className="d-flex flex-column flex-md-row">
                <Sidebar />
                <div className="flex-grow-1 w-100">
                    <AdminNavbar />
                    <Container fluid className="p-2 p-md-4" style={{ minHeight: '100vh' }}>
                        <h2 className="mb-4 fw-bold" style={{ color: theme.primary, fontSize: '1.5rem' }}>
                            <i className="fas fa-users ms-2"></i>
                            إدارة المستخدمين
                        </h2>

                        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
                        {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}

                        <Row className="mb-4 g-3 g-md-4">
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="إجمالي المستخدمين"
                                    value={users.length}
                                    color={theme.primary}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="عدد الطلاب"
                                    value={getUserTypeCount('student')}
                                    color={theme.success}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="عدد المعلمين"
                                    value={getUserTypeCount('teacher')}
                                    color={theme.info}
                                />
                            </Col>
                            {/* <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="مستخدمين آخرين"
                                    value={getUserTypeCount('other')}
                                    color={theme.warning}
                                />
                            </Col> */}
                        </Row>

                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" />
                                <div>جاري تحميل المستخدمين...</div>
                            </div>
                        ) : (
                            <UsersTable
                                users={users}
                                refreshUsers={loadUsers}
                                onCreate={handleCreateUser}
                                onUpdate={handleUpdateUser}
                            />
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;