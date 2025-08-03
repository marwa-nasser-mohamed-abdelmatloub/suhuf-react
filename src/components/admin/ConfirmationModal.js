import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTheme } from '../shared/ThemeProvider';
import PrimaryButton from '../shared/PrimaryButton';

const ConfirmationModal = ({ show, onHide, onConfirm, title, message }) => {
    const theme = useTheme();

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header style={{ backgroundColor: theme.primary, color: theme.light }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    إلغاء
                </Button>
                <PrimaryButton onClick={onConfirm}>
                    تأكيد الحذف
                </PrimaryButton>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;