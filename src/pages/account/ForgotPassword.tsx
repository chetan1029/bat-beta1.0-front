import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


//import loader
import Loader from '../../components/Loader';
import Icon from "../../components/Icon";

import { forgotPassword } from "../../redux/actions";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document['body'].classList.add('auth-bg');
        return () => {
            document['body'].classList.remove('auth-bg');
        }
    })

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required(t('Email is required'))
        }),
        onSubmit: values => {
            dispatch(forgotPassword(values));
        },
    });

    const { loading, userLoggedIn, passwordReset, user, error } = useSelector((state: any) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
        passwordReset: state.Auth.passwordReset,
    }));


    return <>
        {userLoggedIn || user ? <Redirect to='/'></Redirect> : null}

        <div className="h-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card>
                            <Card.Body className="p-4">
                                <Row className="no-gutters">
                                    <Col>
                                        {loading && <Loader />}

                                        {passwordReset ? <>
                                            <div className="p-3">
                                                <h4 className="my-0">{t('The link for password recovery was successfully sent to your email address')}</h4>
                                                <p className="text-muted mt-2 mb-4 w-75">
                                                    {t('The link for password recovery was successfully sent to your email address. Please,check your email box. ')}
                                                </p>

                                                <div className="mt-4">
                                                    <Link to='/' className="btn btn-primary">{t('Back to Home page')}</Link>
                                                </div>
                                            </div>
                                        </> : <>
                                                <h5 className="my-0">{t('Forgot password')}</h5>
                                                <p className="text-muted mt-1 mb-4">
                                                    {t('Please, enter your email address so we can send you a link for password reset.')}
                                                </p>


                                                {error && !passwordReset && <Alert variant="danger" className="my-2">{error}</Alert>}


                                                <Form noValidate onSubmit={validator.handleSubmit} className="">
                                                    <Form.Group>
                                                        <Form.Label>{t('Email address')}</Form.Label>
                                                        <Form.Control type="email" placeholder={t("Email address")}
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
                                                        <Button variant="primary" type="submit">{t('Confirm')}</Button>
                                                    </Form.Group>


                                                    <Form.Group className="mb-0">
                                                        <Link to={'/login'} className="font-weight-bold">
                                                            <Icon name="back-arrow" className="icon mr-2"></Icon>
                                                            {t('Back to the Log In screen')}
                                                        </Link>
                                                    </Form.Group>
                                                </Form>
                                            </>}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    </>;
}

export default ForgotPassword;