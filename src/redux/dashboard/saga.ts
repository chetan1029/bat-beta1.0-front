import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getSalesChartData, getEmailChartData, getKeywordTrackingData, getProductKeywordData, getSessionChartData } from "../../api/index";

import { dashboardApiResponseSuccess, dashboardApiResponseError } from "./actions";
import { DashboardTypes } from './constants';


/**
 * get all
 */
function* getDashboardSalesChartData({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getSalesChartData, companyId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_SALESCHART_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_SALESCHART_DATA, error));
    }
}

function* getDashboardEmailChartData({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getEmailChartData, companyId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_EMAILCHART_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_EMAILCHART_DATA, error));
    }
}

function* getDashboardSessionChartData({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getSessionChartData, companyId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_SESSIONCHART_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_SESSIONCHART_DATA, error));
    }
}

function* getDashboardKeywordTrackingData({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getKeywordTrackingData, companyId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_KEYWORDTRACKING_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_KEYWORDTRACKING_DATA, error));
    }
}

function* getDashboardProductKeywordData({ payload: { companyId, keywordId, filters } }: any) {
    try {
        const response = yield call(getProductKeywordData, companyId, keywordId, filters);
        yield put(dashboardApiResponseSuccess(DashboardTypes.GET_PRODUCTKEYWORD_DATA, response.data));
    } catch (error) {
        yield put(dashboardApiResponseError(DashboardTypes.GET_PRODUCTKEYWORD_DATA, error));
    }
}

export function* watchGetDashboardSalesChartData() {
    yield takeEvery(DashboardTypes.GET_SALESCHART_DATA, getDashboardSalesChartData)
}

export function* watchGetDashboardEmailChartData() {
    yield takeEvery(DashboardTypes.GET_EMAILCHART_DATA, getDashboardEmailChartData)
}

export function* watchGetDashboardSessionChartData() {
    yield takeEvery(DashboardTypes.GET_SESSIONCHART_DATA, getDashboardSessionChartData)
}

export function* watchGetDashboardKeywordTrackingData() {
    yield takeEvery(DashboardTypes.GET_KEYWORDTRACKING_DATA, getDashboardKeywordTrackingData)
}

export function* watchGetDashboardProductKeywordData() {
    yield takeEvery(DashboardTypes.GET_PRODUCTKEYWORD_DATA, getDashboardProductKeywordData)
}

function* dashboardSaga() {
    yield all([
        fork(watchGetDashboardSalesChartData),
        fork(watchGetDashboardEmailChartData),
        fork(watchGetDashboardSessionChartData),
        fork(watchGetDashboardKeywordTrackingData),
        fork(watchGetDashboardProductKeywordData),
    ]);
}

export default dashboardSaga;
