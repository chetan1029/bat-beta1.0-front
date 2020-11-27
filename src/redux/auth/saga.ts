import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { login as loginApi, logout as logoutApi } from "../../api/index";

import { APICore, setAuthorization } from "../../api/apiCore";
import { authApiResponseSuccess, authApiResponseError } from "./actions";
import { AuthActionTypes } from './constants';

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password } }: any) {
    try {
        const response: any = yield call(loginApi, { username, password });
        const { user, token } = response.data;
        api.setLoggedInUser({ ...user, token });
        setAuthorization(token);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

/**
 * Logout the user
 */
function* logout() {
    try {
        yield call(logoutApi);
        api.setLoggedInUser(null);
        setAuthorization(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login)
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout)
}


function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout)
    ]);
}

export default authSaga;