import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getBank as getBankByCompanyId,
    createBank as addBank,
    updateBank,
    deleteBank as deleteBankApi,
    archiveBank as archiveBankApi,
    restoreBank as restoreBankApi
} from "../../../api/index";

import { bankApiResponseSuccess, bankApiResponseError } from "./actions";
import { BankTypes } from './constants';


/**
 * get all payment terms
 */
function* getBank({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getBankByCompanyId, companyId, filters);
        yield put(bankApiResponseSuccess(BankTypes.GET_BANK, response.data));
    } catch (error) {
        yield put(bankApiResponseError(BankTypes.GET_BANK, error));
    }
}

/*
create payment term
*/
function* createBank({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addBank, companyId, params);
        yield put(bankApiResponseSuccess(BankTypes.CREATE_BANK, response.data));

    } catch (error) {
        yield put(bankApiResponseError(BankTypes.CREATE_BANK, error));
    }
}

/*
update payment term
*/
function* editBank({ payload: { companyId, bankId, params } }: any) {
    try {
        const response = yield call(updateBank, companyId, bankId, params);
        yield put(bankApiResponseSuccess(BankTypes.EDIT_BANK, response.data));
    } catch (error) {
        yield put(bankApiResponseError(BankTypes.EDIT_BANK, error));
    }
}

/*
delete payment term
*/
function* deleteBank({ payload: { companyId, bankId } }: any) {
    try {
        const response = yield call(deleteBankApi, companyId, bankId);
        yield put(bankApiResponseSuccess(BankTypes.DELETE_BANK, response.data));

    } catch (error) {
        yield put(bankApiResponseError(BankTypes.DELETE_BANK, error));
    }
}

/*
archive
*/
function* archiveBank({ payload: { companyId, bankId, params } }: any) {
    try {
        const response = yield call(archiveBankApi, companyId, bankId, params);
        yield put(bankApiResponseSuccess(BankTypes.ARCHIVE_BANK, response.data));

    } catch (error) {
        yield put(bankApiResponseError(BankTypes.ARCHIVE_BANK, error));
    }
}

/*
restore
*/
function* restoreBank({ payload: { companyId, bankId, params } }: any) {
    try {
        const response = yield call(restoreBankApi, companyId, bankId, params);
        yield put(bankApiResponseSuccess(BankTypes.RESTORE_BANK, response.data));

    } catch (error) {
        yield put(bankApiResponseError(BankTypes.RESTORE_BANK, error));
    }
}

export function* watchGetBank() {
    yield takeEvery(BankTypes.GET_BANK, getBank)
}

export function* watchCreateBank() {
    yield takeEvery(BankTypes.CREATE_BANK, createBank)
}

export function* watchEditBank() {
    yield takeEvery(BankTypes.EDIT_BANK, editBank)
}

export function* watchDeleteBank() {
    yield takeEvery(BankTypes.DELETE_BANK, deleteBank)
}

export function* watchArchiveBank() {
    yield takeEvery(BankTypes.ARCHIVE_BANK, archiveBank)
}

export function* watchRestoreBank() {
    yield takeEvery(BankTypes.RESTORE_BANK, restoreBank)
}

function* bankSaga() {
    yield all([
        fork(watchGetBank),
        fork(watchCreateBank),
        fork(watchEditBank),
        fork(watchDeleteBank),
        fork(watchArchiveBank),
        fork(watchRestoreBank)
    ]);
}

export default bankSaga;
