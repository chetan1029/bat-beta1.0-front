import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


//import loader
import Loader from '../../components/Loader';
import { useQuery } from "../../components/Hooks";

import { loginUser } from "../../redux/actions";

const Login = () => {
    const dispatch = useDispatch();

    const query: any = useQuery();
    const next: string = query.get('next');

    useEffect(() => {
        document['body'].classList.add('auth-bg');

        return () => {
            document['body'].classList.remove('auth-bg');
        }
    }, []);

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required(t('Username is required')),
            password: Yup.string()
                .required(t('Password is required'))
        }),
        onSubmit: values => {
            dispatch(loginUser(values['username'], values['password']));
        },
    });

    const { loading, userLoggedIn, user, error } = useSelector((state: any) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn
    }));


    return <>
        {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}

        <div className="h-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card>
                            <Card.Body className="p-4">
                                <Row className="no-gutters">
                                    <Col>
                                        {loading && <Loader />}


                                        <h5 className="my-0">{t('Log In')}</h5>
                                        <p className="text-muted mt-1 mb-4">
                                            {t('Do not have the account?')} <Link to='/signup' className="text-primary font-weight-bold">{t('Sign Up')}</Link>
                                        </p>

                                        {/* <Row>
                                            <Col xs={6} className="text-center">
                                                <Link to="#" className="btn btn-white btn-block"><i className='uil uil-google icon-google mr-2'></i>With Google</Link>
                                            </Col>
                                            <Col xs={6} className="text-center">
                                                <Link to="#" className="btn btn-white btn-block"><i className='uil uil-facebook mr-2 icon-fb'></i>With Facebook</Link>
                                            </Col>
                                        </Row>

                                        <div className="py-3 text-center"><span>or</span></div> */}

                                        {error && <Alert variant="danger" className="my-2">{error}</Alert>}

                                        <Form noValidate onSubmit={validator.handleSubmit} className="">
                                            <Form.Group>
                                                {/* <Form.Label>Username</Form.Label> */}
                                                <Form.Control type="text" placeholder={t("Your username")}
                                                    name="username" id="username"
                                                    onChange={validator.handleChange}
                                                    onBlur={validator.handleBlur}
                                                    value={validator.values.username}
                                                    isInvalid={validator.touched.username && validator.errors && validator.errors.username ? true : false} />


                                                {validator.touched.username && validator.errors.username ? (
                                                    <Form.Control.Feedback type="invalid">{validator.errors.username}</Form.Control.Feedback>
                                                ) : null}
                                            </Form.Group>

                                            <Form.Group>
                                                {/* <Form.Label>Password</Form.Label> */}
                                                <Form.Control type="password" placeholder={t("Your password")}
                                                    name="password" id="password"
                                                    onChange={validator.handleChange}
                                                    onBlur={validator.handleBlur}
                                                    value={validator.values.password}
                                                    isInvalid={validator.touched.password && validator.errors && validator.errors.password ? true : false} />


                                                {validator.touched.password && validator.errors.password ? (
                                                    <Form.Control.Feedback type="invalid">{validator.errors.password}</Form.Control.Feedback>
                                                ) : null}
                                            </Form.Group>

                                            <Row>
                                                <Col className="text-right">
                                                    <Link to="/forgot-password" className='font-weight-bold'>{t('Forgot Password?')}</Link>
                                                </Col>
                                            </Row>


                                            <Form.Group className="mb-0">
                                                <Button variant="primary" type="submit">{t('Log In')}</Button>
                                            </Form.Group>
                                        </Form>

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

export default Login;