import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';


interface ExistingDataWarningProps {
    message: any,
    onConfirm: any,
    onClose: any,
    confirmBtnVariant?: string,
    confirmBtnLabel?: string
}

const ExistingDataWarning = ({ message, onConfirm, onClose, confirmBtnVariant, confirmBtnLabel }: ExistingDataWarningProps) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(true);

    const onModalClose = () => {
        setShow(false);
        onClose();
    }

    return <>
        <Modal show={show} onHide={onModalClose}>
            <Modal.Header closeButton className="h5 font-weight-normal">
                {message['message']}
            </Modal.Header>
            <Modal.Body className="p-4">
                <h3 className="my-0">{t('Would you like to restore any of the following item?')}</h3>
                <div className="mt-4">
                    <Button variant="outline-primary" onClick={onModalClose} className="mr-2">{t('Cancel')}</Button>

                    <Button variant={confirmBtnVariant || "primary"} onClick={() => { setShow(false); onConfirm() }}>{confirmBtnLabel || t('Confirm')}</Button>
                </div>
            </Modal.Body>
        </Modal>
    </>;
}

export default ExistingDataWarning;