import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from "classnames";

//components
import Loader from "../../components/Loader";
import { LANGS, LanguageDropdown } from "../../components/LanguageDropdown";
import CountriesDropdown from "../../components/CountriesDropdown";
import TimezoneDropdown from "../../components/TimezoneDropdown";
import CurrenciesDropdown from "../../components/CurrenciesDropdown";
import WeightUnitDropdown from "../../components/WeightUnitDropdown";
import UnitSystemDropdown from "../../components/UnitSystemDropdown";
import Icon from "../../components/Icon";
import MessageAlert from "../../components/MessageAlert";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.jpg";

import { editCompany, getCompany, resetCompany } from "../../redux/actions";

import { COUNTRIES, CURRENCIES, WEIGHTS, UNIT_SYSTEMS } from "../../constants";


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

    useEffect(() => {
        if (companyEdited) {
            setTimeout(() => {
                dispatch(resetCompany());
            }, 10000);
        }
    }, [companyEdited, dispatch]);


    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            address1: '',
            address2: '',
            zip: '',
            city: '',
            region: '',
            email: '',
            organization_number: '',
            phone_number: '', ...company,
            country: company && company['country'] ? { label: COUNTRIES[company['country']], 'value': company['country'] } : null,
            timezone: company && company['time_zone'] ? { label: company['time_zone'], value: company['time_zone'] } : null,
            // abbreviation: '',
            // currency: company && company['currency'] ? { label: CURRENCIES[company['currency']], value: company['currency'] } : null,
            // language: company && company['language'] ? { label: LANGS[company['language']], value: company['language'] } : null,
            // weight_unit: company && company['weight_unit'] ? { label: WEIGHTS[company['weight_unit']], value: company['weight_unit'] } : null,
            // unit_system: company && company['unit_system'] ? { label: UNIT_SYSTEMS[company['unit_system']], value: company['unit_system'] } : null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Company name is required')),
            country: Yup.object().required(t('Country is required')),
            email: Yup.string().required(t('Email is required')),
            timezone: Yup.object().required(t('Timezone is required')).nullable(),
            // currency: Yup.object().required(t('Currency is required')).nullable(),
        }),
        onSubmit: values => {
            const newData = { ...company, ...values };

            if (values['country']) {
                newData['country'] = values['country']['value'];
            }

            if (values['timezone']) {
                newData['time_zone'] = values['timezone']['value'];
            }

            // if (values['currency']) {
            //     newData['currency'] = values['currency']['value'];
            // }
            //
            // if (values['language']) {
            //     newData['language'] = values['language']['value'];
            // }
            //
            // if (values['weight_unit']) {
            //     newData['weight_unit'] = values['weight_unit']['value'];
            // }
            //
            // if (values['unit_system']) {
            //     newData['unit_system'] = values['unit_system']['value'];
            // }

            if (logoFile) {
                newData['logo'] = logoFile;
            } else {
                delete newData['logo'];
            }

            // if (licenseFile) {
            //     newData['license_file'] = licenseFile;
            // } else {
            //     delete newData['license_file'];
            // }
            dispatch(editCompany(companyId, newData));
        },
    });

    const [logoFile, setlogoFile] = useState<any>();
    const onLogoFile = (e: any) => {
        const file = e.target.files[0];
        if (file)
            setlogoFile(file);
    }

    // const [licenseFile, setlicenseFile] = useState<any>();
    // const onLicenseFile = (e: any) => {
    //     const file = e.target.files[0];
    //     if (file)
    //         setlicenseFile(file);
    // }

    const imagePath: any = company && company['logo'] ? company['logo'] : (logoFile ? URL.createObjectURL(logoFile) : avatarPlaceholder);

    return <>

        <div className="py-4 px-3">
            <Row className="align-items-center">
                <Col lg={6}>
                    <div className="d-flex align-items-center">
                        <Link to={`/settings/${companyId}`}>
                            <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                        </Link>
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
                                        { /* <Form.Group>
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
                                        </Form.Group> */ }
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>{t('Logo')}</Form.Label>
                                            <div className="position-relative" style={{ width: 72 }}>
                                                <img width={72} height={72} className={classNames("rounded-circle", { "border": !(company && company['logo']) })}
                                                    src={imagePath} alt="" />
                                                <div className='profile-pic-edit'>
                                                    <Icon name='pencil' className="icon icon-xxs" />
                                                    <input type="file" onChange={onLogoFile} accept="image/x-png,image/gif,image/jpeg" />
                                                </div>
                                            </div>
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
                                    { /* <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>{t('Currency')}</Form.Label>
                                            <CurrenciesDropdown name='currency' placeholder={t('Currency')}
                                                className={validator.touched.currency && validator.errors.currency ? "is-invalid" : ""}
                                                onChange={(value) => validator.setFieldValue('currency', value)}
                                                value={validator.values.currency}
                                                isSingle={true} />

                                            {validator.touched.currency && validator.errors.currency ? (
                                                <Form.Control.Feedback type="invalid" className="d-block">
                                                    {validator.errors.currency}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col> */ }
                                </Row>
                                { /*
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>{t('Language')}</Form.Label>
                                            <LanguageDropdown name='language' placeholder={t('Language')}
                                                className={validator.touched.language && validator.errors.language ? "is-invalid" : ""}
                                                onChange={(value) => validator.setFieldValue('language', value)}
                                                value={validator.values.language} />

                                            {validator.touched.language && validator.errors.language ? (
                                                <Form.Control.Feedback type="invalid" className="d-block">
                                                    {validator.errors.language}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>{t('Unit System')}</Form.Label>
                                            <UnitSystemDropdown name='unit_system' placeholder={t('Unit System')}
                                                className={validator.touched.unit_system && validator.errors.unit_system ? "is-invalid" : ""}
                                                onChange={(value) => validator.setFieldValue('unit_system', value)}
                                                value={validator.values.unit_system}
                                            />

                                            {validator.touched.unit_system && validator.errors.unit_system ? (
                                                <Form.Control.Feedback type="invalid" className="d-block">
                                                    {validator.errors.unit_system}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>{t('Weight Unit')}</Form.Label>
                                            <WeightUnitDropdown name='weight_unit' placeholder={t('Weight Unit')}
                                                className={validator.touched.weight_unit && validator.errors.weight_unit ? "is-invalid" : ""}
                                                onChange={(value) => validator.setFieldValue('weight_unit', value)}
                                                value={validator.values.weight_unit}
                                            />

                                            {validator.touched.weight_unit && validator.errors.weight_unit ? (
                                                <Form.Control.Feedback type="invalid" className="d-block">
                                                    {validator.errors.weight_unit}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='align-items-center'>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>{t('Business License')}</Form.Label>
                                            <Form.Control type="file" name="license_file" id="license_file"
                                                onChange={onLicenseFile} custom />

                                            {company && company['license_file'] ? <p className="mb-0">
                                                {t('Business License')}: <a href={company['license_file']} target='_blank' className='text-primary' rel="noreferrer">{t('View Business License')}</a>
                                            </p> : null}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                */ }

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
