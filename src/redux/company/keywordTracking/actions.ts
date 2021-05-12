import { KeywordTrackingTypes } from './constants';


// common success
export const keywordTrackingApiResponseSuccess = (actionType: string, data: any) => ({
    type: KeywordTrackingTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const keywordTrackingApiResponseError = (actionType: string, error: string) => ({
    type: KeywordTrackingTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getKtproducts = (companyId: string | number, filters?: any) => ({
    type: KeywordTrackingTypes.GET_KTPRODUCTS,
    payload: { companyId, filters }
});

export const getKtproduct = (companyId: string | number, productId: number | string) => ({
    type: KeywordTrackingTypes.GET_KTPRODUCT,
    payload: { companyId, productId }
});

export const getKeywordranks = (companyId: string | number, filters?: any) => ({
    type: KeywordTrackingTypes.GET_KEYWORDRANKS,
    payload: { companyId, filters }
});

export const resetkeywordTracking = () => ({
    type: KeywordTrackingTypes.RESET
})
