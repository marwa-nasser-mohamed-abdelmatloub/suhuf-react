import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, isTeacher, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
    }

    if (adminOnly && !isTeacher) {
        return <Navigate to="/" replace />;
    }

    if (isTeacher && window.location.pathname === '/') {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;