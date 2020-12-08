import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getVendors
} from "../../../api/index";

import { vendorsApiResponseSuccess, vendorsApiResponseError } from "./actions";
import { VendorsTypes } from './constants';


/**
 * get all Vendors
 */
function* getAllVendors({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getVendors, companyId, filters);
        yield put(vendorsApiResponseSuccess(VendorsTypes.GET_VENDORS, response.data));
    } catch (error) {
        yield put(vendorsApiResponseError(VendorsTypes.GET_VENDORS, error));
    }
}

function* addNewVendor({ payload: { companyId, categoryId, data } }: any) {
    try {
        const response = yield call(getVendors, companyId, data);
        yield put(vendorsApiResponseSuccess(VendorsTypes.GET_VENDORS, response.data));
    } catch (error) {
        yield put(vendorsApiResponseError(VendorsTypes.GET_VENDORS, error));
    }
}


export function* watchGetVendors() {
    yield takeEvery(VendorsTypes.GET_VENDORS, getAllVendors)
}



function* vendorsSaga() {
    yield all([
        fork(watchGetVendors),
    ]);
}

export default vendorsSaga;