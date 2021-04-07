import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getCampaignDashboard } from "../../api/index";

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

export function* watchGetCampaignDashboard() {
    yield takeEvery(DashboardTypes.GET_CAMPAIGN_DATA, getCampaignDashboardData)
}


function* dashboardSaga() {
    yield all([
        fork(watchGetCampaignDashboard),
    ]);
}

export default dashboardSaga;