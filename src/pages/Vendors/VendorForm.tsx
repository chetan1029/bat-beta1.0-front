import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CountriesDropdown from "../../components/CountriesDropdown";

import { COUNTRIES } from "../../constants";

interface VendorFormProps {
    onSubmit: any,
    email?: any,
    values?: any
}

const VendorForm = ({ onSubmit, email, values }: VendorFormProps) => {

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            abbreviation: '',
            address1: '',
            address2: '',
            zip: '',
            city: '',
            region: '',
            email: email || '',
            phone_number: '',
            ...(values || {}),
            country: values && values['country'] ? { label: COUNTRIES[values['country']], 'value': values['country'] } : null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Company name is required')),
            country: Yup.object().required(t('Country is required')),
            email: Yup.string().required(t('Email is required')),
        }),
        onSubmit: values => {
            onSubmit(values);
        },
    });

    return <Form noValidate onSubmit={validator.handleSubmit} className="">
        <Row>
            <Col lg={6}>
                <Form.Group>
                    <Form.Label>{t('Company name')}</Form.Label>
                    <Form.Control type="text" placeholder={t("Company name")}
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
            <Col lg={6}>
                <Form.Group>
                    <Form.Label>{t('Abbreviation')}</Form.Label>
                    <Form.Control type="text" placeholder={t("Abbreviation")}
                        name="abbreviation" id="abbreviation"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.abbreviation}
                        isInvalid={validator.touched.abbreviation && validator.errors && validator.errors.abbreviation ? true : false} />


                    {validator.touched.abbreviation && validator.errors.abbreviation ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.abbreviation}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col lg={6}>
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
            <Col lg={6}>
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
            <Col lg={4}>
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
            <Col lg={4}>
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
            <Col lg={4}>
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
            <Col lg={4}>
                <Form.Group>
                    <Form.Label>{t('Zip')}</Form.Label>
                    <Form.Control type="text" placeholder={t("Zip")}
                        name="zip" id="zip"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.zip}
                        isInvalid={validator.touched.zip && validator.errors && validator.errors.zip ? true : false} />


                    {validator.touched.zip && validator.errors.zip ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.zip}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>

            <Col lg={4}>
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

            <Col lg={4}>
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
}

export default VendorForm;