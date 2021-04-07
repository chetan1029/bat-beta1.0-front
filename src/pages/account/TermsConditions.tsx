import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';


interface TermsConditionsProps {
    onClose: any
}

const TermsConditions = ({ onClose }: TermsConditionsProps) => {
    const { t } = useTranslation();

    const [show, setShow] = useState(true);
    const onModalClose = () => {
        setShow(false);
        onClose();
    }

    return (
        <Modal show={show} onHide={onModalClose} size="lg">
            <Modal.Header closeButton className="add-payment-modal-header"></Modal.Header>
            <Modal.Body className="p-4">
                <h3 className="mt-0">{t('Terms and Conditions')}</h3>

                <p className="mt-2 text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>

                <div className="mt-4">
                    <Button variant='primary' onClick={onModalClose}>{t('Accept')}</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default TermsConditions;