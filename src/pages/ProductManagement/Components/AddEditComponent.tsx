import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Icon from "../../../components/Icon";
import TagsInput from "../../../components/TagsInput";
import MediaInput from "../../../components/MediaInput";

//plug-ins
import {useFormik} from 'formik';
import * as Yup from 'yup';

interface AddEditComponentProps {
    match: any;
}

const AddEditComponent = ({ match }: AddEditComponentProps) => {
    const {t} = useTranslation();
    const [tags, setTags] = useState<any>([]);

    const companyId = match.params.companyId;

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            type: "",
            series: "",
            tags: [],
            description: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required(t('Title is required')),
            type: Yup.string().required(t('Type is required')),
            tags: Yup.array().required(t('Tags are required')),
            series: Yup.string().required(t('Series is required')),
            description: Yup.string().required(t('Description is required')),
        }),
        onSubmit: () => {},
    });

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}/members`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2"/>
                            </Link>
                            <h1 className="m-0">{t('Add Component')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className='position-relative'>
                <Card>
                    <Card.Body className="">
                        <div className="p-2">
                            <Form className="mt-0" noValidate onSubmit={validator.handleSubmit}>
                                <h4 className="mt-0 mb-3">{t('Component detail')}</h4>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Title')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="title" name="title"
                                                          placeholder={t('Title')}
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.title}
                                                          onChange={validator.handleChange}
                                                          isInvalid={validator.touched.title && validator.errors && !!validator.errors.title}/>

                                            {validator.touched.title && validator.errors.title &&
                                            <Form.Control.Feedback type="invalid">
                                                {validator.errors.title}
                                            </Form.Control.Feedback>
                                            }
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Type')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="type" name="type"
                                                          placeholder={t('Type')}
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.type}
                                                          onChange={validator.handleChange}
                                                          isInvalid={!!(validator.touched.type && validator.errors && validator.errors.type)}/>

                                            {validator.touched.type && validator.errors.type &&
                                            <Form.Control.Feedback type="invalid">
                                                {validator.errors.type}
                                            </Form.Control.Feedback>
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <TagsInput
                                                label={t('Tags')}
                                                selectedTags={setTags}
                                            />
                                            {validator.touched.tags && validator.errors.tags &&
                                            <Form.Control.Feedback type="invalid">
                                                {validator.errors.tags}
                                            </Form.Control.Feedback>
                                            }
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Series')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="series" name="series"
                                                          placeholder={t('Series')}
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.series}
                                                          onChange={validator.handleChange}
                                                          isInvalid={!!(validator.touched.series && validator.errors && validator.errors.series)}/>

                                            {validator.touched.series && validator.errors.series &&
                                            <Form.Control.Feedback type="invalid">
                                                {validator.errors.series}
                                            </Form.Control.Feedback>
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <h4 className="mt-0 mb-3">{t('Description')}</h4>
                                        <Form.Control
                                            as="textarea"
                                            id="description"
                                            name="description"
                                            rows={5}
                                            onBlur={validator.handleBlur}
                                            value={validator.values.description}
                                            onChange={validator.handleChange}
                                            isInvalid={!!(validator.touched.description && validator.errors && validator.errors.description)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <h4 className="mt-0 mb-3">{t('Media Library')}</h4>
                                    <MediaInput/>
                                </Row>

                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default withRouter(AddEditComponent);