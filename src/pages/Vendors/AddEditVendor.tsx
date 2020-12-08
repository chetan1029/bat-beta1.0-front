import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from "classnames";

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";
import CountriesDropdown from "../../components/CountriesDropdown";

//actions
import { signupUser } from "../../redux/actions";
import DisplayDate from "../../components/DisplayDate";


interface GeneralInfoProp {
    onSubmit: any,
    values: any,
    disableEmail?: boolean
}

const GeneralInfo = ({ onSubmit, values, disableEmail }: GeneralInfoProp) => {

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            password1: '',
            email: '',
            password2: '',
            ...(values || {})
        },
        validationSchema: Yup.object({
            username: Yup.string().required(t('Username is required')).max(150, t('Please enter less than 150 characters')),
            password1: Yup.string().required(t('Password is required')).min(8, t('Password is too short. It must contain at least 8 characters.')),
            password2: Yup.string().required(t('Confirm password is required')).oneOf([Yup.ref('password1'), null], t('Passwords must match')),
            email: Yup.string().email().required(t('Email is required')),
            first_name: Yup.string().required(t('First name is required')),
            last_name: Yup.string().required(t('Last name is required')),
        }),
        onSubmit: values => {
            onSubmit(values);
        },
    });

    return <Form noValidate onSubmit={validator.handleSubmit} className="">
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>{t("First name")}</Form.Label>
                    <Form.Control type="text" placeholder={t("First name")}
                        name="first_name" id="first_name"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.first_name}
                        isInvalid={validator.touched.first_name && validator.errors && validator.errors.first_name ? true : false} />

                    {validator.touched.first_name && validator.errors.first_name ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.first_name}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>{t("Last name")}</Form.Label>
                    <Form.Control type="text" placeholder={t("Last name")}
                        name="last_name" id="last_name"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.last_name}
                        isInvalid={validator.touched.last_name && validator.errors && validator.errors.last_name ? true : false} />


                    {validator.touched.last_name && validator.errors.last_name ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.last_name}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>{t('Username')}</Form.Label>
                    <Form.Control type="text" placeholder={t("Your username")}
                        name="username" id="username"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.username}
                        maxLength={150}
                        isInvalid={validator.touched.username && validator.errors && validator.errors.username ? true : false} />


                    {validator.touched.username && validator.errors.username ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.username}</Form.Control.Feedback>
                    ) : null}
                    <Form.Text id="usernameHelp" muted>{t('Required 150 characters or fewer.')}</Form.Text>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>{t('Email')}</Form.Label>
                    <Form.Control type="email" placeholder={t("Email")}
                        name="email" id="email"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.email}
                        disabled={disableEmail}
                        isInvalid={validator.touched.email && validator.errors && validator.errors.email ? true : false} />

                    {validator.touched.email && validator.errors.email ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.email}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>{t('Password')}</Form.Label>
                    <Form.Control type="password" placeholder={t("Password")}
                        name="password1" id="password1"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.password1}
                        isInvalid={validator.touched.password1 && validator.errors && validator.errors.password1 ? true : false} />


                    {validator.touched.password1 && validator.errors.password1 ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.password1}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>{t('Confirm password')}</Form.Label>
                    <Form.Control type="password" placeholder={t("Confirm password")}
                        name="password2" id="password2"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.password2}
                        isInvalid={validator.touched.password2 && validator.errors && validator.errors.password2 ? true : false} />


                    {validator.touched.password2 && validator.errors.password2 ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.password2}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-0">
            <Button variant="primary" type="submit">{t('Continue')}</Button>
        </Form.Group>
    </Form>
}


interface AccountSetupProp {
    onSubmit: any,
    generalInfo?: any,
    values?: any
}

const AccountSetup = ({ onSubmit, generalInfo, values }: AccountSetupProp) => {

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        initialValues: {
            name: '',
            abbreviation: '',
            address1: '',
            address2: '',
            country: '',
            zip: '',
            city: '',
            region: '',
            email: generalInfo && generalInfo['email'] ? generalInfo['email'] : '',
            phone_number: '',
            ...(values || {})
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
            <Col>
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
            <Col>
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
            <Col>
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
            <Col>
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
            <Col>
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
            <Col>
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

            <Col>
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


interface AddEditVendorProps {
    match: any;
}
const AddEditVendor = (props: AddEditVendorProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;

    const { loading, userSignUp, userLoggedIn, user, error, companyCreated, companyError } = useSelector((state: any) => ({
        loading: state.Auth.loading || state.Company.Common.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
        userLoggedIn: state.Auth.userLoggedIn,
        companyCreated: state.Company.Common.companyCreated,
        companyError: state.Company.Common.error,
    }));

    const [generalInfo, setgeneralInfo] = useState<any>(null);
    const onGeneralInfoSubmit = (info: any) => {
        setgeneralInfo(info);
        dispatch(signupUser(info));
    }

    const [companyInfo, setcompanyInfo] = useState<any>();

    const onCompanySubmit = (info: any) => {
        setcompanyInfo(info);
        dispatch(createCompany({ ...info, country: info['country']['value'] }));
    }

    useEffect(() => {
        if (userSignUp) {
            setselectedStep('account');
        }
    }, [userSignUp, companyInfo, dispatch]);


    const [selectedStep, setselectedStep] = useState('general');


    return (
        <>
            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/supply-chain/${companyId}/vendors/${categoryId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Add New Vendor')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="">

                </Card.Body>
            </Card>

        </>
    );
}

export default withRouter(AddEditVendor);