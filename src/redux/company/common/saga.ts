import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getCompaniesList } from "../../../api/index";

import { APICore } from "../../../api/apiCore";
import { commonApiResponseSuccess, commonApiResponseError } from "./actions";
import { CommonTypes } from './constants';

const api = new APICore();


/**
 * Logout the user
 */
function* getCompanies({ payload: filters }: any) {
    try {
        const response = yield call(getCompaniesList, filters);
        yield put(commonApiResponseSuccess(CommonTypes.GET_COMPANIES, response.data));
    } catch (error) {
        yield put(commonApiResponseError(CommonTypes.GET_COMPANIES, error));
    }
}

export function* watchGetCompanies() {
    yield takeEvery(CommonTypes.GET_COMPANIES, getCompanies)
}


function* commonSaga() {
    yield all([
        fork(watchGetCompanies),
    ]);
}

export default commonSaga;