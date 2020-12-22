import React from "react";
import { Row, Col, Card, Form, Media, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import * as Yup from 'yup';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import TabMenu from "../../components/TabMenu";

import { changePassword } from "../../redux/actions";

interface ChangePasswordProps {
    match: any
}

const ChangePassword = (props: ChangePasswordProps) => {
    const { t } = useTranslation();

    const companyId = props.match.params.companyId;

    const dispatch = useDispatch();

    const { loading, passwordChange, error } = useSelector((state: any) => ({
        loading: state.Auth.loading,
        passwordChange: state.Auth.passwordChange,
        error: state.Auth.error
    }));


    const menuItems: Array<any> = [
        { label: t('General info'), name: 'general', to: `/profile/${companyId}/general` },
        { label: t('Change password'), name: 'change-password', to: `/profile/${companyId}/change-password` }
    ];

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            new_password1: "",
            new_password2: ""
        },
        validationSchema: Yup.object({
            new_password1: Yup.string().required(t('Password is required')).min(8, t('Password is too short. It must contain at least 8 characters.')),
            new_password2: Yup.string().required(t('Confirm password is required')).oneOf([Yup.ref('new_password1'), null], t('Passwords must match')),
        }),
        onSubmit: values => {
            dispatch(changePassword(values['new_password1'], values['new_password2']));
        },
    });

    return <>
        <div className="py-4 px-3">
            <Row>
                <Col>
                    <div className="d-flex align-items-center">
                        <Icon name="user" className="icon icon-xs mr-2" />
                        <h1 className="m-0">{t('Profile')}</h1>
                    </div>
                </Col>
            </Row>
        </div>

        <Card>
            <Card.Body className="">
                <TabMenu items={menuItems} defaultSelectedItem={'change-password'} />

                <div className="mt-3 position-relative">
                    {loading ? <Loader /> : null}

                    <Row>
                        <Col lg={6}>
                            <div className="pr-sm-5">
                                <Form noValidate onSubmit={validator.handleSubmit} className="">
                                    <Form.Group>
                                        <Form.Label>{t('New password')}</Form.Label>
                                        <Form.Control type="password" placeholder={t("New password")}
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
                                        <Form.Control type="password" placeholder={t("Confirm password")}
                                            name="new_password2" id="new_password2"
                                            onChange={validator.handleChange}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.new_password2}
                                            isInvalid={validator.touched.new_password2 && validator.errors && validator.errors.new_password2 ? true : false} />


                                        {validator.touched.new_password2 && validator.errors.new_password2 ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.new_password2}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>

                                    <Form.Group className="mb-0">
                                        <Button variant="primary" type="submit">{t('Submit')}</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div>
                                <Media>
                                    <div className="pt-1">
                                        <Icon name="info" className="icon icon-sm svg-outline-secondary" />
                                    </div>
                                    <Media.Body>
                                        <div className="px-3">
                                            <h2 className="m-0 mb-2">{t('Additional info')}</h2>
                                            <ul className="list mt-3 pl-3">
                                                <li className="text-muted mb-2 w-75">
                                                    {t('Your password cannot be too similar to your other personal information.')}
                                                </li>
                                                <li className="text-muted mb-2 w-75">
                                                    {t('Your password must contain at least 8 characters.')}
                                                </li>
                                                <li className="text-muted mb-2 w-75">
                                                    {t('Your password cannot be a commonly used password.')}
                                                </li>
                                                <li className="text-muted mb-2 w-75">
                                                    {t('Your password cannot be completely numeric.')}
                                                </li>
                                            </ul>
                                        </div>
                                    </Media.Body>
                                </Media>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card.Body>
        </Card>

        {error ? <MessageAlert message={error} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}
        {passwordChange ? <MessageAlert message={t('Your password is changed')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
    </>;
}

export default withRouter(ChangePassword);