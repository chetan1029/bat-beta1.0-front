import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getRoles as getRolesApi } from "../../api/index";

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

export function* watchGetRoles() {
    yield takeEvery(CommonTypes.GET_ROLES, getRoles)
}


function* commonSaga() {
    yield all([
        fork(watchGetRoles),
    ]);
}

export default commonSaga;