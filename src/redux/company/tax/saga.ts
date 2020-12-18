import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getTax as getTaxByCompanyId,
    createTax as addTax,
    updateTax,
    deleteTax as deleteTaxApi,
    archiveTax as archiveTaxApi,
    restoreTax as restoreTaxApi
} from "../../../api/index";

import { taxApiResponseSuccess, taxApiResponseError } from "./actions";
import { TaxTypes } from './constants';


/**
 * get all taxs
 */
function* getTax({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getTaxByCompanyId, companyId, filters);
        yield put(taxApiResponseSuccess(TaxTypes.GET_TAX, response.data));
    } catch (error) {
        yield put(taxApiResponseError(TaxTypes.GET_TAX, error));
    }
}

/*
create tax
*/
function* createTax({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addTax, companyId, params);
        yield put(taxApiResponseSuccess(TaxTypes.CREATE_TAX, response.data));

    } catch (error) {
        yield put(taxApiResponseError(TaxTypes.CREATE_TAX, error));
    }
}

/*
update tax
*/
function* editTax({ payload: { companyId, taxId, params } }: any) {
    try {
        const response = yield call(updateTax, companyId, taxId, params);
        yield put(taxApiResponseSuccess(TaxTypes.EDIT_TAX, response.data));
    } catch (error) {
        yield put(taxApiResponseError(TaxTypes.EDIT_TAX, error));
    }
}

/*
delete tax
*/
function* deleteTax({ payload: { companyId, taxId } }: any) {
    try {
        const response = yield call(deleteTaxApi, companyId, taxId);
        yield put(taxApiResponseSuccess(TaxTypes.DELETE_TAX, response.data));

    } catch (error) {
        yield put(taxApiResponseError(TaxTypes.DELETE_TAX, error));
    }
}

/*
archive
*/
function* archiveTax({ payload: { companyId, taxId, params } }: any) {
    try {
        const response = yield call(archiveTaxApi, companyId, taxId, params);
        yield put(taxApiResponseSuccess(TaxTypes.ARCHIVE_TAX, response.data));

    } catch (error) {
        yield put(taxApiResponseError(TaxTypes.ARCHIVE_TAX, error));
    }
}

/*
restore
*/
function* restoreTax({ payload: { companyId, taxId, params } }: any) {
    try {
        const response = yield call(restoreTaxApi, companyId, taxId, params);
        yield put(taxApiResponseSuccess(TaxTypes.RESTORE_TAX, response.data));

    } catch (error) {
        yield put(taxApiResponseError(TaxTypes.RESTORE_TAX, error));
    }
}

export function* watchGetTax() {
    yield takeEvery(TaxTypes.GET_TAX, getTax)
}

export function* watchCreateTax() {
    yield takeEvery(TaxTypes.CREATE_TAX, createTax)
}

export function* watchEditTax() {
    yield takeEvery(TaxTypes.EDIT_TAX, editTax)
}

export function* watchDeleteTax() {
    yield takeEvery(TaxTypes.DELETE_TAX, deleteTax)
}

export function* watchArchiveTax() {
    yield takeEvery(TaxTypes.ARCHIVE_TAX, archiveTax)
}

export function* watchRestoreTax() {
    yield takeEvery(TaxTypes.RESTORE_TAX, restoreTax)
}

function* taxSaga() {
    yield all([
        fork(watchGetTax),
        fork(watchCreateTax),
        fork(watchEditTax),
        fork(watchDeleteTax),
        fork(watchArchiveTax),
        fork(watchRestoreTax)
    ]);
}

export default taxSaga;
