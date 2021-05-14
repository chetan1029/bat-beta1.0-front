import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getCampaignDashboard, getKeywordTrackingDashboard } from "../../api/index";

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

export function* watchGetCampaignDashboard() {
    yield takeEvery(DashboardTypes.GET_CAMPAIGN_DATA, getCampaignDashboardData)
}

export function* watchGetKeywordTrackingDashboard() {
    yield takeEvery(DashboardTypes.GET_KEYWORDTRACKING_DATA, getKeywordTrackingDashboardData)
}

function* dashboardSaga() {
    yield all([
        fork(watchGetCampaignDashboard),
        fork(watchGetKeywordTrackingDashboard),
    ]);
}

export default dashboardSaga;
