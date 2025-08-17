import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/admin/Sidebar';
import ProgramsTable from '../components/admin/ProgramsTable';
import { fetchPrograms, createProgram, updateProgram } from '../services/api';
import { useTheme } from '../components/shared/ThemeProvider';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatCard from '../components/admin/StatCard';

const AdminProgramsPage = () => {
    const theme = useTheme();
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadPrograms = async () => {
        try {
            setLoading(true);
            const data = await fetchPrograms();
            setPrograms(data);
            setError('');
        } catch (err) {
            setError(err.message || 'فشل في تحميل البرامج');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProgram = async (programData) => {
        try {
            await createProgram(programData);
            await loadPrograms();
        } catch (err) {
            setError(err.message || 'فشل في إنشاء البرنامج');
        }
    };

    const handleUpdateProgram = async (programData) => {
        try {
            await updateProgram(programData.id, programData);
            await loadPrograms();
        } catch (err) {
            setError(err.message || 'فشل في تحديث البرنامج');
        }
    };

    useEffect(() => {
        loadPrograms();
    }, []);

    return (
        <div className="admin-dashboard-wrapper" style={{ minHeight: '100vh', background: theme.secondary, overflowX: 'hidden' }}>
            <div className="d-flex flex-column flex-md-row">
                <Sidebar />
                <div className="flex-grow-1 w-100">
                    <AdminNavbar />
                    <Container fluid className="p-2 p-md-4" style={{ minHeight: '100vh' }}>
                        <h2 className="mb-4 fw-bold" style={{ color: theme.primary, fontSize: '1.5rem' }}>
                            <i className="fas fa-calendar-alt ms-2"></i>
                            إدارة البرامج
                        </h2>

                        {error && (
                            <Alert variant="danger" onClose={() => setError('')} dismissible>
                                {error}
                            </Alert>
                        )}

                        <Row className="mb-4 g-3 g-md-4">
                            <Col xs={12} sm={6} md={3} className="mb-2 mb-md-0">
                                <StatCard
                                    title="إجمالي البرامج"
                                    value={programs.length}
                                    color={theme.primary}
                                />
                            </Col>
                        </Row>

                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" />
                                <div>جاري تحميل البرامج...</div>
                            </div>
                        ) : (
                            <ProgramsTable
                                programs={programs}
                                refreshPrograms={loadPrograms}
                                onCreate={handleCreateProgram}
                                onUpdate={handleUpdateProgram}
                            />
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default AdminProgramsPage;