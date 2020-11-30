import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//import loader
import Loader from '../../components/Loader';
import CountriesDropdown from "../../components/CountriesDropdown";
import AlertMessage from "../../components/AlertMessage";

import { signupUser, createCompany } from "../../redux/actions";


interface GeneralInfoProp {
    onSubmit: any,
    values: any
}

const GeneralInfo = ({ onSubmit, values }: GeneralInfoProp) => {

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
        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
            {/* <Form.Label>Username</Form.Label> */}
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

        <Form.Group>
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

        <Form.Group>
            {/* <Form.Label>Password</Form.Label> */}
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

        <Form.Group>
            {/* <Form.Label>Password</Form.Label> */}
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

    const [acceptTerms, setacceptTerms] = useState(true);
    const AcceptTermsLabel = () => <><span>{t('Accept')}</span><Link to='#' onClick={() => { }} className=''>&nbsp;{t('Terms and Conditions')}</Link></>;

    return <Form noValidate onSubmit={validator.handleSubmit} className="">
        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
            <CountriesDropdown name='Country' placeholder={t('Country')} className={validator.touched.country && validator.errors.country ? "is-invalid" : ""}
                onChange={(value) => validator.setFieldValue('country', value)}
                value={validator.values.country} />

            {validator.touched.country && validator.errors.country ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                    {validator.errors.country}
                </Form.Control.Feedback>
            ) : null}
        </Form.Group>

        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
            <Form.Check type="checkbox" label={<AcceptTermsLabel />} checked={acceptTerms}
                onChange={(e: any) => setacceptTerms(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-0">
            <Button variant="primary" type="submit" disabled={!acceptTerms}>{t('Sign Up')}</Button>
        </Form.Group>
    </Form>
}


const SignUp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document['body'].classList.add('auth-bg');
        return () => {
            document['body'].classList.remove('auth-bg');
        }
    });

    const { t } = useTranslation();

    const { loading, userSignUp, userLoggedIn, user, error, companyCreated, companyError } = useSelector((state: any) => ({
        loading: state.Auth.loading || state.Company.Common.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
        userLoggedIn: state.Auth.userLoggedIn,
        companyCreated: state.Company.Common.companyCreated,
        companyError: state.Company.Common.error,
    }));

    const [generalInfo, setgeneralInfo] = useState<any>();
    const onGeneralInfoSubmit = (info: any) => {
        setgeneralInfo(info);
        dispatch(signupUser(info));
    }

    const [companyInfo, setcompanyInfo] = useState<any>();

    const onCompanySubmit = (info: any) => {
        setcompanyInfo(info);
        dispatch(createCompany({...info, country: info['country']['value']}));
    }

    useEffect(() => {
        if (userSignUp) {
            setselectedStep('account');
        }
    }, [userSignUp, companyInfo, dispatch]);


    const [selectedStep, setselectedStep] = useState('general');


    return <>
        {((userLoggedIn || user) && !userSignUp) || companyCreated ? <Redirect to='/'></Redirect> : null}

        <div className="h-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card>
                            <Card.Body className="p-4">
                                <div className="p-2">
                                    <Row className="no-gutters">
                                        <Col>
                                            {loading && <Loader />}

                                            <h5 className="my-0">{t('Sign Up')}</h5>
                                            <p className="text-muted mt-1 mb-4">
                                                {t('Already have an account?')} <Link to='/login' className="text-primary font-weight-bold">{t('Log in')}</Link>
                                            </p>

                                            <Row className="mb-4">
                                                <Col xs='auto'>
                                                    <Link to='#' onClick={() => setselectedStep('general')}>
                                                        <Badge variant='primary' className='step-indicator'>1</Badge>
                                                        <span className="text-muted font-weight-semibold">{t('General Info')}</span>
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Link to='#' onClick={() => {
                                                        if (generalInfo && userSignUp)
                                                            setselectedStep('account')
                                                    }}>
                                                        <Badge variant={selectedStep === 'account' ? 'primary' : 'muted'} className='step-indicator'>2</Badge>
                                                        <span className="text-muted font-weight-semibold">{t('Account Setup')}</span>
                                                    </Link>
                                                </Col>
                                            </Row>

                                            {/* <Row>
                                            <Col xs={6} className="text-center">
                                                <Link to="#" className="btn btn-white btn-block"><i className='uil uil-google icon-google mr-2'></i>With Google</Link>
                                            </Col>
                                            <Col xs={6} className="text-center">
                                                <Link to="#" className="btn btn-white btn-block"><i className='uil uil-facebook mr-2 icon-fb'></i>With Facebook</Link>
                                            </Col>
                                        </Row>

                                        <div className="py-3 text-center"><span>or</span></div> */}

                                            {error && !userSignUp ? <AlertMessage error={error} /> : null}

                                            {companyError ? <AlertMessage error={companyError} /> : null}

                                            {selectedStep === 'general' ? <GeneralInfo onSubmit={onGeneralInfoSubmit} values={generalInfo} /> : <AccountSetup generalInfo={generalInfo} values={companyInfo} onSubmit={onCompanySubmit} />}
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    </>;
}

export default SignUp;