import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    login as loginApi, logout as logoutApi, signup as signupApi, forgotPassword as forgotPasswordApi,
    forgotPasswordConfirm, updateProfile as updateProfileApi, updateProfilePicture as updateProfilePictureApi,
    changePassword as changePasswordApi
} from "../../api/index";

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

function* signup({ payload: { data } }: any) {
    try {
        const response: any = yield call(signupApi, data);
        const { user, token } = response.data;
        api.setLoggedInUser({ ...user, token });
        setAuthorization(token);
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}


function* forgotPassword({ payload: { data } }: any) {
    try {
        const response: any = yield call(forgotPasswordApi, data);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

function* forgotPasswordChange({ payload: { data } }: any) {
    try {
        const response: any = yield call(forgotPasswordConfirm, data);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD_CHANGE, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD_CHANGE, error));
    }
}

function* updateProfile({ payload: { username, data } }: any) {
    try {
        const response: any = yield call(updateProfileApi, username, data);
        yield put(authApiResponseSuccess(AuthActionTypes.UPDATE_PROFILE, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.UPDATE_PROFILE, error));
    }
}

function* updateProfilePicture({ payload: { username, profile_pic } }: any) {
    try {
        console.log(username, profile_pic);
        const response: any = yield call(updateProfilePictureApi, username, { 'profile_picture': profile_pic });
        yield put(authApiResponseSuccess(AuthActionTypes.UPDATE_PROFILE_PICTURE, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.UPDATE_PROFILE_PICTURE, error));
    }
}



function* changePassword({ payload: { new_password1, new_password2 } }: any) {
    try {
        const response: any = yield call(changePasswordApi, { new_password1, new_password2 });
        yield put(authApiResponseSuccess(AuthActionTypes.CHANGE_PASSWORD, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.CHANGE_PASSWORD, error));
    }
}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login)
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout)
}

export function* watchSignup() {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup)
}

export function* watchForgotPassword() {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword)
}

export function* watchForgotPasswordChange() {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD_CHANGE, forgotPasswordChange)
}

export function* watchUpdateProfile() {
    yield takeEvery(AuthActionTypes.UPDATE_PROFILE, updateProfile)
}

export function* watchUpdateProfilePicture() {
    yield takeEvery(AuthActionTypes.UPDATE_PROFILE_PICTURE, updateProfilePicture)
}

export function* watchchangePassword() {
    yield takeEvery(AuthActionTypes.CHANGE_PASSWORD, changePassword)
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchForgotPassword),
        fork(watchForgotPasswordChange),
        fork(watchUpdateProfile),
        fork(watchUpdateProfilePicture),
        fork(watchchangePassword)
    ]);
}

export default authSaga;