import { AmazonCompanyTypes } from './constants';


// common success
export const amazonCompanyApiResponseSuccess = (actionType: string, data: any) => ({
    type: AmazonCompanyTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const amazonCompanyApiResponseError = (actionType: string, error: string) => ({
    type: AmazonCompanyTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getAmazonCompany = (companyId: string | number, id: string | number) => ({
    type: AmazonCompanyTypes.GET_AMAZON_COMPANY,
    payload: { companyId, id }
});

export const updateAmazonCompany = (companyId: string | number, id: number | string, data: any) => ({
    type: AmazonCompanyTypes.UPDATE_AMAZON_COMPANY,
    payload: { companyId, id, data }
});

export const resetAmazonCompany = () => ({
    type: AmazonCompanyTypes.RESET
});