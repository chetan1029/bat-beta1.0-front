import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getMembershipPlan as getMembershipPlanByCompanyId,
} from "../../../api/index";

import { membershipPlanApiResponseSuccess, membershipPlanApiResponseError } from "./actions";
import { MembershipPlanTypes } from './constants';


/**
 * get all payment terms
 */
function* getMembershipPlan({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getMembershipPlanByCompanyId, companyId, filters);
        yield put(membershipPlanApiResponseSuccess(MembershipPlanTypes.GET_MEMBERSHIP_PLAN, response.data));
    } catch (error) {
        yield put(membershipPlanApiResponseError(MembershipPlanTypes.GET_MEMBERSHIP_PLAN, error));
    }
}


export function* watchGetMembershipPlan() {
    yield takeEvery(MembershipPlanTypes.GET_MEMBERSHIP_PLAN, getMembershipPlan)
}

function* MembershipPlanSaga() {
    yield all([
        fork(watchGetMembershipPlan),
    ]);
}

export default MembershipPlanSaga;
