import React, { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Icon from "../../../components/Icon";
import TagsInput from "../../../components/TagsInput";
import MediaInput from "../../../components/MediaInput";

//plug-ins
import { useFormik } from 'formik';
import classNames from "classnames";
import { map, isEmpty, forEach, filter } from "lodash";
import { useDispatch, useSelector } from "react-redux";
//action
import {
    createComponent,
    getComponentDetails,
    getTagsAndTypes,
    resetComponents
} from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import VariationDetails from "../../../components/VariationDetails";
import Loader from "../../../components/Loader";

const STATUSES: Array<string> = ["Draft", "Active", "Archive"];

interface AddEditComponentProps {
    match: any;
}

const AddEditComponent = ({ match }: AddEditComponentProps) => {
    const { t } = useTranslation();
    const [tags, setTags] = useState<any>([]);
    const [files, setFiles] = useState<any>([]);
    const [variationOptions, setVariationOptions] = useState<any>([]);
    const [hasMultiVariations, setHasMultiVariations] = useState<any>(false);
    const dispatch = useDispatch();
    const companyId = match.params.companyId;
    const componentId = match.params.componentId;
    let statusOptions: Array<any> = [];
    for (const status of STATUSES) {
        statusOptions.push({
            label: t(status),
            value: status
        });
    }

    useEffect(() => {
        dispatch(getTagsAndTypes(companyId));
        dispatch(resetComponents());
    }, [dispatch, companyId]);

    useEffect(() => {
        if (companyId && componentId) {
            dispatch(getComponentDetails(companyId, componentId));
        }
    }, [dispatch, companyId, componentId]);

    const {
        loading,
        component,
        isComponentCreated,
        createComponentError,
        tagsAndTypes,
    } = useSelector(({ ProductManagement: { Components } }: any) => ({
        loading: Components.loading,
        component: Components.component,
        isComponentCreated: Components.isComponentCreated,
        createComponentError: Components.createComponentError,
        tagsAndTypes: Components.tagsAndTypes,
    }));

    const defaultTypes = tagsAndTypes && map(tagsAndTypes.type_data, (type: any) => ({
        label: type,
        value: type
    }));

    const defaultSeries = tagsAndTypes && map(tagsAndTypes.series_data, (series: any) => ({
        label: series,
        value: series
    }));

    const validateCategories = (values) => {
        let error: any = { variationOptions: [], variations: [] };
        if (values.title === "") {
            error.title = "Title is required";
        }

        if (variationOptions.length === 0) {
           error.options = "At least one variation option required";
        }

        forEach(variationOptions, (option, i) => {
            typeof option.value === "object" && forEach(option.value, (opt, index) => {
                if (hasMultiVariations && opt.name === "" ) {
                    error.variations[index] = { ...error.variations[index], "name": "Name required" };
                }
            })
            if (option["model_number"] === "") {
                error.variationOptions[i] = { ...error.variationOptions[i], "model_number": "Model number required" };
            }
            if (option["manufacturer_part_number"] === "") {
                error.variationOptions[i] = { ...error.variationOptions[i], "manufacturer_part_number": "Manufacturer part number required" };
            }
            if (option["weight"].value === "") {
                error.variationOptions[i] = { ...error.variationOptions[i], "weight": "Weight is required" };
            } else if (!(!isNaN(option["weight"].value) && !isNaN(parseFloat(option["weight"].value)))) {
                error.variationOptions[i] = { ...error.variationOptions[i], "weight": "Weight must be a number" };
            }
        })

        if (isEmpty(filter(error.variationOptions, (option) => Object.keys(option).length > 0))) {
            delete error.variationOptions;
        }

        if (isEmpty(filter(error.variations, (option) => option && Object.keys(option).length > 0))) {
            delete error.variations;
        }

        return error;
    }

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: component ? component.title : "",
            type: component ? component.type : "",
            series: component ? component.series : "",
            description: component ? component.description : "",
            status: component ? component.status : statusOptions[0],
        },
        validate: validateCategories,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values: any) => {
            let data = {
                ...values,
                ...{
                    is_component: true,
                    tags: tags.toString(),
                    type: values.type['value'],
                    series: values.series['value'],
                    status: values.status['value'],
                    products: map(variationOptions, opt => ({
                        title: values.title,
                        model_number: opt.model_number,
                        manufacturer_part_number: opt.manufacturer_part_number,
                        weight: opt.weight,
                        product_variation_options: map(opt.value, value => ({ productoption: value })),
                    }))
                }
            }
            dispatch(createComponent(companyId, data, { productImages : files, variationImages: map(variationOptions, opt => opt.image)}));
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
                            <h1 className="m-0">{componentId ? t('Edit Component') : t('Add Component')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className='position-relative'>
                {loading ? <Loader /> : null}
                <Card>
                    <Card.Body>
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
                                                tags={component && component.tags.split(",")}
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
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Status')}</Form.Label>
                                            <Select
                                                placeholder={t('Status')}
                                                options={statusOptions}
                                                value={validator.values.status}
                                                onChange={(value: any) => validator.setFieldValue('status', value)}
                                                className={"react-select react-select-regular"}
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
                                        <Form.Group className="mt-2 mb-0">
                                        <VariationDetails
                                            errors={validator.errors}
                                            label={t('Variation Details')}
                                            onSetVariationOptions={(variationOptions, hasMultiVariations) => {
                                                setVariationOptions(variationOptions);
                                                setHasMultiVariations(hasMultiVariations);
                                            }}
                                        />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {createComponentError &&
                                <MessageAlert
                                  message={createComponentError} icon={"x"}
                                  showAsNotification={false}
                                />}
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
        </>
    );
}

export default withRouter(AddEditComponent);