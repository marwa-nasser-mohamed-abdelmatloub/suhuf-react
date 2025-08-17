import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/images/sohof-logo-removebg-preview.png';

const Logo = ({ size = 'md' }) => {
    const sizes = {
        sm: { width: 100, height: 100 },
        md: { width: 150, height: 150 },
        lg: { width: 200, height: 200 }
    };

    return (
        <Image
            src={logo}
            alt="Sohof Academy Logo"
            style={{
                ...sizes[size],
                objectFit: 'contain',
                animation: 'pulse 2s infinite',
            }}
            className="logo"
        />
    );
};

export default Logo;