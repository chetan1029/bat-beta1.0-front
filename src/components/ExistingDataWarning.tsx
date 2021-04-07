import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
// import { Form } from "react-bootstrap";

interface ExistingDataWarningProps {
    name: string
    message: any;
    onConfirm: any;
    onClose: any;
    confirmBtnVariant?: string;
    confirmBtnLabel?: string;
    displayField: string;
}

const ExistingDataWarning = ({ name, message, onConfirm, onClose, confirmBtnVariant, confirmBtnLabel, displayField }: ExistingDataWarningProps) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(true);

    const onModalClose = () => {
        setShow(false);
        onClose();
    }

    return <>
        <Modal show={show} onHide={onModalClose}>
            <Modal.Header closeButton className="h5 font-weight-normal my-0 border-0"></Modal.Header>
            <Modal.Body className="px-4 pb-4">
                <h5 className="my-0">{t(`Following are an existing ${name} already available with the same data. Would you like to still create it?`)}</h5>

                <div className='mt-3'>
                    <ol className='pl-3'>
                        {(message['existing_items'] || []).map((item: any, idx: number) => {
                            return <li key={idx} className='mb-2'>{item[displayField]} ({item['id']})</li>
                        })}
                    </ol>
                </div>
                <div className="mt-4">
                    <Button variant="outline-primary" onClick={onModalClose} className="mr-2">{t('No, Cancel')}</Button>

                    <Button variant={confirmBtnVariant || "primary"} onClick={() => { setShow(false); onConfirm() }}>{confirmBtnLabel || t('Yes, Create')}</Button>
                </div>
            </Modal.Body>
        </Modal>
    </>;
}

export default ExistingDataWarning;