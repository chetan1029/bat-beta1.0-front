import React, { useState, useEffect } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Icon from "./Icon";

const getFriendlyName = (value: any) => {
    return (value || "").split('_').join(' ');
}

const getErrorMessage = (value: any) => {
    if (typeof value === 'object') {
        let error = "";
        for (const k of Object.keys(value)) {
            error += getFriendlyName(k) + ": " + getErrorMessage(value[k]) + " ";
        }
        return error;
    } else {
        return value.split('_').join(' ');
    }
}

interface MessageAlertProps {
    onHide?: any,
    message: any,
    icon?: any,
    undo?: any,
    onUndo?: any,
    iconClass?: string,
    iconWrapperClass?: string,
    showAsNotification?: boolean,
}

const timeout = 3000;

const MessageAlert = ({ onHide, message, icon, undo, onUndo, iconWrapperClass, iconClass, showAsNotification }: MessageAlertProps) => {
    const { t } = useTranslation();

    const [show, setshow] = useState(true);

    useEffect(() => {
        if (message) {
            setshow(true);
            setTimeout(() => {
                setshow(false);
            }, timeout);
        }
    }, [message])

    const onHideMessage = () => {
        setshow(false);
        if (onHide) onHide();
    }

    return <>
        {show ? <div className="position-relative">
            <div className={classNames(showAsNotification && "alret-notification")}>
                <Alert variant={showAsNotification ? "light" : "danger"}
                        className={classNames(showAsNotification && "card")}
                        onClose={onHideMessage} dismissible>
                    {!icon ? <p className="mb-0">{message}</p> :
                        <>
                            <Row>
                                {showAsNotification &&
                                <Col xs={12} lg={1} className="d-flex align-items-center justify-content-center">
                                  <div className={iconWrapperClass || "btn-archive"}>
                                    <Icon name={icon} className={classNames("icon", iconClass)}/>
                                  </div>
                                </Col>
                                }
                                <Col xs={12} lg={9} className="d-flex align-items-center">
                                    {typeof message === 'object' ? <>
                                        <ul className="mb-0">
                                            {Object.entries(message).map(([key, value]) => {
                                                return <li key={key} className="text-dark font-weight-semibold"><span className="capitalize">{getFriendlyName(key)}</span>: {getErrorMessage(value)}</li>
                                            })}</ul>
                                    </> : <p className="mb-0 text-dark font-weight-semibold">{message}</p>}
                                </Col>
                                {(showAsNotification && undo) ? <Col xs={12} lg={2} className="d-flex align-items-center">
                                    <Button variant="outline-primary" onClick={onUndo}>{t('Undo')}</Button>
                                </Col> : null}
                            </Row>
                        </>
                    }
                </Alert>
            </div>
        </div> : null}
    </>
}

MessageAlert.defaultProps = {
    showAsNotification: true,
}

export default MessageAlert;