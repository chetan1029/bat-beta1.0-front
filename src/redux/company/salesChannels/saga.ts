import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getSalesChannels, getSalesChannel, createMember
} from "../../../api/index";

import { salesChannelsApiResponseSuccess, salesChannelsApiResponseError } from "./actions";
import { SalesChannelsTypes } from './constants';


/**
 * get all Vendors
 */
function* getAll({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getSalesChannels, companyId, filters);
        yield put(salesChannelsApiResponseSuccess(SalesChannelsTypes.GET_SALES_CHANNELS, response.data));
    } catch (error) {
        yield put(salesChannelsApiResponseError(SalesChannelsTypes.GET_SALES_CHANNELS, error));
    }
}

function* getDetails({ payload: { companyId, channelId } }: any) {
    try {
        const response = yield call(getSalesChannel, companyId, channelId);
        yield put(salesChannelsApiResponseSuccess(SalesChannelsTypes.GET_SALES_CHANNEL, response.data));
    } catch (error) {
        yield put(salesChannelsApiResponseError(SalesChannelsTypes.GET_SALES_CHANNEL, error));
    }
}

function* inviteNew({ payload: { companyId, data } }: any) {
    try {
        const response = yield call(createMember, companyId, data);
        yield put(salesChannelsApiResponseSuccess(SalesChannelsTypes.INVITE_SALES_CHANNEL, response.data));
    } catch (error) {
        yield put(salesChannelsApiResponseError(SalesChannelsTypes.INVITE_SALES_CHANNEL, error));
    }
}

export function* watchGetVendors() {
    yield takeEvery(SalesChannelsTypes.GET_SALES_CHANNELS, getAll)
}

export function* watchgetVendorDetails() {
    yield takeEvery(SalesChannelsTypes.GET_SALES_CHANNEL, getDetails)
}

export function* watchinviteNewVendor() {
    yield takeEvery(SalesChannelsTypes.INVITE_SALES_CHANNEL, inviteNew)
}


function* channelsSaga() {
    yield all([
        fork(watchGetVendors),
        fork(watchgetVendorDetails),
        fork(watchinviteNewVendor)
    ]);
}

export default channelsSaga;