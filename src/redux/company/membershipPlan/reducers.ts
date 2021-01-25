import { MembershipPlanTypes } from './constants';

const INIT_STATE: any = {
    membershipPlan: []
};


const MembershipPlan = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case MembershipPlanTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case MembershipPlanTypes.GET_MEMBERSHIP_PLAN: {
                    return {
                        ...state,
                        membershipPlan: action.payload.data,
                        isMembershipPlanFetched: true,
                    }
                }
                default:
                    return { ...state }
            }

        case MembershipPlanTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case MembershipPlanTypes.GET_MEMBERSHIP_PLAN: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isMembershipPlanFetched: false,
                    }
                }
                default:
                    return { ...state }
            }
        case MembershipPlanTypes.GET_MEMBERSHIP_PLAN:
            return { ...state, isMembershipPlanFetched: false };
        default: return { ...state };
    }
}

export default MembershipPlan;
