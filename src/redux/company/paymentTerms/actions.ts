import { PaymentTermsTypes } from './constants';


// common success
export const paymentTermsApiResponseSuccess = (actionType: string, data: any) => ({
    type: PaymentTermsTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const paymentTermsApiResponseError = (actionType: string, error: string) => ({
    type: PaymentTermsTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getPaymentTerms = (companyId, filters?: any) => ({
    type: PaymentTermsTypes.GET_PAYMENT_TERMS,
    payload: { companyId, filters }
});


export const createPaymentTerm = (companyId, params: any) => ({
    type: PaymentTermsTypes.CREATE_PAYMENT_TERM,
    payload: { companyId, params }
});

export const editPaymentTerm = (companyId, paymentTermId, params: any) => ({
    type: PaymentTermsTypes.EDIT_PAYMENT_TERM,
    payload: { companyId, paymentTermId, params }
});

export const deletePaymentTerm = (companyId, paymentTermId) => ({
    type: PaymentTermsTypes.DELETE_PAYMENT_TERM,
    payload: { companyId, paymentTermId }
});

export const archivePaymentTerm = (companyId, paymentTermId) => ({
    type: PaymentTermsTypes.ARCHIVE_PAYMENT_TERM,
    payload: { companyId, paymentTermId }
});

export const restorePaymentTerm = (companyId, paymentTermId) => ({
    type: PaymentTermsTypes.RESTORE_PAYMENT_TERM,
    payload: { companyId, paymentTermId }
});

