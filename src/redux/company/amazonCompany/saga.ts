import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getAmazonAccount as getAmazonAccountApi, updateAmazonAccount as updateAmazonAccountApi } from "../../../api/index";

import { amazonCompanyApiResponseSuccess, amazonCompanyApiResponseError } from "./actions";
import { AmazonCompanyTypes } from './constants';

function* getAmazonAccount({ payload: { companyId, id } }: any) {
    try {
        const response = yield call(getAmazonAccountApi, companyId, id);
        yield put(amazonCompanyApiResponseSuccess(AmazonCompanyTypes.GET_AMAZON_COMPANY, response.data));
    } catch (error) {
        yield put(amazonCompanyApiResponseError(AmazonCompanyTypes.GET_AMAZON_COMPANY, error));
    }
}

function* updateAmazonAccount({ payload: { companyId, id, data } }: any) {
    try {
        const response = yield call(updateAmazonAccountApi, companyId, id, data);
        yield put(amazonCompanyApiResponseSuccess(AmazonCompanyTypes.UPDATE_AMAZON_COMPANY, response.data));
    } catch (error) {
        yield put(amazonCompanyApiResponseError(AmazonCompanyTypes.UPDATE_AMAZON_COMPANY, error));
    }
}

export function* watchGetCompany() {
    yield takeEvery(AmazonCompanyTypes.GET_AMAZON_COMPANY, getAmazonAccount)
}

export function* watchUpdateAccount() {
    yield takeEvery(AmazonCompanyTypes.UPDATE_AMAZON_COMPANY, updateAmazonAccount)
}


function* amazonAccountSaga() {
    yield all([
        fork(watchGetCompany),
        fork(watchUpdateAccount)
    ]);
}

export default amazonAccountSaga;