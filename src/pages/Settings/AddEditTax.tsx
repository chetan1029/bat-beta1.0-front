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
import ExistingDataWarning from "../../components/ExistingDataWarning";
//action
import { createTax, editTax, reset } from "../../redux/actions";
interface AddEditTaxProps {
    isOpen: boolean;
    onClose: any;
    tax?: any;
    companyId: any;
}
const AddEditTax = ({ isOpen, onClose, tax, companyId }: AddEditTaxProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const { createTaxError, isTaxCreated, editTaxError, isTaxUpdated, loading } = useSelector((state: any) => ({
        createTaxError: state.Company.Tax.createTaxError,
        isTaxCreated: state.Company.Tax.isTaxCreated,

        editTaxError: state.Company.Tax.editTaxError,
        isTaxUpdated: state.Company.Tax.isTaxUpdated,
        loading: state.Company.Tax.loading,
    }));


    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            from_country: tax ? { label: COUNTRIES[tax.from_country], value: tax.from_country } : '',
            to_country: tax ? { label: COUNTRIES[tax.to_country], value: tax.to_country } : '',
            custom_duty: tax ? tax.custom_duty : '',
            vat: tax ? tax.vat : '',
        },
        validationSchema: Yup.object({
            from_country: Yup.object().required(t('From Country is required')),
            to_country: Yup.object().required(t('To Country is required')),
            custom_duty: Yup.string().required(t('Custom Duty is required')),
            vat: Yup.string().required(t('VAT is required')),
        }),
        onSubmit: values => {

                if (tax) {
                    dispatch(editTax(companyId, tax.id, {...values, from_country: values['from_country']['value'], to_country: values['to_country']['value']}));
                } else {
                    dispatch(createTax(companyId, {...values, from_country: values['from_country']['value'], to_country: values['to_country']['value']}));
                }
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-tax-modal-header">
              <Modal.Title>{tax ? t("Edit Tax") : t("Add Tax")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">
                    {loading ? <Loader />: null}

                    <div>
                        {createTaxError && createTaxError['existing_items'] ? <ExistingDataWarning
                        name={t('Tax(s)')}
                        message={createTaxError}
                        onConfirm={() => {
                            dispatch(createTax(companyId, {...validator.values, from_country: validator.values['from_country']['value'], to_country: validator.values['to_country']['value'], force_create: true}));
                        }} onClose={() => {}} displayField={'from_country'} /> : null}
                        {(!isTaxCreated && createTaxError) && !createTaxError['existing_items'] ? <AlertMessage error={createTaxError} /> : null}
                        {(!isTaxUpdated && editTaxError) && <AlertMessage error={editTaxError} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('From Country')}</Form.Label>
                                  <CountriesDropdown name='from_country' placeholder={t('From Country')} className={validator.touched.from_country && validator.errors.from_country ? "is-invalid" : ""}
                                      onChange={(value) => validator.setFieldValue('from_country', value)}
                                      value={validator.values.from_country} />

                                  {validator.touched.from_country && validator.errors.from_country ? (
                                      <Form.Control.Feedback type="invalid" className="d-block">
                                          {validator.errors.from_country}
                                      </Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('To Country')}</Form.Label>
                                  <CountriesDropdown name='to_country' placeholder={t('To Country')} className={validator.touched.to_country && validator.errors.to_country ? "is-invalid" : ""}
                                      onChange={(value) => validator.setFieldValue('to_country', value)}
                                      value={validator.values.to_country} />

                                  {validator.touched.to_country && validator.errors.to_country ? (
                                      <Form.Control.Feedback type="invalid" className="d-block">
                                          {validator.errors.to_country}
                                      </Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Custom Duty')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="custom_duty" name="custom_duty" placeholder="Custom Duty"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.custom_duty}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.custom_duty && validator.errors && validator.errors.custom_duty ? true : false}
                                      maxLength={200} />


                                  {validator.touched.custom_duty && validator.errors.custom_duty ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.custom_duty}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('VAT')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="vat" name="vat" placeholder="VAT"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.vat}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.vat && validator.errors && validator.errors.vat ? true : false}
                                      maxLength={200} />


                                  {validator.touched.vat && validator.errors.vat ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.vat}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                          </Row>


                          <div>
                              <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                              <Button type="submit" variant="primary">{tax ? t("Edit Tax") : t("Add Tax")}</Button>
                          </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditTax;
