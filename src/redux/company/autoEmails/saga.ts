import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getCampaigns, getCampaign, updateCampaign as updateCampaignApi, testCampaign as testCampaignApi, getEmailQueues, getTemplates, getTemplate, deleteTemplate as deleteTemplateApi, createTemplate as addTemplate, updateTemplate } from "../../../api/index";

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

function* getAllEmailQueues({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getEmailQueues, companyId, filters);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.GET_EMAILQUEUES, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.GET_EMAILQUEUES, error));
    }
}

/* template */
function* getAllTemplates({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getTemplates, companyId, filters);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.GET_TEMPLATES, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.GET_TEMPLATES, error));
    }
}

function* getTemplateDetails({ payload: { companyId, templateId } }: any) {
    try {
        const response = yield call(getTemplate, companyId, templateId);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.GET_TEMPLATE, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.GET_TEMPLATE, error));
    }
}

/*
create template
*/
function* createTemplate({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addTemplate, companyId, params);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.CREATE_TEMPLATE, response.data));

    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.CREATE_TEMPLATE, error));
    }
}

/*
update template
*/
function* editTemplate({ payload: { companyId, templateId, params } }: any) {
    try {
        const response = yield call(updateTemplate, companyId, templateId, params);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.EDIT_TEMPLATE, response.data));
    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.EDIT_TEMPLATE, error));
    }
}

/*
delete asset
*/
function* deleteTemplate({ payload: { companyId, templateId } }: any) {
    try {
        const response = yield call(deleteTemplateApi, companyId, templateId);
        yield put(autoEmailsApiResponseSuccess(AutoEmailsTypes.DELETE_TEMPLATE, response.data));

    } catch (error) {
        yield put(autoEmailsApiResponseError(AutoEmailsTypes.DELETE_TEMPLATE, error));
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

export function* watchGetEmailQueues() {
    yield takeEvery(AutoEmailsTypes.GET_EMAILQUEUES, getAllEmailQueues)
}

export function* watchGetTemplates() {
    yield takeEvery(AutoEmailsTypes.GET_TEMPLATES, getAllTemplates)
}

export function* watchGetTemplate() {
    yield takeEvery(AutoEmailsTypes.GET_TEMPLATE, getTemplateDetails)
}

export function* watchTemplate() {
    yield takeEvery(AutoEmailsTypes.CREATE_TEMPLATE, createTemplate)
}

export function* watchEditTemplate() {
    yield takeEvery(AutoEmailsTypes.EDIT_TEMPLATE, editTemplate)
}

export function* watchDeleteTemplate() {
    yield takeEvery(AutoEmailsTypes.DELETE_TEMPLATE, deleteTemplate)
}

function* autoEmailsSaga() {
    yield all([
        fork(watchGetCampaigns),
        fork(watchGetCampaign),
        fork(watchUpdateCampain),
        fork(watchTestCampain),
        fork(watchGetEmailQueues),
        fork(watchGetTemplates),
        fork(watchGetTemplate),
        fork(watchTemplate),
        fork(watchEditTemplate),
        fork(watchDeleteTemplate),
    ]);
}

export default autoEmailsSaga;
