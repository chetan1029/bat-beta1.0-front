import React, { useEffect } from 'react';
import { Form, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Import loader
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";

import ExistingDataWarning from "../../components/ExistingDataWarning";

//action
import { createKeywords, resetkeywordTracking } from "../../redux/actions";
interface AddKeywordsProps {
    isOpen: boolean;
    onClose: any;
    companyId: any;
    productId: any;
}
const AddKeywords = ({ isOpen, onClose, companyId, productId }: AddKeywordsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetkeywordTracking());
    }, [dispatch]);

    const { createKeywordsError, isKeywordsCreated, loading } = useSelector((state: any) => ({
        createKeywordsError: state.Company.KeywordTracking.createKeywordsError,
        isKeywordsCreated: state.Company.KeywordTracking.isKeywordsCreated,
        loading: state.Company.KeywordTracking.loading,
    }));


    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            keywords: '',
        },
        validationSchema: Yup.object({
            keywords: Yup.string().required(t('Keywords is required')),
        }),
        onSubmit: values => {
          dispatch(createKeywords(companyId, { ...values, amazon_product_pk: productId}));
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-hscode-modal-header">
                <Modal.Title>{t("Add Keywords")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">
                    {loading ? <Loader /> : null}

                    <div>
                        {(!isKeywordsCreated && createKeywordsError) ? <AlertMessage error={createKeywordsError} /> : null}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Keywords')}</Form.Label>
                                <Form.Control as="textarea" rows={15} className="form-control" id="keywords" name="keywords" placeholder="Keywords"
                                    onBlur={validator.handleBlur}
                                    value={validator.values.keywords}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.keywords && validator.errors && validator.errors.keywords ? true : false}
                                    maxLength={200} />


                                {validator.touched.keywords && validator.errors.keywords ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.keywords}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <div>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="submit" variant="primary">{t("Add Keywords")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddKeywords;
