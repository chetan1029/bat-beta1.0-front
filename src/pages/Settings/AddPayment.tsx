import React from 'react';
import { Modal } from "react-bootstrap";

interface AddPaymentProps {
    isOpen: boolean;
    onClose:any;
}
const AddPayment = ({ isOpen, onClose}: AddPaymentProps) => {
    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Payment Terms</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        </Modal>
    );
}

export default AddPayment;