import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { login as loginApi } from "../../api/index";

import { APICore } from "../../api/apiCore";
import { authApiResponseSuccess, authApiResponseError } from "./actions";
import { AuthActionTypes } from './constants';

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password } }: any) {
    try {
        const response = yield call(loginApi, { username, password });
        api.setLoggedInUser(response);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, response));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
    }
}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login)
}


function* authSaga() {
    yield all([
        fork(watchLoginUser),
    ]);
}

export default authSaga;