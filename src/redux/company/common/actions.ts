import { CommonTypes } from './constants';


// common success
export const companyCommonApiResponseSuccess = (actionType: string, data: any) => ({
    type: CommonTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const companyCommonApiResponseError = (actionType: string, error: string) => ({
    type: CommonTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getCompanies = (filters?: any) => ({
    type: CommonTypes.GET_COMPANIES,
    payload: filters
});


export const createCompany = (data: any) => ({
    type: CommonTypes.CREATE_COMPANY,
    payload: data
});