import { DeliveryTermsTypes } from './constants';


// common success
export const deliveryTermsApiResponseSuccess = (actionType: string, data: any) => ({
    type: DeliveryTermsTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const deliveryTermsApiResponseError = (actionType: string, error: string) => ({
    type: DeliveryTermsTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getDeliveryTerms = (companyId: string | number, filters?: any) => ({
    type: DeliveryTermsTypes.GET_DELIVERY_TERMS,
    payload: { companyId, filters }
});
