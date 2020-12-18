import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getHscode as getHscodeByCompanyId,
    createHscode as addHscode,
    updateHscode,
    deleteHscode as deleteHscodeApi,
    archiveHscode as archiveHscodeApi,
    restoreHscode as restoreHscodeApi
} from "../../../api/index";

import { hscodeApiResponseSuccess, hscodeApiResponseError } from "./actions";
import { HscodeTypes } from './constants';


/**
 * get all payment terms
 */
function* getHscode({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getHscodeByCompanyId, companyId, filters);
        yield put(hscodeApiResponseSuccess(HscodeTypes.GET_HSCODE, response.data));
    } catch (error) {
        yield put(hscodeApiResponseError(HscodeTypes.GET_HSCODE, error));
    }
}

/*
create payment term
*/
function* createHscode({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addHscode, companyId, params);
        yield put(hscodeApiResponseSuccess(HscodeTypes.CREATE_HSCODE, response.data));

    } catch (error) {
        yield put(hscodeApiResponseError(HscodeTypes.CREATE_HSCODE, error));
    }
}

/*
update payment term
*/
function* editHscode({ payload: { companyId, hscodeId, params } }: any) {
    try {
        const response = yield call(updateHscode, companyId, hscodeId, params);
        yield put(hscodeApiResponseSuccess(HscodeTypes.EDIT_HSCODE, response.data));
    } catch (error) {
        yield put(hscodeApiResponseError(HscodeTypes.EDIT_HSCODE, error));
    }
}

/*
delete payment term
*/
function* deleteHscode({ payload: { companyId, hscodeId } }: any) {
    try {
        const response = yield call(deleteHscodeApi, companyId, hscodeId);
        yield put(hscodeApiResponseSuccess(HscodeTypes.DELETE_HSCODE, response.data));

    } catch (error) {
        yield put(hscodeApiResponseError(HscodeTypes.DELETE_HSCODE, error));
    }
}

/*
archive
*/
function* archiveHscode({ payload: { companyId, hscodeId, params } }: any) {
    try {
        const response = yield call(archiveHscodeApi, companyId, hscodeId, params);
        yield put(hscodeApiResponseSuccess(HscodeTypes.ARCHIVE_HSCODE, response.data));

    } catch (error) {
        yield put(hscodeApiResponseError(HscodeTypes.ARCHIVE_HSCODE, error));
    }
}

/*
restore
*/
function* restoreHscode({ payload: { companyId, hscodeId, params } }: any) {
    try {
        const response = yield call(restoreHscodeApi, companyId, hscodeId, params);
        yield put(hscodeApiResponseSuccess(HscodeTypes.RESTORE_HSCODE, response.data));

    } catch (error) {
        yield put(hscodeApiResponseError(HscodeTypes.RESTORE_HSCODE, error));
    }
}

export function* watchGetHscode() {
    yield takeEvery(HscodeTypes.GET_HSCODE, getHscode)
}

export function* watchCreateHscode() {
    yield takeEvery(HscodeTypes.CREATE_HSCODE, createHscode)
}

export function* watchEditHscode() {
    yield takeEvery(HscodeTypes.EDIT_HSCODE, editHscode)
}

export function* watchDeleteHscode() {
    yield takeEvery(HscodeTypes.DELETE_HSCODE, deleteHscode)
}

export function* watchArchiveHscode() {
    yield takeEvery(HscodeTypes.ARCHIVE_HSCODE, archiveHscode)
}

export function* watchRestoreHscode() {
    yield takeEvery(HscodeTypes.RESTORE_HSCODE, restoreHscode)
}

function* hscodeSaga() {
    yield all([
        fork(watchGetHscode),
        fork(watchCreateHscode),
        fork(watchEditHscode),
        fork(watchDeleteHscode),
        fork(watchArchiveHscode),
        fork(watchRestoreHscode)
    ]);
}

export default hscodeSaga;
