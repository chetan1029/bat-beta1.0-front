import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getInvitataions as getInvitataionsApi, acceptInvite as acceptInviteApi, rejectInvite, } from "../../api/index";

import { inviteApiResponseSuccess, inviteApiResponseError } from "./actions";
import { InvitationsTypes } from './constants';


/**
 * Fetches the invites
 */
function* getInvitataions({ payload: { params } }: any) {
    try {
        const response = yield call(getInvitataionsApi, params);
        yield put(inviteApiResponseSuccess(InvitationsTypes.GET_INVITATIONS, response.data));
    } catch (error) {
        yield put(inviteApiResponseError(InvitationsTypes.GET_INVITATIONS, error));
    }
}

function* acceptInvite({ payload: { inviteId } }: any) {
    try {
        const response = yield call(acceptInviteApi, inviteId);
        yield put(inviteApiResponseSuccess(InvitationsTypes.ACCEPT_INVITATION, response.data));
    } catch (error) {
        yield put(inviteApiResponseError(InvitationsTypes.ACCEPT_INVITATION, error));
    }
}

function* declineInvite({ payload: { inviteId } }: any) {
    try {
        const response = yield call(rejectInvite, inviteId);
        yield put(inviteApiResponseSuccess(InvitationsTypes.DECLINE_INVITATION, response.data));
    } catch (error) {
        yield put(inviteApiResponseError(InvitationsTypes.DECLINE_INVITATION, error));
    }
}

export function* watchGetInvites() {
    yield takeEvery(InvitationsTypes.GET_INVITATIONS, getInvitataions)
}

export function* watchAcceptInvite() {
    yield takeEvery(InvitationsTypes.ACCEPT_INVITATION, acceptInvite)
}

export function* watchDeclineInvite() {
    yield takeEvery(InvitationsTypes.DECLINE_INVITATION, declineInvite)
}


function* invitesSaga() {
    yield all([
        fork(watchGetInvites),
        fork(watchAcceptInvite),
        fork(watchDeclineInvite),
    ]);
}

export default invitesSaga;