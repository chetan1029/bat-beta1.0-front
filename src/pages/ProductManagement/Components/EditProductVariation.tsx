import React, { useEffect, useState, useRef } from "react";
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import { Button, Card, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Icon from "../../../components/Icon";
import MediaInput from "../../../components/MediaInput";

//plug-ins
import { useFormik } from 'formik';
import classNames from "classnames";
import { map, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
//action
import { editVariation, getVariationDetails, getTagsAndTypes, resetComponents } from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import Loader from "../../../components/Loader";

interface EditProductVariationProps {
    match: any;
}

const EditProductVariation = ({ match }: EditProductVariationProps) => {
    const { t } = useTranslation();
    const [files, setFiles] = useState<any>([]);
    const dispatch = useDispatch();
    const mediaInputRef = useRef();
    const companyId = match.params.companyId;
    const variationId = match.params.variationId;
    const componentId = match.params.componentId;

    useEffect(() => {
        dispatch(getTagsAndTypes(companyId));
        dispatch(resetComponents());
    }, [dispatch, companyId]);

    useEffect(() => {
        if (companyId && variationId) {
            dispatch(getVariationDetails(companyId, variationId));
        }
    }, [dispatch, companyId, variationId]);

    const {
        loading,
        isVariationEdited,
        tagsAndTypes,
        variation,
        editVariationError
    } = useSelector(({ ProductManagement: { Components } }: any) => ({
        loading: Components.loading,
        createComponentError: Components.createComponentError,
        tagsAndTypes: Components.tagsAndTypes,
        variation: Components.variation,
        editVariationError: Components.editVariationError,
        isVariationEdited: Components.isVariationEdited,
    }));

    const defaultTypes = tagsAndTypes && map(tagsAndTypes.type_data, (type: any) => ({
        label: type,
        value: type
    }));

    const defaultTags = tagsAndTypes && map(tagsAndTypes.tag_data, (tag: any) => ({
        label: tag,
        value: tag
    }));

    const defaultVariationTags = variation && variation.tags && variation.tags.split(",");

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: variation ? variation.title : "",
            type: variation ? { label: variation.type, value: variation.type } : "",
            sku: variation ? variation.sku : "",
            ean: variation ? variation.ean : "",
            length: variation ? variation.length : "",
            width: variation ? variation.width : "",
            depth: variation ? variation.depth : "",
            length_unit: variation ? variation.length_unit : "",
            extra_data: variation ? variation.extra_data : "",
            tags: variation ? map(defaultVariationTags, tag => ({ label: tag, value: tag })) : [],
            weight: variation ? variation.weight : { value: "", unit: "lb" },
        },
        validationSchema: Yup.object({
            title: Yup.string().required(t('Title is required')),
            weight: Yup.object().shape({
                value: Yup.string().required(t('Weight is required')),
            })
        }),
        onSubmit: (values: any) => {
            let data = {
                ...values,
                ...{
                    tags: values.tags.map(tag => tag.value).toString(),
                    type: values.type['value'],
                }
            }
            const deletedImages = mediaInputRef && get(mediaInputRef, "current.deletedImagesIds");
            dispatch(editVariation(companyId, variationId, data, { deletedImages, newImages: files }));
        },
    });

    const onHandleSubmit = (event: any) => {
        validator.handleSubmit(event);
    }

    return (
        <>
            {isVariationEdited ? <Redirect to={`/product-management/${companyId}/components/${componentId}`}/> : null}

            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/product-management/${companyId}/components`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2"/>
                            </Link>
                            <h1 className="m-0">{t('Edit Product Variation')}</h1>
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
                                <h4 className="mt-0 mb-3">{t('Product Variation detail')}</h4>
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
                                            <Form.Label htmlFor="tags">{t('Tags')}</Form.Label>
                                            <CreatableSelect
                                                isMulti
                                                id={"tags"}
                                                name={"tags"}
                                                placeholder={t('Tags')}
                                                onChange={(value: any) => validator.setFieldValue('tags', value)}
                                                options={defaultTags || []}
                                                value={validator.values.tags}
                                                className={"react-select react-select-regular tags mt-0"}
                                                classNamePrefix="react-select"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="sku">{t('SKU')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="sku" name="sku"
                                                          placeholder={t('SKU')}
                                                          autoComplete="off"
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.sku}
                                                          onChange={validator.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="ean">{t('EAN')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="ean" name="ean"
                                                          placeholder={t('EAN')}
                                                          autoComplete="off"
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.ean}
                                                          onChange={validator.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="length">{t('Length')}</Form.Label>
                                            <Form.Control type="number" className="form-control" id="length" name="length"
                                                          placeholder={t('Length')}
                                                          autoComplete="off"
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.length}
                                                          onChange={validator.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="width">{t('Width')}</Form.Label>
                                            <Form.Control type="number" className="form-control" id="width" name="width"
                                                          placeholder={t('Width')}
                                                          autoComplete="off"
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.width}
                                                          onChange={validator.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="depth">{t('Depth')}</Form.Label>
                                            <Form.Control type="number" className="form-control" id="depth" name="depth"
                                                          placeholder={t('Depth')}
                                                          autoComplete="off"
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.depth}
                                                          onChange={validator.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="lengthUnit">{t('Length Unit')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="lengthUnit" name="length_unit"
                                                          placeholder={t('Length Unit')}
                                                          autoComplete="off"
                                                          onBlur={validator.handleBlur}
                                                          value={validator.values.length_unit}
                                                          onChange={validator.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <Form.Label htmlFor="usr">{t("Weight ")}</Form.Label>
                                        <Form.Group className="mb-4">
                                            <InputGroup>
                                                <Form.Control type="text" className="form-control" id="weight" name="weight.value" placeholder="Weight"
                                                              onBlur={validator.handleBlur}
                                                              value={validator.values.weight.value}
                                                              onChange={validator.handleChange}
                                                              isInvalid={!!(validator.touched.weight && validator.errors && validator.errors.weight)}
                                                />
                                                <DropdownButton
                                                    as={InputGroup.Append}
                                                    variant="outline-secondary"
                                                    title={validator.values.weight.unit}
                                                    id="input-group-dropdown-2"
                                                >
                                                    <Dropdown.Item onClick={() => validator.setFieldValue('weight.unit', "lb")}>{t("lb")}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => validator.setFieldValue('weight.unit', "kg")}>{t("kg")}</Dropdown.Item>
                                                </DropdownButton>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <Form.Group className="mb-4">
                                            <h4 className="mt-0 mb-3">{t('Description')}</h4>
                                            <Form.Control
                                                as="textarea"
                                                id="extra_data"
                                                name="extra_data"
                                                rows={5}
                                                onBlur={validator.handleBlur}
                                                value={validator.values.extra_data}
                                                onChange={validator.handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <MediaInput label={t('Media Library')}
                                                    inputRef={mediaInputRef}
                                                    defaultImages={variation && variation.images.length > 0 && variation.images}
                                                    onSetFiles={setFiles}/>
                                    </Col>
                                </Row>
                                {editVariationError &&
                                <MessageAlert
                                  message={editVariationError} icon={"x"}
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

export default withRouter(EditProductVariation);