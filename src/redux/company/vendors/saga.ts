import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getVendors, createVendor, updateVendor, getVendor, createMember
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

function* getVendorDetails({ payload: { companyId, vendorId } }: any) {
    try {
        const response = yield call(getVendor, companyId, vendorId);
        yield put(vendorsApiResponseSuccess(VendorsTypes.GET_VENDOR, response.data));
    } catch (error) {
        yield put(vendorsApiResponseError(VendorsTypes.GET_VENDOR, error));
    }
}

function* addNewVendor({ payload: { companyId, data } }: any) {
    try {
        const response = yield call(createVendor, companyId, data);
        yield put(vendorsApiResponseSuccess(VendorsTypes.ADD_VENDOR, response.data));
    } catch (error) {
        yield put(vendorsApiResponseError(VendorsTypes.ADD_VENDOR, error));
    }
}

function* editVendor({ payload: { companyId, vendorId, data } }: any) {
    try {
        const response = yield call(updateVendor, companyId, vendorId, data);
        yield put(vendorsApiResponseSuccess(VendorsTypes.EDIT_VENDOR, response.data));
    } catch (error) {
        yield put(vendorsApiResponseError(VendorsTypes.EDIT_VENDOR, error));
    }
}

function* inviteNewVendor({ payload: { companyId, data } }: any) {
    try {
        const response = yield call(createMember, companyId, data);
        yield put(vendorsApiResponseSuccess(VendorsTypes.INVITE_VENDOR, response.data));
    } catch (error) {
        yield put(vendorsApiResponseError(VendorsTypes.INVITE_VENDOR, error));
    }
}

export function* watchGetVendors() {
    yield takeEvery(VendorsTypes.GET_VENDORS, getAllVendors)
}

export function* watchgetVendorDetails() {
    yield takeEvery(VendorsTypes.GET_VENDOR, getVendorDetails)
}


export function* watchAddVendor() {
    yield takeEvery(VendorsTypes.ADD_VENDOR, addNewVendor)
}


export function* watchEditVendor() {
    yield takeEvery(VendorsTypes.EDIT_VENDOR, editVendor)
}

export function* watchinviteNewVendor() {
    yield takeEvery(VendorsTypes.INVITE_VENDOR, inviteNewVendor)
}


function* vendorsSaga() {
    yield all([
        fork(watchGetVendors),
        fork(watchgetVendorDetails),
        fork(watchAddVendor),
        fork(watchEditVendor),
        fork(watchinviteNewVendor)
    ]);
}

export default vendorsSaga;