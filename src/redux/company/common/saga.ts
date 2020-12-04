import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getCompaniesList, createCompany as createCompanyApi } from "../../../api/index";

import { companyCommonApiResponseSuccess, companyCommonApiResponseError } from "./actions";
import { CommonTypes } from './constants';


/**
 * Fetches the companies
 */
function* getCompanies({ payload: filters }: any) {
    try {
        const response = yield call(getCompaniesList, filters);
        yield put(companyCommonApiResponseSuccess(CommonTypes.GET_COMPANIES, response.data));
    } catch (error) {
        yield put(companyCommonApiResponseError(CommonTypes.GET_COMPANIES, error));
    }
}

/**
 * Creates the company
 * @param param0 
 */
function* createCompany({ payload: data }: any) {
    try {
        const response = yield call(createCompanyApi, data);
        yield put(companyCommonApiResponseSuccess(CommonTypes.CREATE_COMPANY, response.data));
    } catch (error) {
        yield put(companyCommonApiResponseError(CommonTypes.CREATE_COMPANY, error));
    }
}

export function* watchGetCompanies() {
    yield takeEvery(CommonTypes.GET_COMPANIES, getCompanies)
}

export function* watchCreateCompany() {
    yield takeEvery(CommonTypes.CREATE_COMPANY, createCompany)
}

function* commonSaga() {
    yield all([
        fork(watchGetCompanies),
        fork(watchCreateCompany)
    ]);
}

export default commonSaga;