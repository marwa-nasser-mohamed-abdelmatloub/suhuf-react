import React from 'react';
import { Navbar as RBNavbar } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';
import PrimaryButton from '../shared/PrimaryButton';

const AdminNavbar = () => {
    const theme = useTheme();
    const { user, logout } = useAuth();

    return (
        <RBNavbar style={{
            backgroundColor: theme.light,
            borderBottom: `2px solid ${theme.primary}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }} className="px-4 py-2 d-flex justify-content-between">
            <RBNavbar.Brand style={{
                color: theme.primary,
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }}>
                <i className="fas fa-user-shield ms-2"></i>
                أهلاً،
                {user?.first_name || user?.username || 'أدمن'}
            </RBNavbar.Brand>
            <PrimaryButton
                onClick={logout}
                style={{ padding: '8px 20px' }}
            >
                <i className="fas fa-sign-out-alt ms-2"></i>
                تسجيل خروج
            </PrimaryButton>
        </RBNavbar>
    );
};

export default AdminNavbar;