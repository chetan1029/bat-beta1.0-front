import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {TEMPLATE_VARIABLES} from '../../../constants';
//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';

//action
interface ShowVariablesProps {
    isOpen: boolean;
    onClose: any;
}
const ShowVariables = ({ isOpen, onClose}: ShowVariablesProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onCancel = () => {
        onClose();
    }


    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-hscode-modal-header">
                <Modal.Title>{t("Variables")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">
                    <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>{t('Name')}</th>
                                <th>{t('Code')}</th>
                                <th>{t('Action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.entries(TEMPLATE_VARIABLES).map(([key, v]) =>
                          <tr>
                            <td>{key}</td>
                            <td>{TEMPLATE_VARIABLES[key]}</td>
                            <td><Button size="sm" variant="outline-secondary" onClick={() => {navigator.clipboard.writeText(TEMPLATE_VARIABLES[key])}}>Copy Variable</Button></td>
                          </tr>
                        )}
                        </tbody>
                    </Table>
                    <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>

                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ShowVariables;
