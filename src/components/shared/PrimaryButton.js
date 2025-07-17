import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import PropTypes from 'prop-types';

const PrimaryButton = ({ children, onClick, href, className = '', style = {} }) => {
    const theme = useTheme();

    return (
        <Button
            className={`primary-btn ${className}`}
            style={{
                backgroundColor: theme.primary,
                borderColor: theme.primary,
                color: theme.light,
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
            onClick={onClick}
            href={href}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 15px rgba(0, 0, 0, 0.2)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1)`;
            }}
        >
            <span className="button-content" style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </span>
            <span
                className="button-overlay"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(45deg, ${theme.tertiary}, ${theme.accent})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1
                }}
            ></span>
        </Button>
    );
};

export default PrimaryButton;