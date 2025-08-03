import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';

const StatCard = ({ title, value, color, action = false }) => {
    const theme = useTheme();

    return (
        <Card className="shadow-sm text-center h-100">
            <Card.Body>
                <h5 className="mb-3" style={{ color: theme.text }}>{title}</h5>
                {action ? (
                    <>
                        <Button variant="success" style={{ borderRadius: 20, padding: '8px 24px' }} disabled>
                            + إضافة
                        </Button>
                        <div style={{ fontSize: 12, color: theme.muted, marginTop: 8 }}>[قريباً]</div>
                    </>
                ) : (
                    <div style={{ fontSize: 32, fontWeight: 900, color }}>{value}</div>
                )}
            </Card.Body>
        </Card>
    );
};

export default StatCard;
