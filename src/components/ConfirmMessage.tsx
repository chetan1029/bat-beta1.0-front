import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';


interface ConfirmMessageProps {
    message: any,
    onConfirm: any,
    onClose: any,
    confirmBtnVariant?: string,
    confirmBtnLabel?: string
}

const ConfirmMessage = ({ message, onConfirm, onClose, confirmBtnVariant, confirmBtnLabel }: ConfirmMessageProps) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(true);

    const onModalClose = () => {
        setShow(false);
        onClose();
    }

    return <>
        <Modal show={show} onHide={onModalClose}>
            <Modal.Header closeButton className="add-payment-modal-header py-1"></Modal.Header>
            <Modal.Body className="p-4">
                <h3 className="my-0">{message}</h3>
                <div className="mt-4">
                    <Button variant="outline-primary" onClick={onModalClose} className="mr-2">{t('Cancel')}</Button>

                    <Button variant={confirmBtnVariant || "primary"} onClick={() => { setShow(false); onConfirm() }}>{confirmBtnLabel || t('Confirm')}</Button>
                </div>
            </Modal.Body>
        </Modal>
    </>;
}

export default ConfirmMessage;