import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { getAmazonCompany, updateAmazonCompany, resetAmazonCompany } from "../../../redux/actions";
import Loader from "../../../components/Loader";
import CountriesDropdown from "../../../components/CountriesDropdown";
import MessageAlert from "../../../components/MessageAlert";
import { COUNTRIES } from "../../../constants";

interface EditCompanyInfoProps {
    market: any;
    companyId: string | number;
    onClose: any;
}

const EditCompanyInfo = ({ companyId, market, onClose }: EditCompanyInfoProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetAmazonCompany());
        if (market['amazoncompany_id']) {
            dispatch(getAmazonCompany(companyId, market['amazoncompany_id'])); // 
        }
    }, [dispatch, companyId, market]);

    const { loading, isCompanyUpdated, error, amazonCompany } = useSelector((state: any) => ({
        loading: state.Company.AmazonCompany.loading,
        isCompanyUpdated: state.Company.AmazonCompany.isCompanyUpdated,
        error: state.Company.AmazonCompany.error,
        amazonCompany: state.Company.AmazonCompany.amazonCompany,
    }));

    useEffect(() => {
        if (isCompanyUpdated) {
            onClose();
            setTimeout(() => {
                dispatch(resetAmazonCompany());
            }, 1000);
        }
    }, [isCompanyUpdated]);


    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            address1: '',
            address2: '',
            city: '',
            email: '',
            name: '',
            organization_number: '',
            phone_number: '',
            region: '',
            store_name: '',
            vat_number: '',
            zip: '',
            ...amazonCompany,
            country: amazonCompany && amazonCompany['country'] ? { label: COUNTRIES[amazonCompany['country']], 'value': amazonCompany['country'] } : null
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Company name is required')),
            country: Yup.object().required(t('Country is required')),
            email: Yup.string().required(t('Email is required')),
            store_name: Yup.string().required(t('Store name is required')),
        }),
        onSubmit: values => {
            const newData = { ...amazonCompany, ...values };

            if (values['country']) {
                newData['country'] = values['country']['value'];
            }
            dispatch(updateAmazonCompany(companyId, market['amazoncompany_id'], newData));
        }
    });

    return <>
        <Modal show={true} onHide={onClose} size="xl">
            <Modal.Header closeButton className="add-payment-modal-header py-1">
                <h4 className="mt-2">{t('Edit Company Information')}</h4>
            </Modal.Header>
            <Modal.Body className="p-4">
                {loading ? <Loader /> : null}

                <Row>
                    <Col lg={12}>
                        <Form noValidate onSubmit={validator.handleSubmit} className="">
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('Name')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Name")}
                                            name="name" id="name"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.name}
                                            isInvalid={validator.touched.name && validator.errors && validator.errors.name ? true : false} />


                                        {validator.touched.name && validator.errors.name ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.name}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('Store Name')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Store name")}
                                            name="store_name" id="store_name"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.store_name}
                                            isInvalid={validator.touched.store_name && validator.errors && validator.errors.store_name ? true : false} />


                                        {validator.touched.store_name && validator.errors.store_name ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.store_name}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>

                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('Organization Number')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Organization Number")}
                                            name="organization_number" id="organization_number"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.organization_number}
                                            isInvalid={validator.touched.organization_number && validator.errors && validator.errors.organization_number ? true : false} />


                                        {validator.touched.organization_number && validator.errors.organization_number ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.organization_number}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('VAT Number')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Vat Number")}
                                            name="vat_number" id="vat_number"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.vat_number}
                                            isInvalid={validator.touched.vat_number && validator.errors && validator.errors.vat_number ? true : false} />


                                        {validator.touched.vat_number && validator.errors.vat_number ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.vat_number}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('Address')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Address")}
                                            name="address1" id="address1"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.address1}
                                            isInvalid={validator.touched.address1 && validator.errors && validator.errors.address1 ? true : false} />


                                        {validator.touched.address1 && validator.errors.address1 ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.address1}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('Apartment, suite, etc.')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Apartment, suite, etc.")}
                                            name="address2" id="address2"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.address2}
                                            isInvalid={validator.touched.address2 && validator.errors && validator.errors.address2 ? true : false} />


                                        {validator.touched.address2 && validator.errors.address2 ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.address2}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>{t('City')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("City")}
                                            name="city" id="city"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.city}
                                            isInvalid={validator.touched.city && validator.errors && validator.errors.city ? true : false} />


                                        {validator.touched.city && validator.errors.city ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.city}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>{t('Region')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Region")}
                                            name="region" id="region"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.region}
                                            isInvalid={validator.touched.region && validator.errors && validator.errors.region ? true : false} />


                                        {validator.touched.region && validator.errors.region ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.region}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>{t('Country')}</Form.Label>
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
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('Email')}</Form.Label>
                                        <Form.Control type="email" placeholder={t("Email")}
                                            name="email" id="email"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.email}
                                            isInvalid={validator.touched.email && validator.errors && validator.errors.email ? true : false} />

                                        {validator.touched.email && validator.errors.email ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.email}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>{t('Phone number')}</Form.Label>
                                        <Form.Control type="text" placeholder={t("Phone number")}
                                            name="phone_number" id="phone_number"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.phone_number}
                                            isInvalid={validator.touched.phone_number && validator.errors && validator.errors.phone_number ? true : false} />

                                        {validator.touched.phone_number && validator.errors.phone_number ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.phone_number}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-0">
                                <Button variant="primary" type="submit">{t('Submit')}</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>

        {error ? <MessageAlert message={error} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
    </>;
}

export default EditCompanyInfo;
