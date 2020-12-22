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
import { createLocation, editLocation, reset } from "../../redux/actions";
interface AddEditLocationProps {
    isOpen: boolean;
    onClose: any;
    location?: any;
    companyId: any;
}
const AddEditLocation = ({ isOpen, onClose, location, companyId }: AddEditLocationProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const { createLocationError, isLocationCreated, editLocationError, isLocationUpdated, loading } = useSelector((state: any) => ({
        createLocationError: state.Company.Location.createLocationError,
        isLocationCreated: state.Company.Location.isLocationCreated,

        editLocationError: state.Company.Location.editLocationError,
        isLocationUpdated: state.Company.Location.isLocationUpdated,
        loading: state.Company.Location.loading,
    }));


    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: location ? location.name : '',
            address1: location ? location.address1 : '',
            address2: location ? location.address2 : '',
            zip: location ? location.zip : '',
            city: location ? location.city : '',
            region: location ? location.region : '',
            country: location ? { label: COUNTRIES[location.country], value: location.country } : '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Location name is required')),
            address1: Yup.string().required(t('Address is required')),
            zip: Yup.string().required(t('Postal Code is required')),
            city: Yup.string().required(t('City is required')),
            country: Yup.object().required(t('Country is required')),
        }),
        onSubmit: values => {

                if (location) {
                    dispatch(editLocation(companyId, location.id, {...values, country: values['country']['value']}));
                } else {
                    dispatch(createLocation(companyId, {...values, country: values['country']['value']}));
                }
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-location-modal-header">
              <Modal.Title>{location ? t("Edit Location") : t("Add Location")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">
                    {loading ? <Loader />: null}

                    <div>

                        {(!isLocationCreated && createLocationError) && <AlertMessage error={createLocationError} />}
                        {(!isLocationUpdated && editLocationError) && <AlertMessage error={editLocationError} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                          <Form.Group className="mb-4">
                              <Form.Label htmlFor="usr">{t('Location Name')}</Form.Label>
                              <Form.Control type="text" className="form-control" id="name" name="name" placeholder="Location Name"
                                  onBlur={validator.handleBlur}
                                  value={validator.values.name}
                                  onChange={validator.handleChange}
                                  isInvalid={validator.touched.name && validator.errors && validator.errors.name ? true : false}
                                  maxLength={200} />


                              {validator.touched.name && validator.errors.name ? (
                                  <Form.Control.Feedback type="invalid">{validator.errors.name}</Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
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
                                  <CountriesDropdown name='country' placeholder={t('Country')} className={validator.touched.country && validator.errors.country ? "is-invalid" : ""}
                                      onChange={(value) => validator.setFieldValue('country', value)}
                                      value={validator.values.country} />

                                  {validator.touched.country && validator.errors.country ? (
                                      <Form.Control.Feedback type="invalid" className="d-block">
                                          {validator.errors.country}
                                      </Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                            </Col>
                          </Row>
                          <div>
                              <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                              <Button type="submit" variant="primary">{location ? t("Edit Location") : t("Add Location")}</Button>
                          </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditLocation;
