import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getCampaignDashboard, getKeywordTrackingDashboard, getProductKeywordDashboard } from "../../api/index";

import { dashboardApiResponseSuccess, dashboardApiResponseError } from "./actions";
import { DashboardTypes } from './constants';


/**
 * get all
 */
function* getCampaignDashboardData({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getCampaignDashboard, companyId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_CAMPAIGN_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_CAMPAIGN_DATA, error));
    }
}

function* getKeywordTrackingDashboardData({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getKeywordTrackingDashboard, companyId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_KEYWORDTRACKING_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_KEYWORDTRACKING_DATA, error));
    }
}

function* getProductKeywordDashboardData({ payload: { companyId, keywordId, filters } }: any) {
    try {
        const response = yield call(getProductKeywordDashboard, companyId, keywordId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_PRODUCTKEYWORD_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_PRODUCTKEYWORD_DATA, error));
    }
}

export function* watchGetCampaignDashboard() {
    yield takeEvery(DashboardTypes.GET_CAMPAIGN_DATA, getCampaignDashboardData)
}

export function* watchGetKeywordTrackingDashboard() {
    yield takeEvery(DashboardTypes.GET_KEYWORDTRACKING_DATA, getKeywordTrackingDashboardData)
}

export function* watchGetProductKeywordDashboard() {
    yield takeEvery(DashboardTypes.GET_PRODUCTKEYWORD_DATA, getProductKeywordDashboardData)
}

function* dashboardSaga() {
    yield all([
        fork(watchGetCampaignDashboard),
        fork(watchGetKeywordTrackingDashboard),
        fork(watchGetProductKeywordDashboard),
    ]);
}

export default dashboardSaga;
