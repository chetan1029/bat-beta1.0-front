import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getClients, getClient, archiveClient as archiveClientApi } from "../../../api/index";

import { clientsApiResponseSuccess, clientsApiResponseError } from "./actions";
import { ClientTypes } from './constants';


/**
 * get all
 */
function* getAllClients({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getClients, companyId, filters);
        yield put(clientsApiResponseSuccess(ClientTypes.GET_CLIENTS, response.data));
    } catch (error) {
        yield put(clientsApiResponseError(ClientTypes.GET_CLIENTS, error));
    }
}

function* getClientDetails({ payload: { companyId, clientId } }: any) {
    try {
        const response = yield call(getClient, companyId, clientId);
        yield put(clientsApiResponseSuccess(ClientTypes.GET_CLIENT, response.data));
    } catch (error) {
        yield put(clientsApiResponseError(ClientTypes.GET_CLIENT, error));
    }
}

function* archiveClient({ payload: { companyId, clientId } }: any) {
    try {
        const response = yield call(archiveClientApi, companyId, clientId);
        yield put(clientsApiResponseSuccess(ClientTypes.ARCHIVE_CLIENT, response.data));
    } catch (error) {
        yield put(clientsApiResponseError(ClientTypes.ARCHIVE_CLIENT, error));
    }
}

export function* watchGetClients() {
    yield takeEvery(ClientTypes.GET_CLIENTS, getAllClients)
}

export function* watchGetClientDetails() {
    yield takeEvery(ClientTypes.GET_CLIENT, getClientDetails)
}

export function* watchArchiveClient() {
    yield takeEvery(ClientTypes.ARCHIVE_CLIENT, archiveClient)
}

function* clientsSaga() {
    yield all([
        fork(watchGetClients),
        fork(watchGetClientDetails),
        fork(watchArchiveClient),
    ]);
}

export default clientsSaga;