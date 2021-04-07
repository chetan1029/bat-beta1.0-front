import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getPaymentTerms as getPaymentTermsByCompanyId,
    createPaymentTerm as addPaymentTerm,
    updatePaymentTerm,
    deletePaymentTerm as deletePaymentTermApi,
    archivePaymentTerm as archivePaymentTermApi,
    restorePaymentTerm as restorePaymentTermApi
} from "../../../api/index";

import { paymentTermsApiResponseSuccess, paymentTermsApiResponseError } from "./actions";
import { PaymentTermsTypes } from './constants';


/**
 * get all payment terms
 */
function* getPaymentTerms({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getPaymentTermsByCompanyId, companyId, filters);
        yield put(paymentTermsApiResponseSuccess(PaymentTermsTypes.GET_PAYMENT_TERMS, response.data));
    } catch (error) {
        yield put(paymentTermsApiResponseError(PaymentTermsTypes.GET_PAYMENT_TERMS, error));
    }
}

/*
create payment term
*/
function* createPaymentTerm({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addPaymentTerm, companyId, params);
        yield put(paymentTermsApiResponseSuccess(PaymentTermsTypes.CREATE_PAYMENT_TERM, response.data));

    } catch (error) {
        yield put(paymentTermsApiResponseError(PaymentTermsTypes.CREATE_PAYMENT_TERM, error));
    }
}

/*
update payment term
*/
function* editPaymentTerm({ payload: { companyId, paymentTermId, params } }: any) {
    try {
        const response = yield call(updatePaymentTerm, companyId, paymentTermId, params);
        yield put(paymentTermsApiResponseSuccess(PaymentTermsTypes.EDIT_PAYMENT_TERM, response.data));
    } catch (error) {
        yield put(paymentTermsApiResponseError(PaymentTermsTypes.EDIT_PAYMENT_TERM, error));
    }
}

/*
delete payment term
*/
function* deletePaymentTerm({ payload: { companyId, paymentTermId } }: any) {
    try {
        const response = yield call(deletePaymentTermApi, companyId, paymentTermId);
        yield put(paymentTermsApiResponseSuccess(PaymentTermsTypes.DELETE_PAYMENT_TERM, response.data));

    } catch (error) {
        yield put(paymentTermsApiResponseError(PaymentTermsTypes.DELETE_PAYMENT_TERM, error));
    }
}

/*
archive
*/
function* archivePaymentTerm({ payload: { companyId, paymentTermId, params } }: any) {
    try {
        const response = yield call(archivePaymentTermApi, companyId, paymentTermId, params);
        yield put(paymentTermsApiResponseSuccess(PaymentTermsTypes.ARCHIVE_PAYMENT_TERM, response.data));

    } catch (error) {
        yield put(paymentTermsApiResponseError(PaymentTermsTypes.ARCHIVE_PAYMENT_TERM, error));
    }
}

/*
restore
*/
function* restorePaymentTerm({ payload: { companyId, paymentTermId, params } }: any) {
    try {
        const response = yield call(restorePaymentTermApi, companyId, paymentTermId, params);
        yield put(paymentTermsApiResponseSuccess(PaymentTermsTypes.RESTORE_PAYMENT_TERM, response.data));

    } catch (error) {
        yield put(paymentTermsApiResponseError(PaymentTermsTypes.RESTORE_PAYMENT_TERM, error));
    }
}

export function* watchGetPaymentTerms() {
    yield takeEvery(PaymentTermsTypes.GET_PAYMENT_TERMS, getPaymentTerms)
}

export function* watchCreatePaymentTerm() {
    yield takeEvery(PaymentTermsTypes.CREATE_PAYMENT_TERM, createPaymentTerm)
}

export function* watchEditPaymentTerm() {
    yield takeEvery(PaymentTermsTypes.EDIT_PAYMENT_TERM, editPaymentTerm)
}

export function* watchDeletePaymentTerm() {
    yield takeEvery(PaymentTermsTypes.DELETE_PAYMENT_TERM, deletePaymentTerm)
}

export function* watchArchivePaymentTerm() {
    yield takeEvery(PaymentTermsTypes.ARCHIVE_PAYMENT_TERM, archivePaymentTerm)
}

export function* watchRestorePaymentTerm() {
    yield takeEvery(PaymentTermsTypes.RESTORE_PAYMENT_TERM, restorePaymentTerm)
}

function* paymentTermsSaga() {
    yield all([
        fork(watchGetPaymentTerms),
        fork(watchCreatePaymentTerm),
        fork(watchEditPaymentTerm),
        fork(watchDeletePaymentTerm),
        fork(watchArchivePaymentTerm),
        fork(watchRestorePaymentTerm)
    ]);
}

export default paymentTermsSaga;