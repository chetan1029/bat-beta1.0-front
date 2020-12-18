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

export const getCompany = (companyId: string | number) => ({
    type: CommonTypes.GET_COMPANY,
    payload: companyId
});

export const createCompany = (data: any) => ({
    type: CommonTypes.CREATE_COMPANY,
    payload: data
});

export const editCompany = (companyId: string | number, data: any) => ({
    type: CommonTypes.EDIT_COMPANY,
    payload: { companyId, data }
});

export const getCompanyCategories = (companyId: string | number, filters?: any) => ({
    type: CommonTypes.GET_CATEGORIES,
    payload: { companyId, filters }
});