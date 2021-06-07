import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';

import { testTemplate } from "../../../redux/actions";
import Loader from "../../../components/Loader";
import MessageAlert from "../../../components/MessageAlert";


const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

interface EmailTemplateProps {
    emailTemplate: any;
    companyId: string | number;
    onClose: any;
}
const EmailTemplate = ({ companyId, emailTemplate, onClose }: EmailTemplateProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, templateTestSent, templateTestSentError } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.templateTestLoading,
        templateTestSent: state.Company.AutoEmails.templateTestSent,
        templateTestSentError: state.Company.AutoEmails.templateTestSentError
    }));

    const template = emailTemplate ? emailTemplate: {};
    const [email, setEmail] = useState("");

    const isEnabled = email && isValidEmail(email) ? true: false;

    const sendTest = () => {
        dispatch(testTemplate(companyId, emailTemplate['id'], {email}));
    }


    return <>
        <Modal show={true} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-payment-modal-header py-1"></Modal.Header>
            <Modal.Body className="p-4">
                {loading ? <Loader /> : null}

                <h4>{t('Email Template')}</h4>

                <h6 className="mt-3 no-action">{t('Email Subject')}</h6>
                <p className="mb-0 text-muted no-action">{template['subject']}</p>

                <h6 className="mt-3 no-action">{t('Email Body')}</h6>
                <p className="mb-1 text-muted no-action"><div dangerouslySetInnerHTML={{__html: template['template']}} /></p>


                <Row className="mt-4">
                    <Col lg="8">
                        <Form.Control type="email" placeholder={t("Email Address")}
                            name="email" id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Col>
                    <Col lg="4">
                        <Button variant={"primary"} className="mr-2" disabled={!isEnabled} onClick={sendTest}>{t('Send a test email')}</Button>
                        <Button variant="outline-primary" onClick={onClose} className="">{t('Close')}</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>

        {templateTestSent ? <MessageAlert message={t('The campaign test email sent')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
        {templateTestSentError ? <MessageAlert message={templateTestSentError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
    </>;
}

export default EmailTemplate;
