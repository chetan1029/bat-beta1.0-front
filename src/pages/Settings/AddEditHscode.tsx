import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Import loader
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import CountriesDropdown from "../../components/CountriesDropdown";
import { COUNTRIES } from "../../constants";

//action
import { createHscode, editHscode, reset } from "../../redux/actions";
interface AddEditHscodeProps {
    isOpen: boolean;
    onClose: any;
    hscode?: any;
    companyId: any;
}
const AddEditHscode = ({ isOpen, onClose, hscode, companyId }: AddEditHscodeProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const { createHscodeError, isHscodeCreated, editHscodeError, isHscodeUpdated, loading } = useSelector((state: any) => ({
        createHscodeError: state.Company.Hscode.createHscodeError,
        isHscodeCreated: state.Company.Hscode.isHscodeCreated,

        editHscodeError: state.Company.Hscode.editHscodeError,
        isHscodeUpdated: state.Company.Hscode.isHscodeUpdated,
        loading: state.Company.Hscode.loading,
    }));


    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            hscode: hscode ? hscode.hscode : '',
            material: hscode ? hscode.material : '',
            use: hscode ? hscode.use : '',
        },
        validationSchema: Yup.object({
            hscode: Yup.string().required(t('Hscode name is required')),
        }),
        onSubmit: values => {

                if (hscode) {
                    dispatch(editHscode(companyId, hscode.id, values));
                } else {
                    dispatch(createHscode(companyId, values));
                }
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-hscode-modal-header">
              <Modal.Title>{hscode ? t("Edit Hscode") : t("Add Hscode")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">
                    {loading ? <Loader />: null}

                    <div>

                        {(!isHscodeCreated && createHscodeError) && <AlertMessage error={createHscodeError} />}
                        {(!isHscodeUpdated && editHscodeError) && <AlertMessage error={editHscodeError} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                          <Form.Group className="mb-4">
                              <Form.Label htmlFor="usr">{t('Hscode')}</Form.Label>
                              <Form.Control type="text" className="form-control" id="hscode" name="hscode" placeholder="Hscode"
                                  onBlur={validator.handleBlur}
                                  value={validator.values.hscode}
                                  onChange={validator.handleChange}
                                  isInvalid={validator.touched.hscode && validator.errors && validator.errors.hscode ? true : false}
                                  maxLength={200} />


                              {validator.touched.hscode && validator.errors.hscode ? (
                                  <Form.Control.Feedback type="invalid">{validator.errors.hscode}</Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
                          <Form.Group className="mb-4">
                              <Form.Label htmlFor="usr">{t('Material')}</Form.Label>
                              <Form.Control type="text" className="form-control" id="material" name="material" placeholder="Material"
                                  onBlur={validator.handleBlur}
                                  value={validator.values.material}
                                  onChange={validator.handleChange}
                                  isInvalid={validator.touched.material && validator.errors && validator.errors.material ? true : false}
                                  maxLength={200} />


                              {validator.touched.material && validator.errors.material ? (
                                  <Form.Control.Feedback type="invalid">{validator.errors.material}</Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
                          <Form.Group className="mb-4">
                              <Form.Label htmlFor="usr">{t('Use')}</Form.Label>
                              <Form.Control type="text" className="form-control" id="use" name="use" placeholder="Use"
                                  onBlur={validator.handleBlur}
                                  value={validator.values.use}
                                  onChange={validator.handleChange}
                                  isInvalid={validator.touched.use && validator.errors && validator.errors.use ? true : false}
                                  maxLength={200} />


                              {validator.touched.use && validator.errors.use ? (
                                  <Form.Control.Feedback type="invalid">{validator.errors.use}</Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
                          <div>
                              <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                              <Button type="submit" variant="primary">{hscode ? t("Edit Hscode") : t("Add Hscode")}</Button>
                          </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditHscode;
