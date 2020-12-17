import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import CountriesDropdown from "../../components/CountriesDropdown";
import TimezoneDropdown from "../../components/TimezoneDropdown";
import MessageAlert from "../../components/MessageAlert";

import { editCompany, getCompany } from "../../redux/actions";

import { COUNTRIES } from "../../constants";


interface EditCompanyProps {
    match: any
}

const EditCompany = (props: EditCompanyProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const companyId = props.match.params.companyId;

    useEffect(() => {
        if (companyId) {
            dispatch(getCompany(companyId));
        }
    }, [dispatch, companyId]);

    const { loading, companyEdited, error, company } = useSelector((state: any) => ({
        loading: state.Company.Common.loading,
        companyEdited: state.Company.Common.companyEdited,
        error: state.Company.Common.error,
        company: state.Company.Common.company,
    }));


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
            email: '',
            phone_number: '', ...company,
            country: company && company['country'] ? { label: COUNTRIES[company['country']], 'value': company['country'] } : null,
            timezone: company && company['timezone'] ? { label: company['timezone'], value: company['timezone'] } : null
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Company name is required')),
            country: Yup.object().required(t('Country is required')),
            email: Yup.string().required(t('Email is required')),
        }),
        onSubmit: values => {
            dispatch(editCompany(companyId, { ...company, ...values }));
        },
    });


    return <>

        <div className="py-4 px-3">
            <Row className="align-items-center">
                <Col lg={6}>
                    <div className="d-flex align-items-center">
                        {/* <Link to={`/companies`}>
                            <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                        </Link> */}
                        <h1 className="m-0">{t('Edit Company Information')}</h1>
                    </div>
                </Col>
            </Row>
        </div>

        <Card>
            <Card.Body className="p-4">
                <div className="position-relative">
                    {loading ? <Loader /> : null}

                    <Row>
                        <Col lg={12}>
                            <Form noValidate onSubmit={validator.handleSubmit} className="">
                                <Row>
                                    <Col md={6}>
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
                                    <Col md={6}>
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
                                    <Col md={12}>
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
                                </Row>

                                <Row>
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
                                    <Col md={6}>
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

                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>{t('Time zone')}</Form.Label>
                                            <TimezoneDropdown name='timezone' placeholder={t('Timezone')}
                                                className={validator.touched.timezone && validator.errors.timezone ? "is-invalid" : ""}
                                                onChange={(value) => validator.setFieldValue('timezone', value)}
                                                value={validator.values.timezone} />

                                            {validator.touched.timezone && validator.errors.timezone ? (
                                                <Form.Control.Feedback type="invalid" className="d-block">
                                                    {validator.errors.timezone}
                                                </Form.Control.Feedback>
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
                </div>
            </Card.Body>

            {error ? <MessageAlert message={error} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}

            {companyEdited ? <MessageAlert message={t('The company details is updated')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
        </Card>

    </>;
}

export default EditCompany;