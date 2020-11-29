import React from 'react';
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';


//action
import { createPaymentTerm, editPaymentTerm } from "../../redux/actions";
import Loader from "../../components/Loader";

interface AddEditPaymentTermsProps {
    isOpen: boolean;
    onClose: any;
    paymentTerm?: any;
    companyId: any;
}
const AddEditPaymentTerms = ({ isOpen, onClose, paymentTerm, companyId }: AddEditPaymentTermsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { createPaymentTermError, isPaymentTermCreated, editPaymentTermError, isPaymentTermUpdated, loading } = useSelector((state: any) => ({
        createPaymentTermError: state.Company.PaymentTerms.createPaymentTermError,
        isPaymentTermCreated: state.Company.PaymentTerms.isPaymentTermCreated,

        editPaymentTermError: state.Company.PaymentTerms.editPaymentTermError,
        isPaymentTermUpdated: state.Company.PaymentTerms.isPaymentTermUpdated,
        loading: state.Company.PaymentTerms.loading,
    }));

    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            deposit: paymentTerm ? paymentTerm.deposit : '',
            on_delivery: paymentTerm ? paymentTerm.on_delivery : '',
            receiving: paymentTerm ? paymentTerm.receiving : '',
            payment_days: paymentTerm ? paymentTerm.payment_days : ''
        },
        validationSchema: Yup.object({
            deposit: Yup.string().max(6, t("Ensure that there are no more than 5 digits in Deposit."))
                .required(t('Deposit in % is required')),
            on_delivery: Yup.string().max(6, t("Ensure that there are no more than 5 digits in Payment on Delivery."))
                .required(t('Payment on Delivery % is required')),
            receiving: Yup.string().max(6, t("Ensure that there are no more than 5 digits in Receiving."))
                .required(t('Receiving in % is required')),
            payment_days: Yup.string().max(6, t("Ensure that there are no more than 5 digits in Remaining in Payment Days."))
                .required(t('Remaining in Payment Days is required'))
        }),
        onSubmit: values => {
            if (paymentTerm) {
                dispatch(editPaymentTerm(companyId, paymentTerm.id, values));
            } else {
                dispatch(createPaymentTerm(companyId, values));
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
                        <h1 className="mb-2 mt-0">{paymentTerm ? t("Edit Payment Terms") : t("Add Payment Terms")}</h1>
                        {
                            (!isPaymentTermCreated && createPaymentTermError) &&
                            <Alert variant="danger">
                                {
                                    createPaymentTermError.map((error, key) =>
                                        <p className="mb-0" key={key}>{error}</p>
                                    )
                                }
                            </Alert>
                        }
                        {

                            (!isPaymentTermUpdated && editPaymentTermError) &&
                            <Alert variant="danger">
                                {
                                    editPaymentTermError.map((error, key) =>
                                        <p className="mb-0" key={key}>{error}</p>
                                    )
                                }
                            </Alert>
                        }

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Deposit in %')}</Form.Label>
                                <Form.Control type="number" className="form-control" id="deposit" name="deposit" placeholder="Deposit in %"
                                    onBlur={validator.handleBlur}
                                    value={validator.values.deposit}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.deposit && validator.errors && validator.errors.deposit ? true : false} />


                                {validator.touched.deposit && validator.errors.deposit ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.deposit}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Payment on Delivery %')}</Form.Label>
                                <Form.Control type="number" className="form-control" id="on_delivery" name="on_delivery" placeholder="Payment on Delivery %" onBlur={validator.handleBlur}
                                    value={validator.values.on_delivery}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.on_delivery && validator.errors && validator.errors.on_delivery ? true : false} />


                                {validator.touched.deposit && validator.errors.deposit ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.deposit}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Receiving in %')}</Form.Label>
                                <Form.Control type="number" className="form-control" id="receiving" name="receiving" placeholder="Receiving in %" onBlur={validator.handleBlur}
                                    value={validator.values.receiving}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.receiving && validator.errors && validator.errors.receiving ? true : false} />


                                {validator.touched.receiving && validator.errors.receiving ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.receiving}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Remaining in payment_days')}</Form.Label>
                                <Form.Control type="number" className="form-control" id="payment_days" name="payment_days" placeholder="Remaining in payment_days" onBlur={validator.handleBlur}
                                    value={validator.values.payment_days}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.payment_days && validator.errors && validator.errors.payment_days ? true : false} />


                                {validator.touched.payment_days && validator.errors.payment_days ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.payment_days}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <div>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="submit" variant="primary">{paymentTerm ? t("Edit Payment Terms") : t("Add Payment Terms")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditPaymentTerms;