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

//action
import { createBank, editBank, reset } from "../../redux/actions";
interface AddEditBankProps {
    isOpen: boolean;
    onClose: any;
    bank?: any;
    companyId: any;
}
const AddEditBank = ({ isOpen, onClose, bank, companyId }: AddEditBankProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const { createBankError, isBankCreated, editBankError, isBankUpdated, loading } = useSelector((state: any) => ({
        createBankError: state.Company.Bank.createBankError,
        isBankCreated: state.Company.Bank.isBankCreated,

        editBankError: state.Company.Bank.editBankError,
        isBankUpdated: state.Company.Bank.isBankUpdated,
        loading: state.Company.Bank.loading,
    }));


    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: bank ? bank.name : '',
            benificary: bank ? bank.benificary : '',
            account_number: bank ? bank.account_number : '',
            iban: bank ? bank.iban : '',
            swift_code: bank ? bank.swift_code : '',
            address1: bank ? bank.address1 : '',
            address2: bank ? bank.address2 : '',
            zip: bank ? bank.zip : '',
            city: bank ? bank.city : '',
            region: bank ? bank.region : '',
            country: bank ? bank.country : '',
            currency: bank ? bank.currency : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Bank name is required')),
            benificary: Yup.string().required(t('Benificary name is required')),
            account_number: Yup.string().required(t('Account Number is required')),
            iban: Yup.string().required(t('Iban is required')),
            swift_code: Yup.string().required(t('Swift Code is required')),
            country: Yup.object().required(t('Country is required')),
        }),
        onSubmit: values => {

                if (bank) {
                    dispatch(editBank(companyId, bank.id, {...values, country: values['country']['value']}));
                } else {
                    dispatch(createBank(companyId, {...values, country: values['country']['value']}));
                }
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-bank-modal-header"></Modal.Header>
            <Modal.Body className="p-0">
                <div className="position-relative">
                    {loading ? <Loader />: null}

                    <div className="px-5 pb-5">
                        <h1 className="mb-2 mt-0">{bank ? t("Edit Bank") : t("Add Bank")}</h1>

                        {(!isBankCreated && createBankError) && <AlertMessage error={createBankError} />}
                        {(!isBankUpdated && editBankError) && <AlertMessage error={editBankError} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                          <Form.Group className="mb-4">
                              <Form.Label htmlFor="usr">{t('Bank Name')}</Form.Label>
                              <Form.Control type="text" className="form-control" id="name" name="name" placeholder="Bank Name"
                                  onBlur={validator.handleBlur}
                                  value={validator.values.name}
                                  onChange={validator.handleChange}
                                  isInvalid={validator.touched.name && validator.errors && validator.errors.name ? true : false}
                                  maxLength={200} />


                              {validator.touched.name && validator.errors.name ? (
                                  <Form.Control.Feedback type="invalid">{validator.errors.name}</Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
                          <Row>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Benificary Name')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="benificary" name="benificary" placeholder="Benificary Name"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.benificary}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.benificary && validator.errors && validator.errors.benificary ? true : false}
                                      maxLength={100} />


                                  {validator.touched.benificary && validator.errors.benificary ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.benificary}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Account Number')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="account_number" name="account_number" placeholder="Account Number"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.account_number}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.account_number && validator.errors && validator.errors.account_number ? true : false}
                                      maxLength={100} />


                                  {validator.touched.account_number && validator.errors.account_number ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.account_number}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('International Bank Account Number')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="iban" name="iban" placeholder="International Bank Account Number"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.iban}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.iban && validator.errors && validator.errors.iban ? true : false}
                                      maxLength={100} />


                                  {validator.touched.iban && validator.errors.iban ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.iban}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Swift Code')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="swift_code" name="swift_code" placeholder="Swift Code"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.swift_code}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.swift_code && validator.errors && validator.errors.swift_code ? true : false}
                                      maxLength={100} />


                                  {validator.touched.swift_code && validator.errors.swift_code ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.swift_code}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-4">
                              <Form.Label htmlFor="usr">{t('Address')}</Form.Label>
                              <Form.Control type="text" className="form-control" id="address1" name="address1" placeholder="Address"
                                  onBlur={validator.handleBlur}
                                  value={validator.values.address1}
                                  onChange={validator.handleChange}
                                  isInvalid={validator.touched.address1 && validator.errors && validator.errors.address1 ? true : false}
                                  maxLength={200} />


                              {validator.touched.address1 && validator.errors.address1 ? (
                                  <Form.Control.Feedback type="invalid">{validator.errors.address1}</Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
                          <Form.Group className="mb-4">
                              <Form.Label htmlFor="usr">{t('Apartment, suite, etc.')}</Form.Label>
                              <Form.Control type="text" className="form-control" id="address2" name="address2" placeholder="Apartment, suite, etc."
                                  onBlur={validator.handleBlur}
                                  value={validator.values.address2}
                                  onChange={validator.handleChange}
                                  isInvalid={validator.touched.address2 && validator.errors && validator.errors.address2 ? true : false}
                                  maxLength={200} />


                              {validator.touched.address2 && validator.errors.address2 ? (
                                  <Form.Control.Feedback type="invalid">{validator.errors.address2}</Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
                          <Row>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Postal Code')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="zip" name="zip" placeholder="Postal Code"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.zip}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.zip && validator.errors && validator.errors.zip ? true : false}
                                      maxLength={20} />


                                  {validator.touched.zip && validator.errors.zip ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.zip}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('City')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="city" name="city" placeholder="City"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.city}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.city && validator.errors && validator.errors.city ? true : false}
                                      maxLength={100} />


                                  {validator.touched.city && validator.errors.city ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.city}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Region')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="region" name="region" placeholder="Region"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.region}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.region && validator.errors && validator.errors.region ? true : false}
                                      maxLength={100} />


                                  {validator.touched.region && validator.errors.region ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.region}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Country')}</Form.Label>
                                  <CountriesDropdown name='Country' placeholder={t('Country')} className={validator.touched.country && validator.errors.country ? "is-invalid" : ""}
                                      onChange={(value) => validator.setFieldValue('country', value)}
                                      value={validator.values.country} />

                                  {validator.touched.country && validator.errors.country ? (
                                      <Form.Control.Feedback type="invalid" className="d-block">
                                          {validator.errors.country}
                                      </Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{t('Currency')}</Form.Label>
                                  <Form.Control type="text" className="form-control" id="currency" name="currency" placeholder="Currency"
                                      onBlur={validator.handleBlur}
                                      value={validator.values.currency}
                                      onChange={validator.handleChange}
                                      isInvalid={validator.touched.currency && validator.errors && validator.errors.currency ? true : false}
                                      maxLength={50} />


                                  {validator.touched.currency && validator.errors.currency ? (
                                      <Form.Control.Feedback type="invalid">{validator.errors.currency}</Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                          </Row>
                          <div>
                              <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                              <Button type="submit" variant="primary">{bank ? t("Edit Bank") : t("Add Bank")}</Button>
                          </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditBank;
