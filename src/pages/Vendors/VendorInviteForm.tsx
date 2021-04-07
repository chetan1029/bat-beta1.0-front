import React from "react";
import { Row, Col, Form, Button, Media } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//component
import Icon from "../../components/Icon";
interface VendorInviteFormProps {
    onSubmit: any,
    values: any,
}

const VendorInviteForm = ({ onSubmit, values }: VendorInviteFormProps) => {

    const { t } = useTranslation();

    // validation
    const validator = useFormik({
        initialValues: {
            vendor_name: '',
            first_name: '',
            last_name: '',
            email: '',
            ...(values || {})
        },
        validationSchema: Yup.object({
            vendor_name: Yup.string().required(t('Vendor Name is required')),
            first_name: Yup.string().required(t('Vendor Contact First name is required')),
            last_name: Yup.string().required(t('Vendor Contact Last name is required')),
            email: Yup.string().email().required(t('Vendor Email is required')),
        }),
        onSubmit: values => {
            onSubmit(values);
        },
    });

    return <Row>
    <Col lg={6} xs={12}>
      <Form noValidate onSubmit={validator.handleSubmit} className="">

          <Row>
              <Col lg={6}>
                  <Form.Group>
                      <Form.Label>{t("Vendor Contact First name")}</Form.Label>
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
              <Col lg={6}>
                  <Form.Group>
                      <Form.Label>{t("Vendor Contact Last name")}</Form.Label>
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
                      <Form.Label>{t("Vendor Name")}</Form.Label>
                      <Form.Control type="text" placeholder={t("Vendor Name")}
                          name="vendor_name" id="vendor_name"
                          onChange={validator.handleChange}
                          onBlur={validator.handleBlur}
                          value={validator.values.vendor_name}
                          isInvalid={validator.touched.vendor_name && validator.errors && validator.errors.vendor_name ? true : false} />

                      {validator.touched.vendor_name && validator.errors.vendor_name ? (
                          <Form.Control.Feedback type="invalid">{validator.errors.vendor_name}</Form.Control.Feedback>
                      ) : null}
                  </Form.Group>
              </Col>
          </Row>

          <Row>
              <Col lg={12}>
                  <Form.Group>
                      <Form.Label>{t('Vendor Email')}</Form.Label>
                      <Form.Control type="email" placeholder={t("Vendor Email")}
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
              <Button variant="primary" type="submit">{t('Submit')}</Button>
          </Form.Group>
      </Form>
    </Col>
      <Col lg={6} xs={12}>
          <div>
              <Media>
                  <div className="pt-1">
                      <Icon name="info" className="icon icon-sm svg-outline-secondary" />
                  </div>
                  <Media.Body>
                      <div className="px-3">
                          <h2 className="m-0 mb-2"> Luctus sed ut elit nibh </h2>
                          <p className="text-wrap pb-0 text-muted">Some quick example text to build on the card title and make up the bulk
                          of the card's content.Some quick example text to build on the card title and make up the bulk
  of the card's content.</p>
                      </div>
                  </Media.Body>
              </Media>
          </div>
      </Col>
  </Row>
}

export default VendorInviteForm;
