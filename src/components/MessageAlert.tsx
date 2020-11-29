import React, { useState } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";

import { useTranslation } from 'react-i18next';

import Icon from "./Icon";


interface MessageAlertProps {
    onHide?: any,
    message: any,
    icon?: any,
    undo?: any,
    onUndo?: any
}

const MessageAlert = ({ onHide, message, icon, undo, onUndo }: MessageAlertProps) => {
    const { t } = useTranslation();

    const [show, setshow] = useState(true);

    const onHideMessage = () => {
        setshow(false);
        if (onHide) onHide();
    }

    return <>
        {show ? <div className="position-relative">
            <div className="alret-notification">
                <Alert variant="light" className="card" onClose={onHideMessage} dismissible>
                    {!icon ? <p className="mb-0">{message}</p> :
                        <>
                            <Row>
                                <Col xs={12} lg={2} className="d-flex align-items-center justify-content-center">
                                    <div className="btn-archive">
                                        <Icon name={icon} className="icon" />
                                    </div>
                                </Col>
                                <Col xs={12} lg={8} className="d-flex align-items-center">
                                    <p className="mb-0">{message}</p>
                                </Col>
                                {undo ? <Col xs={12} lg={2} className="d-flex align-items-center">
                                    <Button variant="outline-primary" onClick={onUndo}>{t('Undo')}</Button>
                                </Col> : null}
                            </Row>
                        </>
                    }

                </Alert >
            </div>
        </div> : null}
    </>
}

export default MessageAlert;