import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getLocation as getLocationByCompanyId,
    createLocation as addLocation,
    updateLocation,
    deleteLocation as deleteLocationApi,
    archiveLocation as archiveLocationApi,
    restoreLocation as restoreLocationApi
} from "../../../api/index";

import { locationApiResponseSuccess, locationApiResponseError } from "./actions";
import { LocationTypes } from './constants';


/**
 * get all payment terms
 */
function* getLocation({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getLocationByCompanyId, companyId, filters);
        yield put(locationApiResponseSuccess(LocationTypes.GET_LOCATION, response.data));
    } catch (error) {
        yield put(locationApiResponseError(LocationTypes.GET_LOCATION, error));
    }
}

/*
create payment term
*/
function* createLocation({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addLocation, companyId, params);
        yield put(locationApiResponseSuccess(LocationTypes.CREATE_LOCATION, response.data));

    } catch (error) {
        yield put(locationApiResponseError(LocationTypes.CREATE_LOCATION, error));
    }
}

/*
update payment term
*/
function* editLocation({ payload: { companyId, locationId, params } }: any) {
    try {
        const response = yield call(updateLocation, companyId, locationId, params);
        yield put(locationApiResponseSuccess(LocationTypes.EDIT_LOCATION, response.data));
    } catch (error) {
        yield put(locationApiResponseError(LocationTypes.EDIT_LOCATION, error));
    }
}

/*
delete payment term
*/
function* deleteLocation({ payload: { companyId, locationId } }: any) {
    try {
        const response = yield call(deleteLocationApi, companyId, locationId);
        yield put(locationApiResponseSuccess(LocationTypes.DELETE_LOCATION, response.data));

    } catch (error) {
        yield put(locationApiResponseError(LocationTypes.DELETE_LOCATION, error));
    }
}

/*
archive
*/
function* archiveLocation({ payload: { companyId, locationId, params } }: any) {
    try {
        const response = yield call(archiveLocationApi, companyId, locationId, params);
        yield put(locationApiResponseSuccess(LocationTypes.ARCHIVE_LOCATION, response.data));

    } catch (error) {
        yield put(locationApiResponseError(LocationTypes.ARCHIVE_LOCATION, error));
    }
}

/*
restore
*/
function* restoreLocation({ payload: { companyId, locationId, params } }: any) {
    try {
        const response = yield call(restoreLocationApi, companyId, locationId, params);
        yield put(locationApiResponseSuccess(LocationTypes.RESTORE_LOCATION, response.data));

    } catch (error) {
        yield put(locationApiResponseError(LocationTypes.RESTORE_LOCATION, error));
    }
}

export function* watchGetLocation() {
    yield takeEvery(LocationTypes.GET_LOCATION, getLocation)
}

export function* watchCreateLocation() {
    yield takeEvery(LocationTypes.CREATE_LOCATION, createLocation)
}

export function* watchEditLocation() {
    yield takeEvery(LocationTypes.EDIT_LOCATION, editLocation)
}

export function* watchDeleteLocation() {
    yield takeEvery(LocationTypes.DELETE_LOCATION, deleteLocation)
}

export function* watchArchiveLocation() {
    yield takeEvery(LocationTypes.ARCHIVE_LOCATION, archiveLocation)
}

export function* watchRestoreLocation() {
    yield takeEvery(LocationTypes.RESTORE_LOCATION, restoreLocation)
}

function* locationSaga() {
    yield all([
        fork(watchGetLocation),
        fork(watchCreateLocation),
        fork(watchEditLocation),
        fork(watchDeleteLocation),
        fork(watchArchiveLocation),
        fork(watchRestoreLocation)
    ]);
}

export default locationSaga;
