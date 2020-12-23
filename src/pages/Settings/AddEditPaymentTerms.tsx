import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';


//action
import { createPaymentTerm, editPaymentTerm, reset } from "../../redux/actions";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import ExistingDataWarning from "../../components/ExistingDataWarning";

interface AddEditPaymentTermsProps {
    isOpen: boolean;
    onClose: any;
    paymentTerm?: any;
    companyId: any;
}
const AddEditPaymentTerms = ({ isOpen, onClose, paymentTerm, companyId }: AddEditPaymentTermsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const { createPaymentTermError, isPaymentTermCreated, editPaymentTermError, isPaymentTermUpdated, loading } = useSelector((state: any) => ({
        createPaymentTermError: state.Company.PaymentTerms.createPaymentTermError,
        isPaymentTermCreated: state.Company.PaymentTerms.isPaymentTermCreated,

        editPaymentTermError: state.Company.PaymentTerms.editPaymentTermError,
        isPaymentTermUpdated: state.Company.PaymentTerms.isPaymentTermUpdated,
        loading: state.Company.PaymentTerms.loading,
    }));

    const [showTotalError, setshowTotalError] = useState(false);

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
            deposit: Yup.number().max(100, t("Ensure that Deposit in % is not greater than 100%"))
                .required(t('Deposit in % is required')),
            on_delivery: Yup.number().max(100, t("Ensure that Payment on Delivery % is not greater than 100%"))
                .required(t('Payment on Delivery % is required')),
            receiving: Yup.number().max(100, t("Ensure that Receiving in % is not greater than 100%"))
                .required(t('Receiving in % is required')),
            payment_days: Yup.string().max(5, t("Ensure that there are no more than 5 digits in Remaining in Payment Days"))
                .required(t('Remaining in Payment Days is required'))
        }),
        onSubmit: values => {
            if (parseFloat(values['deposit']) + parseFloat(values['on_delivery']) + parseFloat(values['receiving']) > 100) {
                setshowTotalError(true);
            } else {
                setshowTotalError(false);

                if (paymentTerm) {
                    dispatch(editPaymentTerm(companyId, paymentTerm.id, values));
                } else {
                    dispatch(createPaymentTerm(companyId, values));
                }
            }
        },
    });

    useEffect(() => {
        if (validator.values) {
            setshowTotalError(parseFloat(validator.values['deposit']) + parseFloat(validator.values['on_delivery']) + parseFloat(validator.values['receiving']) > 100);
        }
    }, [validator.values]);

    const onCancel = () => {
        validator.resetForm();
        onClose();
    }
  

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-payment-modal-header">
              <Modal.Title>{paymentTerm ? t("Edit Payment Term") : t("Add Payment Term")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">
                    {loading ? <Loader />: null}

<<<<<<< HEAD
                    <div className="px-5 pb-5">
                        <h1 className="mb-2 mt-0">{paymentTerm ? t("Edit Payment Terms") : t("Add Payment Terms")}</h1>

                        {createPaymentTermError && createPaymentTermError['existing_items'] ? <ExistingDataWarning 
                            name={t('Payment Term(s)')}
                            message={createPaymentTermError}
                            onConfirm={() => {
                                dispatch(createPaymentTerm(companyId, {...validator.values, force_create: true})); 
                            }} onClose={() => {}} displayField={'title'} /> : null}

                        {(!isPaymentTermCreated && createPaymentTermError) && !createPaymentTermError['existing_items'] ? <AlertMessage error={createPaymentTermError} /> : null}
=======
                    <div>
                        {(!isPaymentTermCreated && createPaymentTermError) && <AlertMessage error={createPaymentTermError} />}
>>>>>>> fix/setting_layouts
                        {(!isPaymentTermUpdated && editPaymentTermError) && <AlertMessage error={editPaymentTermError} />}
                        {showTotalError && <AlertMessage error={t('Total can not be greater than 100%')} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Deposit in %')}</Form.Label>
                                <Form.Control type="number" className="form-control" id="deposit" name="deposit" placeholder="Deposit in %"
                                    onBlur={validator.handleBlur}
                                    value={validator.values.deposit}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.deposit && validator.errors && validator.errors.deposit ? true : false}
                                    maxLength={3} />


                                {validator.touched.deposit && validator.errors.deposit ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.deposit}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Payment on Delivery %')}</Form.Label>
                                <Form.Control type="number" className="form-control" id="on_delivery" name="on_delivery" placeholder="Payment on Delivery %" onBlur={validator.handleBlur}
                                    value={validator.values.on_delivery}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.on_delivery && validator.errors && validator.errors.on_delivery ? true : false}
                                    maxLength={3} />


                                {validator.touched.on_delivery && validator.errors.on_delivery ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.on_delivery}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Receiving in %')}</Form.Label>
                                <Form.Control type="number" className="form-control" id="receiving" name="receiving" placeholder="Receiving in %" onBlur={validator.handleBlur}
                                    value={validator.values.receiving}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.receiving && validator.errors && validator.errors.receiving ? true : false}
                                    maxLength={3} />


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
