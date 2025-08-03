import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const theme = useTheme();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? {
            backgroundColor: theme.light,
            color: theme.primary + '!important',
            borderRadius: '8px',
            fontWeight: 'bold'
        } : {};
    };

    return (
        <nav
            className="sidebar d-none d-md-block"
            style={{
                width: '250px',
                background: theme.primary,
                minHeight: '100vh',
                color: theme.light,
                padding: '1.5rem',
                boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                left: 0,
                zIndex: 100,
                overflowX: 'hidden',
            }}
        >
            <h4 className="mb-4 d-flex align-items-center">
                <i className="fas fa-tachometer-alt ms-2"></i>
                لوحة الأدمن
            </h4>
            <Nav className="flex-column gap-2">
                <Nav.Link
                    href="/admin-dashboard"
                    style={{
                        color: theme.light,
                        padding: '10px 15px',
                        transition: 'all 0.3s',
                        ...isActive('/admin-dashboard'),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <i className="fas fa-home ms-2"></i>
                    لوحة التحكم
                </Nav.Link>
                <Nav.Link
                    href="/admin/courses"
                    style={{
                        color: theme.light,
                        padding: '10px 15px',
                        transition: 'all 0.3s',
                        ...isActive('/admin/courses'),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <i className="fas fa-book ms-2"></i>
                    الكورسات
                </Nav.Link>
                <Nav.Link
                    href="/admin/users"
                    style={{
                        color: theme.light,
                        padding: '10px 15px',
                        transition: 'all 0.3s',
                        ...isActive('/admin/users'),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <i className="fas fa-users ms-2"></i>
                    المستخدمين
                </Nav.Link>
            </Nav>
        </nav>
    );
};

export default Sidebar;