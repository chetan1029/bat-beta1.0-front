import { PaymentTermsTypes } from './constants';

import { APICore } from '../../../api/apiCore';

const api = new APICore();

const INIT_STATE: any = {
    paymentTerms: []
};


const PaymentTerms = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case PaymentTermsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case PaymentTermsTypes.GET_PAYMENT_TERMS: {
                    return {
                        ...state,
                        paymentTerms: action.payload.data,
                        isPaymentTermsFetched: true,
                    }
                }
                case PaymentTermsTypes.CREATE_PAYMENT_TERM: {
                    return {
                        ...state,
                        newPaymentTerm: action.payload.data,
                        isPaymentTermCreated: true,
                    }
                }
                case PaymentTermsTypes.EDIT_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermUpdated: true,
                    }
                }
                case PaymentTermsTypes.DELETE_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermDeleted: true,
                    }
                }
                case PaymentTermsTypes.ARCHIVE_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermArchived: true,
                    }
                }
                case PaymentTermsTypes.RESTORE_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermRestored: true,
                    }
                }
                default:
                    return { ...state }
            }

        case PaymentTermsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case PaymentTermsTypes.GET_PAYMENT_TERMS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPaymentTermsFetched: false,
                    }
                }
                case PaymentTermsTypes.CREATE_PAYMENT_TERM: {
                    return {
                        ...state,
                        createPaymentTermError: action.payload.error,
                        isPaymentTermCreated: false,
                    }
                }
                case PaymentTermsTypes.EDIT_PAYMENT_TERM: {
                    return {
                        ...state,
                        editPaymentTermError: action.payload.error,
                        isPaymentTermUpdated: false,
                    }
                }
                case PaymentTermsTypes.DELETE_PAYMENT_TERM: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPaymentTermDeleted: false,
                    }
                }
                case PaymentTermsTypes.ARCHIVE_PAYMENT_TERM: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPaymentTermArchived: false,
                    }
                }
                case PaymentTermsTypes.RESTORE_PAYMENT_TERM: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPaymentTermRestored: false,
                    }
                }
                default:
                    return { ...state }
            }
        case PaymentTermsTypes.GET_PAYMENT_TERMS:
            return { ...state, isPaymentTermsFetched: false };
        case PaymentTermsTypes.CREATE_PAYMENT_TERM:
            return { ...state, isPaymentTermCreated: false };
        case PaymentTermsTypes.EDIT_PAYMENT_TERM:
            return { ...state, isPaymentTermUpdated: false };
        case PaymentTermsTypes.DELETE_PAYMENT_TERM:
            return { ...state, isPaymentTermDeleted: false };
        case PaymentTermsTypes.ARCHIVE_PAYMENT_TERM: {
            return {
                ...state,
                isPaymentTermArchived: true,
            }
        }
        case PaymentTermsTypes.RESTORE_PAYMENT_TERM: {
            return {
                ...state,
                isPaymentTermRestored: true,
            }
        }
        default: return { ...state };
    }
}

export default PaymentTerms;