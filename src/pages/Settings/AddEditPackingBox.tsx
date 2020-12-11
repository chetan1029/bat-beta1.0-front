import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Modal, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';


//action
import { createPackingBox, editPackingBox, reset } from "../../redux/actions";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import LengthUnitDropdown from "../../components/LengthUnitDropdown";

interface AddEditPackingBoxProps {
    isOpen: boolean;
    onClose: any;
    packingBox?: any;
    companyId: any;
}
const AddEditPackingBox = ({ isOpen, onClose, packingBox, companyId }: AddEditPackingBoxProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const { createPackingBoxError, isPackingBoxCreated, editPackingBoxError, isPackingBoxUpdated, loading } = useSelector((state: any) => ({
        createPackingBoxError: state.Company.PackingBox.createPackingBoxError,
        isPackingBoxCreated: state.Company.PackingBox.isPackingBoxCreated,

        editPackingBoxError: state.Company.PackingBox.editPackingBoxError,
        isPackingBoxUpdated: state.Company.PackingBox.isPackingBoxUpdated,
        loading: state.Company.PackingBox.loading,
    }));

    const [showTotalError, setshowTotalError] = useState(false);

    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: packingBox ? packingBox.name : '',
            length: packingBox ? packingBox.length : '',
            width: packingBox ? packingBox.width : '',
            depth: packingBox ? packingBox.depth : '',
            length_unit: packingBox ? packingBox.length_unit : '',
            weight: packingBox ? packingBox.weight : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Packing Box name is required')),
            length: Yup.string().required(t('Packing Box Length is required')),
            width: Yup.string().required(t('Packing Box Width is required')),
            depth: Yup.string().required(t('Packing Box Depth is required')),
            length_unit: Yup.string().required(t('Packing Box Length Unit is required')),
            weight: Yup.string().required(t('Packing Box Weight is required')),
        }),
        onSubmit: values => {
            if (packingBox) {
                    dispatch(editPackingBox(companyId, packingBox.id, values));
                } else {
                    dispatch(createPackingBox(companyId, values));
                }
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-payment-modal-header"></Modal.Header>
            <Modal.Body className="p-0">
                <div className="position-relative">
                    {loading ? <Loader />: null}

                    <div className="px-5 pb-5">
                        <h1 className="mb-2 mt-0">{packingBox ? t("Edit Packing Box") : t("Add Packing Box")}</h1>

                        {(!isPackingBoxCreated && createPackingBoxError) && <AlertMessage error={createPackingBoxError} />}
                        {(!isPackingBoxUpdated && editPackingBoxError) && <AlertMessage error={editPackingBoxError} />}
                        {showTotalError && <AlertMessage error={t('Total can not be greater than 100%')} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Packing Box Name')}</Form.Label>
                                <Form.Control type="text" className="form-control" id="name" name="name" placeholder="Packing Box Name"
                                    onBlur={validator.handleBlur}
                                    value={validator.values.name}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.name && validator.errors && validator.errors.name ? true : false}
                                    maxLength={200} />


                                {validator.touched.name && validator.errors.name ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.name}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <Row>
                              <Col>
                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="usr">{t('Length')}</Form.Label>
                                    <Form.Control type="text" className="form-control" id="length" name="length" placeholder="Lenth"
                                        onBlur={validator.handleBlur}
                                        value={validator.values.length}
                                        onChange={validator.handleChange}
                                        isInvalid={validator.touched.length && validator.errors && validator.errors.length ? true : false}
                                        maxLength={200} />


                                    {validator.touched.length && validator.errors.length ? (
                                        <Form.Control.Feedback type="invalid">{validator.errors.length}</Form.Control.Feedback>
                                    ) : null}
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="usr">{t('Width')}</Form.Label>
                                    <Form.Control type="text" className="form-control" id="width" name="width" placeholder="Width"
                                        onBlur={validator.handleBlur}
                                        value={validator.values.width}
                                        onChange={validator.handleChange}
                                        isInvalid={validator.touched.width && validator.errors && validator.errors.width ? true : false}
                                        maxLength={200} />


                                    {validator.touched.width && validator.errors.width ? (
                                        <Form.Control.Feedback type="invalid">{validator.errors.width}</Form.Control.Feedback>
                                    ) : null}
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="usr">{t('Depth')}</Form.Label>
                                    <Form.Control type="text" className="form-control" id="depth" name="depth" placeholder="Depth"
                                        onBlur={validator.handleBlur}
                                        value={validator.values.depth}
                                        onChange={validator.handleChange}
                                        isInvalid={validator.touched.depth && validator.errors && validator.errors.depth ? true : false}
                                        maxLength={200} />


                                    {validator.touched.depth && validator.errors.depth ? (
                                        <Form.Control.Feedback type="invalid">{validator.errors.depth}</Form.Control.Feedback>
                                    ) : null}
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="usr">{t('Length Unit')}</Form.Label>
                                    <LengthUnitDropdown name='length_unit' placeholder={t('Length Unit')} className={validator.touched.length_unit && validator.errors.length_unit ? "is-invalid" : ""}
                                        onChange={(value) => validator.setFieldValue('length_unit', value)}
                                        value={validator.values.length_unit} />

                                    {validator.touched.length_unit && validator.errors.length_unit ? (
                                        <Form.Control.Feedback type="invalid">{validator.errors.length_unit}</Form.Control.Feedback>
                                    ) : null}
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Label htmlFor="usr">{t("Weight ")}</Form.Label>
                                <Form.Group className="mb-4">
                                    <InputGroup>
                                        <Form.Control type="text" className="form-control" id="weight" name="weight" placeholder="Weight"
                                            onBlur={validator.handleBlur}
                                            value={validator.values.weight}
                                            onChange={validator.handleChange}
                                            isInvalid={validator.touched.weight && validator.errors && validator.errors.weight ? true : false}
                                        />
                                        <DropdownButton
                                            as={InputGroup.Append}
                                            variant="outline-secondary"
                                            title={validator.values.weight.unit}
                                            id="input-group-dropdown-2"
                                        >
                                            <Dropdown.Item>{t("lb")}</Dropdown.Item>
                                            <Dropdown.Item>{t("kg")}</Dropdown.Item>
                                        </DropdownButton>
                                    </InputGroup>
                                </Form.Group>
                            <div>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="submit" variant="primary">{packingBox ? t("Edit Packing Box") : t("Add Packing Box")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditPackingBox;
