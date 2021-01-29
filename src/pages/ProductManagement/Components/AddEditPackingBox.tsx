import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Row, Col, Form, Modal, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { map, get } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from "classnames";

//action
import { createComponentPackingBox, editComponentPackingBox, getPackingBox, resetComponents } from "../../../redux/actions";
import Loader from "../../../components/Loader";
import AlertMessage from "../../../components/AlertMessage";

interface AddEditPackingBoxProps {
    isOpen: boolean;
    onClose: any;
    defaultPackingBox?: any;
    companyId: any;
    componentId: any;
}
const AddEditPackingBox = ({ isOpen, onClose, defaultPackingBox, companyId, componentId}: AddEditPackingBoxProps) => {
    const { packingBoxList, isComponentPackingBoxCreated, isComponentPackingBoxEdited, editComponentPackingBoxError, createComponentPackingBoxError } = useSelector(
        (state: any) => ({
            packingBoxList: state.Company.PackingBox.packingBox,
            newComponentPackingBox: state.ProductManagement.Components.newComponentPackingBox,
            loading: state.ProductManagement.Components.loading,
            isComponentPackingBoxCreated: state.ProductManagement.Components.isComponentPackingBoxCreated,
            createComponentPackingBoxError: state.ProductManagement.Components.createComponentPackingBoxError,
            editComponentPackingBoxError: state.ProductManagement.Components.editComponentPackingBoxError,
            isComponentPackingBoxEdited: state.ProductManagement.Components.isComponentPackingBoxEdited,
        })
    );


    const { t } = useTranslation();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(resetComponents());
    // }, [dispatch]);

    useEffect(() => {
        if (companyId) {
            dispatch(getPackingBox(companyId, { is_active: true, limit: 100 }));
        }
    }, [dispatch, companyId]);

    const defaultTypes = packingBoxList && packingBoxList.results && map(packingBoxList.results, (item: any) => ({
        ...item,
        company: { id: companyId },
        label: item.name,
        value: item.id,
    }));

    /*
    validation
    */
    const packingboxSelect = defaultPackingBox ? {
        ...defaultPackingBox.packingbox,
        label: defaultPackingBox.packingbox.name,
        value: defaultPackingBox.packingbox.id,
    } : '';
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            // packingbox: get(defaultPackingBox, 'packingbox', ''),
            packingbox: packingboxSelect,
            units: get(defaultPackingBox, 'units', ''),
            weight: { value: get(defaultPackingBox, 'weight.value', ''), unit: get(defaultPackingBox, 'weight.unit', "lb") },
        },
        validationSchema: Yup.object({
            packingbox: Yup.object().required(t('Packing Box is required')),
            units: Yup.number().required(t('Number of Unit is required')),
            weight: Yup.object({
                value: Yup.number().required(t('Weight value is required')),
                unit: Yup.string().required(t('Weight unit is required'))
            }),
        }),
        onSubmit: values => {
            if (!!defaultPackingBox) {
                dispatch(editComponentPackingBox(companyId, componentId, defaultPackingBox.id, { ...values, packingbox: get(values, 'packingbox.value'), product: componentId }));
            } else {
                dispatch(createComponentPackingBox(companyId, componentId, { ...values, packingbox: get(values, 'packingbox.value'), product: componentId }));
            }
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-payment-modal-header">
                <Modal.Title>{defaultPackingBox ? t("Edit Component Packing Box") : t("Add Component Packing Box")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">
                    {/* {loading ? <Loader /> : null} */}

                    <div>
                        {(!isComponentPackingBoxCreated && createComponentPackingBoxError) && <AlertMessage error={createComponentPackingBoxError} />}
                        {(!isComponentPackingBoxEdited && editComponentPackingBoxError) && <AlertMessage error={editComponentPackingBoxError} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Select Packing Box')}</Form.Label>
                                <CreatableSelect
                                    id={"packingbox"}
                                    name={"packingbox"}
                                    placeholder={t('Select Packing Box')}
                                    isClearable
                                    options={defaultTypes || []}
                                    onChange={(value: any) => { validator.setFieldValue('packingbox', value) }}
                                    value={validator.values.packingbox}
                                    className={classNames("react-select", "react-select-regular", validator.touched.packingbox && validator.errors.packingbox && "is-invalid")}
                                    classNamePrefix="react-select"
                                />
                                {validator.touched.packingbox && validator.errors.packingbox ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.packingbox}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <Row>
                                <Col lg={4}>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="usr">{t('Number of Unit')}</Form.Label>
                                        <Form.Control type="number" className="form-control" id="units" name="units" placeholder="Number of Unit"
                                            onBlur={validator.handleBlur}
                                            value={validator.values.units}
                                            onChange={validator.handleChange}
                                            isInvalid={validator.touched.units && validator.errors && validator.errors.units ? true : false}
                                            maxLength={200} />

                                        {validator.touched.units && validator.errors.units ? (
                                            <Form.Control.Feedback type="invalid">{validator.errors.units}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col lg={4}>
                                    <Form.Label htmlFor="usr">{t("Weight ")}</Form.Label>
                                    <Form.Group className="mb-4">
                                        <InputGroup>
                                            <Form.Control type="text" className="form-control" id="weight" name="weight.value" placeholder="Weight"
                                                onBlur={validator.handleBlur}
                                                value={validator.values.weight.value}
                                                onChange={validator.handleChange}
                                                isInvalid={validator.touched.weight && validator.errors && validator.errors.weight ? true : false}
                                            />
                                            <DropdownButton
                                                as={InputGroup.Append}
                                                variant="outline-secondary"
                                                title={validator.values.weight.unit}
                                                id="input-group-dropdown-2"
                                                className='btn-dropdown'
                                            >
                                                <Dropdown.Item onClick={() => validator.setFieldValue('weight.unit', "kg")}>{t("kg")}</Dropdown.Item>
                                                <Dropdown.Item onClick={() => validator.setFieldValue('weight.unit', "g")}>{t("g")}</Dropdown.Item>
                                                <Dropdown.Item onClick={() => validator.setFieldValue('weight.unit', "lb")}>{t("lb")}</Dropdown.Item>
                                                <Dropdown.Item onClick={() => validator.setFieldValue('weight.unit', "oz")}>{t("oz")}</Dropdown.Item>
                                            </DropdownButton>
                                        </InputGroup>
                                        {validator.touched.weight && validator.errors.weight && validator.errors.weight['value'] ? (
                                            <Form.Control.Feedback type="invalid" className='show'>{validator.errors.weight['value']}</Form.Control.Feedback>
                                        ) : null}
                                        {validator.touched.weight && validator.errors.weight && validator.errors.weight['unit'] ? (
                                            <Form.Control.Feedback type="invalid" className='show'>{validator.errors.weight['unit']}</Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="submit" variant="primary">{defaultPackingBox ? t("Edit Component Packing Box") : t("Add Component Packing Box")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditPackingBox;
