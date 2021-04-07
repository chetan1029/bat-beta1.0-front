import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface UserFormProps {
    onSubmit: any,
    values: any,
}

const UserForm = ({ onSubmit, values }: UserFormProps) => {

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            ...(values || {})
        },
        validationSchema: Yup.object({
            username: Yup.string().required(t('Username is required')).max(150, t('Please enter less than 150 characters')),
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
                        isInvalid={validator.touched.email && validator.errors && validator.errors.email ? true : false} />

                    {validator.touched.email && validator.errors.email ? (
                        <Form.Control.Feedback type="invalid">{validator.errors.email}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
        </Row>
        <Form.Group className="mb-0">
            <Button variant="primary" type="submit">{t('Continue')}</Button>
        </Form.Group>
    </Form>
}

export default UserForm;