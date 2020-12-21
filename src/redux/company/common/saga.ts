import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getCompaniesList, createCompany as createCompanyApi,
    getCompanyCategories as getCompanyCategoriesApi,
    editCompany as editCompanyApi, getCompany as getCompanyApi
} from "../../../api/index";

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



/**
 * Gets the company
 * @param param0 
 */
function* getCompany({ payload: companyId }: any) {
    try {
        const response = yield call(getCompanyApi, companyId);
        yield put(companyCommonApiResponseSuccess(CommonTypes.GET_COMPANY, response.data));
    } catch (error) {
        yield put(companyCommonApiResponseError(CommonTypes.GET_COMPANY, error));
    }
}

/**
 * Creates the company
 * @param param0 
 */
function* editCompany({ payload: { companyId, data } }: any) {
    try {
        const response = yield call(editCompanyApi, companyId, data);
        yield put(companyCommonApiResponseSuccess(CommonTypes.EDIT_COMPANY, response.data));
    } catch (error) {
        yield put(companyCommonApiResponseError(CommonTypes.EDIT_COMPANY, error));
    }
}

/**
 * Fetches the categories
 */
function* getCompanyCategories({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getCompanyCategoriesApi, companyId, filters);
        yield put(companyCommonApiResponseSuccess(CommonTypes.GET_CATEGORIES, response.data));
    } catch (error) {
        yield put(companyCommonApiResponseError(CommonTypes.GET_CATEGORIES, error));
    }
}

function* getVendorCategories({ payload: { companyId } }: any) {
    try {
        const response = yield call(getCompanyCategoriesApi, companyId, {'vendors_only': true});
        yield put(companyCommonApiResponseSuccess(CommonTypes.GET_VENDOR_CATEGORIES, response.data));
    } catch (error) {
        yield put(companyCommonApiResponseError(CommonTypes.GET_VENDOR_CATEGORIES, error));
    }
}

function* getSalesCategories({ payload: { companyId } }: any) {
    try {
        const response = yield call(getCompanyCategoriesApi, companyId, { 'sales_channel_only': true });
        yield put(companyCommonApiResponseSuccess(CommonTypes.GET_SALES_CATEGORIES, response.data));
    } catch (error) {
        yield put(companyCommonApiResponseError(CommonTypes.GET_SALES_CATEGORIES, error));
    }
}


export function* watchGetCompanies() {
    yield takeEvery(CommonTypes.GET_COMPANIES, getCompanies)
}

export function* watchGetCompany() {
    yield takeEvery(CommonTypes.GET_COMPANY, getCompany)
}

export function* watchCreateCompany() {
    yield takeEvery(CommonTypes.CREATE_COMPANY, createCompany)
}

export function* watchEditCompany() {
    yield takeEvery(CommonTypes.EDIT_COMPANY, editCompany)
}

export function* watchGetCompanyCategories() {
    yield takeEvery(CommonTypes.GET_CATEGORIES, getCompanyCategories);
    yield takeEvery(CommonTypes.GET_VENDOR_CATEGORIES, getVendorCategories);
    yield takeEvery(CommonTypes.GET_SALES_CATEGORIES, getSalesCategories);
}

function* commonSaga() {
    yield all([
        fork(watchGetCompanies),
        fork(watchGetCompany),
        fork(watchCreateCompany),
        fork(watchEditCompany),
        fork(watchGetCompanyCategories)
    ]);
}

export default commonSaga;