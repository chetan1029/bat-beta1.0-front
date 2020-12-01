import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getMembers, getMember, createMember, deleteMember, editMember
} from "../../../api/index";

import { membersApiResponseSuccess, membersApiResponseError } from "./actions";
import { MembersTypes } from './constants';


/**
 * get all members
 */
function* getAllMembers({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getMembers, companyId, filters);
        yield put(membersApiResponseSuccess(MembersTypes.GET_MEMBERS, response.data));
    } catch (error) {
        yield put(membersApiResponseError(MembersTypes.GET_MEMBERS, error));
    }
}


/**
 * get single member
 */
function* getMemberById({ payload: { companyId, memberId } }: any) {
    try {
        const response = yield call(getMember, companyId, memberId);
        yield put(membersApiResponseSuccess(MembersTypes.GET_MEMBER, response.data));
    } catch (error) {
        yield put(membersApiResponseError(MembersTypes.GET_MEMBER, error));
    }
}


/**
 * create new member
 */
function* createNewMember({ payload: { companyId, data } }: any) {
    try {
        const response = yield call(createMember, companyId, data);
        yield put(membersApiResponseSuccess(MembersTypes.CREATE_MEMBER, response.data));
    } catch (error) {
        yield put(membersApiResponseError(MembersTypes.CREATE_MEMBER, error));
    }
}

/**
 * edit the member
 * @param param0
 */
function* updateMember({ payload: { companyId, memberId, data } }: any) {
    try {
        const response = yield call(editMember, companyId, memberId, data);
        yield put(membersApiResponseSuccess(MembersTypes.EDIT_MEMBER, response.data));
    } catch (error) {
        yield put(membersApiResponseError(MembersTypes.EDIT_MEMBER, error));
    }
}

/**
 * delete member
 */
function* deleteMemberById({ payload: { companyId, memberId } }: any) {
    try {
        const response = yield call(deleteMember, companyId, memberId);
        yield put(membersApiResponseSuccess(MembersTypes.DELETE_MEMBER, response.data));
    } catch (error) {
        yield put(membersApiResponseError(MembersTypes.DELETE_MEMBER, error));
    }
}


export function* watchGetMembers() {
    yield takeEvery(MembersTypes.GET_MEMBERS, getAllMembers)
}

export function* watchGetMember() {
    yield takeEvery(MembersTypes.GET_MEMBER, getMemberById)
}

export function* watchAddMember() {
    yield takeEvery(MembersTypes.CREATE_MEMBER, createNewMember)
}

export function* watchEditMember() {
    yield takeEvery(MembersTypes.EDIT_MEMBER, updateMember)
}

export function* watchDeleteMember() {
    yield takeEvery(MembersTypes.DELETE_MEMBER, deleteMemberById)
}


function* membersSaga() {
    yield all([
        fork(watchGetMembers),
        fork(watchGetMember),
        fork(watchAddMember),
        fork(watchEditMember),
        fork(watchDeleteMember)
    ]);
}

export default membersSaga;