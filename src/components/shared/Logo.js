import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/images/sohof-logo.jpg';

const Logo = ({ size = 'md' }) => {
    const sizes = {
        sm: { width: 50, height: 50 },
        md: { width: 100, height: 100 },
        lg: { width: 150, height: 150 }
    };

    return (
        <Image
            src={logo}
            alt="Sohof Academy Logo"
            style={{
                ...sizes[size],
                objectFit: 'contain',
                animation: 'pulse 2s infinite'
            }}
            className="logo"
        />
    );
};

export default Logo;