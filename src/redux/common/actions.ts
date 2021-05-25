import { CommonTypes } from './constants';


// common success
export const commonApiResponseSuccess = (actionType: string, data: any) => ({
    type: CommonTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const commonApiResponseError = (actionType: string, error: string) => ({
    type: CommonTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getAllRoles = () => ({
    type: CommonTypes.GET_ROLES,
    payload: {}
});

export const getAllStatuses = (filters?: any) => ({
    type: CommonTypes.GET_STATUSES,
    payload: {filters}
});
