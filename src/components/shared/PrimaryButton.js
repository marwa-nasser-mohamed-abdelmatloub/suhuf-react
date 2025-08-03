import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from './ThemeProvider';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const PrimaryButton = ({ children, onClick, href, className = '', style = {}, type = 'button', disabled = false }) => {
    const theme = useTheme();

    const handleClick = (e) => {
        if (disabled) {
            Swal.fire({
                icon: 'warning',
                title: 'يرجى الانتظار',
                text: 'جاري معالجة طلبك...',
                confirmButtonColor: theme.primary,
            });
            return;
        }
        if (onClick) onClick(e);
    };

    return (
        <Button
            type={type}
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
                borderRadius: '50px',
                padding: '12px 24px',
                ...style
            }}
            onClick={handleClick}
            href={href}
            disabled={disabled}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 15px rgba(0, 0, 0, 0.2)`;
                    e.currentTarget.querySelector('.button-overlay').style.opacity = '0.2';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1)`;
                e.currentTarget.querySelector('.button-overlay').style.opacity = '0';
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

PrimaryButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

export default PrimaryButton;