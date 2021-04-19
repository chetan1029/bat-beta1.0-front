import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getCampaigns, getCampaign, updateCampaign as updateCampaignApi, testCampaign as testCampaignApi } from "../../../api/index";

import { autoEmailsApiResponseError, autoEmailsApiResponseSuccess } from "./actions";
import { AutoEmailsTypes } from './constants';


/**
 * get all
 */
function* getAllCampaigns({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getCampaigns, companyId, filters);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.GET_CAMPAIGNS, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.GET_CAMPAIGNS, error));
    }
}

function* getCampaignDetails({ payload: { companyId, campaignId } }: any) {
    try {
        const response = yield call(getCampaign, companyId, campaignId);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.GET_CAMPAIGN, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.GET_CAMPAIGN, error));
    }
}

function* updateCampaign({ payload: { companyId, campaignId, data } }: any) {
    try {
        const response = yield call(updateCampaignApi, companyId, campaignId, data);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.UPDATE_CAMPAIGN, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.UPDATE_CAMPAIGN, error));
    }
}

function* testCampaign({ payload: { companyId, campaignId, data } }: any) {
    try {
        const response = yield call(testCampaignApi, companyId, campaignId, data);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.TEST_CAMPAIGN, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.TEST_CAMPAIGN, error));
    }
}

export function* watchGetCampaigns() {
    yield takeEvery(AutoEmailsTypes.GET_CAMPAIGNS, getAllCampaigns)
}

export function* watchGetCampaign() {
    yield takeEvery(AutoEmailsTypes.GET_CAMPAIGN, getCampaignDetails)
}

export function* watchUpdateCampain() {
    yield takeEvery(AutoEmailsTypes.UPDATE_CAMPAIGN, updateCampaign)
}

export function* watchTestCampain() {
    yield takeEvery(AutoEmailsTypes.TEST_CAMPAIGN, testCampaign)
}

function* autoEmailsSaga() {
    yield all([
        fork(watchGetCampaigns),
        fork(watchGetCampaign),
        fork(watchUpdateCampain),
        fork(watchTestCampain)
    ]);
}

export default autoEmailsSaga;