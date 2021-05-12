import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getKtproducts, getKtproduct, getKeywordranks } from "../../../api/index";

import { keywordTrackingApiResponseError, keywordTrackingApiResponseSuccess } from "./actions";
import { KeywordTrackingTypes } from './constants';


/**
 * get all
 */
function* getAllKtproducts({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getKtproducts, companyId, filters);
        yield put(keywordTrackingApiResponseSuccess(KeywordTrackingTypes.GET_KTPRODUCTS, response.data));
    } catch (error) {
        yield put(keywordTrackingApiResponseError(KeywordTrackingTypes.GET_KTPRODUCTS, error));
    }
}

function* getKtproductDetails({ payload: { companyId, productId } }: any) {
    try {
        const response = yield call(getKtproduct, companyId, productId);
        yield put(keywordTrackingApiResponseSuccess(KeywordTrackingTypes.GET_KTPRODUCT, response.data));
    } catch (error) {
        yield put(keywordTrackingApiResponseError(KeywordTrackingTypes.GET_KTPRODUCT, error));
    }
}

function* getAllKeywordranks({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getKeywordranks, companyId, filters);
        yield put(keywordTrackingApiResponseSuccess(KeywordTrackingTypes.GET_KEYWORDRANKS, response.data));
    } catch (error) {
        yield put(keywordTrackingApiResponseError(KeywordTrackingTypes.GET_KEYWORDRANKS, error));
    }
}

export function* watchGetKtproducts() {
    yield takeEvery(KeywordTrackingTypes.GET_KTPRODUCTS, getAllKtproducts)
}

export function* watchGetKtproduct() {
    yield takeEvery(KeywordTrackingTypes.GET_KTPRODUCT, getKtproductDetails)
}

export function* watchGetKeywordranks() {
    yield takeEvery(KeywordTrackingTypes.GET_KEYWORDRANKS, getAllKeywordranks)
}

function* keywordTrackingSaga() {
    yield all([
        fork(watchGetKtproducts),
        fork(watchGetKtproduct),
        fork(watchGetKeywordranks),
    ]);
}

export default keywordTrackingSaga;
