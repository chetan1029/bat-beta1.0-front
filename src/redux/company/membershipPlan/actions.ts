import { MembershipPlanTypes } from './constants';


// common success
export const membershipPlanApiResponseSuccess = (actionType: string, data: any) => ({
    type: MembershipPlanTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const membershipPlanApiResponseError = (actionType: string, error: string) => ({
    type: MembershipPlanTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getMembershipPlan = (companyId: string | number, filters?: any) => ({
    type: MembershipPlanTypes.GET_MEMBERSHIP_PLAN,
    payload: { companyId, filters }
});
