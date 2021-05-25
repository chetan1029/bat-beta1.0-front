import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getRoles as getRolesApi, getStatuses as getStatusesApi } from "../../api/index";

import { commonApiResponseSuccess, commonApiResponseError } from "./actions";
import { CommonTypes } from './constants';


/**
 * Fetches the roles
 */
function* getRoles() {
    try {
        const response = yield call(getRolesApi);
        yield put(commonApiResponseSuccess(CommonTypes.GET_ROLES, response.data));
    } catch (error) {
        yield put(commonApiResponseError(CommonTypes.GET_ROLES, error));
    }
}

function* getStatuses({ payload: { filters } }: any) {
    try {
        const response = yield call(getStatusesApi, filters);
        yield put(commonApiResponseSuccess(CommonTypes.GET_STATUSES, response.data));
    } catch (error) {
        yield put(commonApiResponseError(CommonTypes.GET_STATUSES, error));
    }
}

export function* watchGetRoles() {
    yield takeEvery(CommonTypes.GET_ROLES, getRoles)
}

export function* watchGetStatuses() {
    yield takeEvery(CommonTypes.GET_STATUSES, getStatuses)
}


function* commonSaga() {
    yield all([
        fork(watchGetRoles),
        fork(watchGetStatuses),
    ]);
}

export default commonSaga;
