import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getPackingBox as getPackingBoxByCompanyId,
    createPackingBox as addPackingBox,
    updatePackingBox,
    deletePackingBox as deletePackingBoxApi,
    archivePackingBox as archivePackingBoxApi,
    restorePackingBox as restorePackingBoxApi
} from "../../../api/index";

import { packingBoxApiResponseSuccess, packingBoxApiResponseError } from "./actions";
import { PackingBoxTypes } from './constants';


/**
 * get all payment terms
 */
function* getPackingBox({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getPackingBoxByCompanyId, companyId, filters);
        yield put(packingBoxApiResponseSuccess(PackingBoxTypes.GET_PACKING_BOX, response.data));
    } catch (error) {
        yield put(packingBoxApiResponseError(PackingBoxTypes.GET_PACKING_BOX, error));
    }
}

/*
create payment term
*/
function* createPackingBox({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addPackingBox, companyId, params);
        yield put(packingBoxApiResponseSuccess(PackingBoxTypes.CREATE_PACKING_BOX, response.data));

    } catch (error) {
        yield put(packingBoxApiResponseError(PackingBoxTypes.CREATE_PACKING_BOX, error));
    }
}

/*
update payment term
*/
function* editPackingBox({ payload: { companyId, paymentTermId, params } }: any) {
    try {
        const response = yield call(updatePackingBox, companyId, paymentTermId, params);
        yield put(packingBoxApiResponseSuccess(PackingBoxTypes.EDIT_PACKING_BOX, response.data));
    } catch (error) {
        yield put(packingBoxApiResponseError(PackingBoxTypes.EDIT_PACKING_BOX, error));
    }
}

/*
delete payment term
*/
function* deletePackingBox({ payload: { companyId, paymentTermId } }: any) {
    try {
        const response = yield call(deletePackingBoxApi, companyId, paymentTermId);
        yield put(packingBoxApiResponseSuccess(PackingBoxTypes.DELETE_PACKING_BOX, response.data));

    } catch (error) {
        yield put(packingBoxApiResponseError(PackingBoxTypes.DELETE_PACKING_BOX, error));
    }
}

/*
archive
*/
function* archivePackingBox({ payload: { companyId, paymentTermId, params } }: any) {
    try {
        const response = yield call(archivePackingBoxApi, companyId, paymentTermId, params);
        yield put(packingBoxApiResponseSuccess(PackingBoxTypes.ARCHIVE_PACKING_BOX, response.data));

    } catch (error) {
        yield put(packingBoxApiResponseError(PackingBoxTypes.ARCHIVE_PACKING_BOX, error));
    }
}

/*
restore
*/
function* restorePackingBox({ payload: { companyId, paymentTermId, params } }: any) {
    try {
        const response = yield call(restorePackingBoxApi, companyId, paymentTermId, params);
        yield put(packingBoxApiResponseSuccess(PackingBoxTypes.RESTORE_PACKING_BOX, response.data));

    } catch (error) {
        yield put(packingBoxApiResponseError(PackingBoxTypes.RESTORE_PACKING_BOX, error));
    }
}

export function* watchGetPackingBox() {
    yield takeEvery(PackingBoxTypes.GET_PACKING_BOX, getPackingBox)
}

export function* watchCreatePackingBox() {
    yield takeEvery(PackingBoxTypes.CREATE_PACKING_BOX, createPackingBox)
}

export function* watchEditPackingBox() {
    yield takeEvery(PackingBoxTypes.EDIT_PACKING_BOX, editPackingBox)
}

export function* watchDeletePackingBox() {
    yield takeEvery(PackingBoxTypes.DELETE_PACKING_BOX, deletePackingBox)
}

export function* watchArchivePackingBox() {
    yield takeEvery(PackingBoxTypes.ARCHIVE_PACKING_BOX, archivePackingBox)
}

export function* watchRestorePackingBox() {
    yield takeEvery(PackingBoxTypes.RESTORE_PACKING_BOX, restorePackingBox)
}

function* packingBoxSaga() {
    yield all([
        fork(watchGetPackingBox),
        fork(watchCreatePackingBox),
        fork(watchEditPackingBox),
        fork(watchDeletePackingBox),
        fork(watchArchivePackingBox),
        fork(watchRestorePackingBox)
    ]);
}

export default packingBoxSaga;
