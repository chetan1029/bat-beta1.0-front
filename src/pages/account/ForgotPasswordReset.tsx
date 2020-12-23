import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


//import loader
import Loader from '../../components/Loader';
import AlertMessage from "../../components/AlertMessage";


import { forgotPasswordChange, resetAuth } from "../../redux/actions";

const ForgotPasswordReset = ({ match }) => {
    const dispatch = useDispatch();

    const uid: any = match.params['uid'];
    const token: any = match.params['token'];


    useEffect(() => {
        document['body'].classList.add('auth-bg');
        return () => {
            document['body'].classList.remove('auth-bg');
        }
    })

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    // validation
    const validator = useFormik({
        initialValues: {
            new_password1: '',
            new_password2: ''
        },
        validationSchema: Yup.object({
            new_password1: Yup.string().required(t('Password is required')).min(8, t('Password is too short. It must contain at least 8 characters.')),
            new_password2: Yup.string().required(t('Confirm password is required')).oneOf([Yup.ref('new_password1'), null], t('Passwords must match')),
        }),
        onSubmit: values => {
            dispatch(forgotPasswordChange({ uid, token, ...values }));
        },
    });

    const { loading, userLoggedIn, passwordChange, user, error } = useSelector((state: any) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
        passwordChange: state.Auth.passwordChange,
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


                                        {passwordChange ? <>
                                            <div className="p-3">
                                                <h4 className="my-0">{t('Your password was changed successfully')}</h4>
                                                <p className="text-muted mt-2 mb-4 w-75">
                                                    {t('Your password was changed successfully. Now you can access your account again. Log in to continue using our service.')}
                                                </p>

                                                <div className="mt-4">
                                                    <Link to='/login' className="btn btn-primary">{t('Login')}</Link>
                                                </div>
                                            </div>
                                        </> : <>

                                                <h5 className="my-0">{t('Password Recovery')}</h5>
                                                <p className="text-muted mt-1 mb-4">
                                                    {t('Please, enter your new password')}
                                                </p>


                                                {error && !passwordChange && <AlertMessage error={error} />}


                                                <Form noValidate onSubmit={validator.handleSubmit} className="">
                                                    <Form.Group>
                                                        <Form.Label>{t('New Password')}</Form.Label>
                                                        <Form.Control type="password" placeholder={t("New Password")}
                                                            name="new_password1" id="new_password1"
                                                            onChange={validator.handleChange}
                                                            onBlur={validator.handleBlur}
                                                            value={validator.values.new_password1}
                                                            isInvalid={validator.touched.new_password1 && validator.errors && validator.errors.new_password1 ? true : false} />


                                                        {validator.touched.new_password1 && validator.errors.new_password1 ? (
                                                            <Form.Control.Feedback type="invalid">{validator.errors.new_password1}</Form.Control.Feedback>
                                                        ) : null}
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label>{t('Confirm password')}</Form.Label>
                                                        <Form.Control type="password" placeholder={t("Confirm your Password")}
                                                            name="new_password2" id="new_password2"
                                                            onChange={validator.handleChange}
                                                            onBlur={validator.handleBlur}
                                                            value={validator.values.new_password2}
                                                            isInvalid={validator.touched.new_password2 && validator.errors && validator.errors.new_password2 ? true : false} />


                                                        {validator.touched.new_password2 && validator.errors.new_password2 ? (
                                                            <Form.Control.Feedback type="invalid">{validator.errors.new_password2}</Form.Control.Feedback>
                                                        ) : null}
                                                    </Form.Group>


                                                    <Form.Group>
                                                        <Button variant="primary" type="submit">{t('Confirm')}</Button>
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

export default withRouter(ForgotPasswordReset);