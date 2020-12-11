import React, { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Icon from "../../../components/Icon";
import TagsInput from "../../../components/TagsInput";
import MediaInput from "../../../components/MediaInput";

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from "classnames";
import { map, uniqBy, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
//action
import { createComponent, getComponents, resetComponents } from "../../../redux/actions"
import MessageAlert from "../../../components/MessageAlert";
import VariationDetails from "../../../components/VariationDetails";

interface AddEditComponentProps {
    match: any;
}

const AddEditComponent = ({ match }: AddEditComponentProps) => {
    const { t } = useTranslation();
    const [tags, setTags] = useState<any>([]);
    const [files, setFiles] = useState<any>([]);
    const [variationOptions, setVariationOptions] = useState<any>([]);
    const dispatch = useDispatch();
    const companyId = match.params.companyId;

    useEffect(() => {
        dispatch(getComponents(companyId));
        dispatch(resetComponents());
    }, [dispatch, companyId]);

    const {
        components,
        isComponentCreated,
        createComponentError
    } = useSelector(({ ProductManagement: { Components } }: any) => ({
        components: Components.components,
        isComponentCreated: Components.isComponentCreated,
        createComponentError: Components.createComponentError,
    }));

    const defaultTypes = uniqBy(map(components.results, (component: any) => ({
        label: component.type,
        value: component.type
    })), "value");

    const defaultSeries = uniqBy(map(components.results, (component: any) => ({
        label: component.series,
        value: component.series
    })), "value");

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            type: "",
            series: "",
            description: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required(t('Title is required')),
        }),
        onSubmit: (values: any) => {
            if (!isEmpty(variationOptions)) {
                let data = {
                    ...values,
                    images: files,
                    ...{
                        is_component: true,
                        tags: tags.toString(),
                        type: values.type['value'],
                        series: values.series['value'],
                        products: map(variationOptions, opt => ({
                            title: values.title,
                            image: opt.image,
                            model_number: opt.model_number,
                            manufacturer_part_number: opt.manufacturer_part_number,
                            weight: opt.weight,
                            product_variation_options: map(opt.value, value => ({ productoption: value })),
                        }))
                    }
                }
                dispatch(createComponent(companyId, data));
            }
        },
    });

    const onHandleSubmit = (event: any) => {
        validator.handleSubmit(event);
    }

    return (
        <>
            {isComponentCreated ? <Redirect to={`/product-management/${companyId}/components`}/> : null}

            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/product-management/${companyId}/components`}>
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
                            <Form className="mt-0" noValidate>
                                <h4 className="mt-0 mb-3">{t('Component detail')}</h4>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Title')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="title" name="title"
                                                          placeholder={t('Title')}
                                                          autoComplete="off"
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
                                            <CreatableSelect
                                                id={"type"}
                                                name={"type"}
                                                placeholder={t('Type')}
                                                isClearable
                                                options={defaultTypes || []}
                                                onChange={(value: any) => validator.setFieldValue('type', value)}
                                                value={validator.values.type}
                                                className={classNames("react-select", "react-select-regular", validator.touched.type && validator.errors.type && "is-invalid")}
                                                classNamePrefix="react-select"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <TagsInput
                                                label={t('Tags')}
                                                placeholder={t('Tags')}
                                                id="tagsId"
                                                name="tags"
                                                selectedTags={setTags}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Series')}</Form.Label>
                                            <CreatableSelect
                                                id={"series"}
                                                name={"series"}
                                                placeholder={t('Series')}
                                                isClearable
                                                options={defaultSeries || []}
                                                onChange={(value: any) => validator.setFieldValue('series', value)}
                                                value={validator.values.series}
                                                className={classNames("react-select", "react-select-regular", validator.touched.type && validator.errors.series && "is-invalid")}
                                                classNamePrefix="react-select"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <Form.Group className="mb-4">
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
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <MediaInput label={t('Media Library')} onSetFiles={setFiles}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <VariationDetails
                                            label={t('Variation Details')}
                                            onSetVariationOptions={(variationOptions) => setVariationOptions(variationOptions)}
                                        />
                                    </Col>
                                </Row>
                                <Form.Group className="mt-2 mb-0">
                                    <Button variant="primary" type="button" onClick={onHandleSubmit}>
                                        {t('Submit')}
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            {createComponentError &&
            <MessageAlert message={createComponentError} icon={"x"}
                          iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md"/>
            }
        </>
    );
}

export default withRouter(AddEditComponent);