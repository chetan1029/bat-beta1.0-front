import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';


//action
import { createBank, editBank, reset } from "../../redux/actions";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";

interface AddEditBankProps {
    isOpen: boolean;
    onClose: any;
    bank?: any;
    companyId: any;
}
const AddEditBank = ({ isOpen, onClose, bank, companyId }: AddEditBankProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const { createBankError, isBankCreated, editBankError, isBankUpdated, loading } = useSelector((state: any) => ({
        createBankError: state.Company.Bank.createBankError,
        isBankCreated: state.Company.Bank.isBankCreated,

        editBankError: state.Company.Bank.editBankError,
        isBankUpdated: state.Company.Bank.isBankUpdated,
        loading: state.Company.Bank.loading,
    }));


    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: bank ? bank.name : '',
            benificary: bank ? bank.benificary : '',
            account_number: bank ? bank.account_number : '',
            iban: bank ? bank.iban : '',
            swift_code: bank ? bank.swift_code : '',
            address1: bank ? bank.address1 : '',
            address2: bank ? bank.address2 : '',
            zip: bank ? bank.zip : '',
            city: bank ? bank.city : '',
            region: bank ? bank.region : '',
            country: bank ? bank.country : '',
            currency: bank ? bank.currency : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('Bank name is required')),
            benificary: Yup.string().required(t('Benificary name is required')),
            account_number: Yup.string().required(t('Account Number is required')),
            iban: Yup.string().required(t('Iban is required')),
            swift_code: Yup.string().required(t('Swift Code is required')),
            country: Yup.string().required(t('Country is required')),
        }),
        onSubmit: values => {

                if (bank) {
                    dispatch(editBank(companyId, bank.id, values));
                } else {
                    dispatch(createBank(companyId, values));
                }
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-bank-modal-header"></Modal.Header>
            <Modal.Body className="p-0">
                <div className="position-relative">
                    {loading ? <Loader />: null}

                    <div className="px-5 pb-5">
                        <h1 className="mb-2 mt-0">{bank ? t("Edit Bank") : t("Add Bank")}</h1>

                        {(!isBankCreated && createBankError) && <AlertMessage error={createBankError} />}
                        {(!isBankUpdated && editBankError) && <AlertMessage error={editBankError} />}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                          
                            <div>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="submit" variant="primary">{bank ? t("Edit Bank") : t("Add Bank")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddEditBank;
