import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//import loader
import Loader from '../../components/Loader';
import AlertMessage from "../../components/AlertMessage";

import { signupUser, resetAuth } from "../../redux/actions";

import TermsConditions from "./TermsConditions";


interface SignUpFormProps {
    onSubmit: any
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        initialValues: {
            username: '',
            password1: '',
            password2: '',
            email: '',
            company_name: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required(t('Username is required')).max(150, t('Please enter less than 150 characters')),
            password1: Yup.string().required(t('Password is required')).min(8, t('Password is too short. It must contain at least 8 characters.')),
            password2: Yup.string().required(t('Confirm password is required')).oneOf([Yup.ref('password1'), null], t('Passwords must match')),
            email: Yup.string().email().required(t('Email is required')),
            company_name: Yup.string().required(t('Company name is required')),
        }),
        onSubmit: values => {
            onSubmit(values);
        },
    });

    const [showTerms, setshowTerms] = useState(false);
    const [acceptTerms, setacceptTerms] = useState(true);
    const AcceptTermsLabel = () => <><span>{t('Accept')}</span><Link to='#' onClick={() => setshowTerms(true)} className='font-weight-bold text-primary'>&nbsp;{t('Terms and Conditions')}</Link></>;

    return <Form noValidate onSubmit={validator.handleSubmit} className="">
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
                        isInvalid={validator.touched.email && validator.errors && validator.errors.email ? true : false} />

                    {validator.touched.email && validator.errors.email ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.email}</Form.Control.Feedback>
                    ) : null}
                    <Form.Text id="emailHelp" muted>{t('Your email is only and only use by us.')}</Form.Text>
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

        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>{t('Company name')}</Form.Label>
                    <Form.Control type="text" placeholder={t("Company name")}
                        name="company_name" id="company_name"
                        onChange={validator.handleChange}
                        onBlur={validator.handleBlur}
                        value={validator.values.company_name}
                        isInvalid={validator.touched.company_name && validator.errors && validator.errors.company_name ? true : false} />


                    {validator.touched.company_name && validator.errors.company_name ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.company_name}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
        </Row>

        <Form.Group>
            <Form.Check type="checkbox" label={<AcceptTermsLabel />} checked={acceptTerms}
                onChange={(e: any) => setacceptTerms(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-0 pt-3">
            <Button variant="primary" type="submit" disabled={!acceptTerms}>{t('Sign Up')}</Button>
        </Form.Group>

        {showTerms ? <TermsConditions onClose={() => setshowTerms(false)} /> : null}
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

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userSignUp, userLoggedIn, user, error } = useSelector((state: any) => ({
        loading: state.Auth.loading || state.Company.Common.loading,
        user: state.Auth.user,
        error: state.Auth.registerError,
        userSignUp: state.Auth.userSignUp,
        userLoggedIn: state.Auth.userLoggedIn
    }));

    
    const onSubmit = (info: any) => {
        dispatch(signupUser(info));
    }

    return <>
        {((userLoggedIn || user) && !userSignUp) || userSignUp ? <Redirect to='/'></Redirect> : null}


        <div className="h-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={9}>
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

                                            {error && !userSignUp ? <AlertMessage error={error} /> : null}

                                            <SignUpForm onSubmit={onSubmit} />
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

export default withRouter(SignUp);
