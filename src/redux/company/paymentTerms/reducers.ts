import { PaymentTermsTypes } from './constants';

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
                        loading: false
                    }
                }
                case PaymentTermsTypes.EDIT_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermUpdated: true,
                        loading: false
                    }
                }
                case PaymentTermsTypes.DELETE_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermDeleted: true,
                        loading: false
                    }
                }
                case PaymentTermsTypes.ARCHIVE_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermArchived: true,
                        loading: false
                    }
                }
                case PaymentTermsTypes.RESTORE_PAYMENT_TERM: {
                    return {
                        ...state,
                        isPaymentTermArchived: false,
                        isPaymentTermRestored: true,
                        loading: false
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
                        loading: false
                    }
                }
                case PaymentTermsTypes.EDIT_PAYMENT_TERM: {
                    return {
                        ...state,
                        editPaymentTermError: action.payload.error,
                        isPaymentTermUpdated: false,
                        loading: false
                    }
                }
                case PaymentTermsTypes.DELETE_PAYMENT_TERM: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPaymentTermDeleted: false,
                        loading: false
                    }
                }
                case PaymentTermsTypes.ARCHIVE_PAYMENT_TERM: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPaymentTermArchived: false,
                        loading: false
                    }
                }
                case PaymentTermsTypes.RESTORE_PAYMENT_TERM: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPaymentTermRestored: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }
        case PaymentTermsTypes.GET_PAYMENT_TERMS:
            return { ...state, isPaymentTermsFetched: false };
        case PaymentTermsTypes.CREATE_PAYMENT_TERM:
            return { ...state, isPaymentTermCreated: false, loading: true, createPaymentTermError: null };
        case PaymentTermsTypes.EDIT_PAYMENT_TERM:
            return {
                ...state, 
                isPaymentTermUpdated: false, isPaymentTermCreated: false,
                isPaymentTermDeleted: false, isPaymentTermRestored: false, isPaymentTermArchived: false,
                createPaymentTermError: null, editPaymentTermError: null,
                loading: true
            };
        case PaymentTermsTypes.DELETE_PAYMENT_TERM:
            return {
                ...state, isPaymentTermDeleted: false, loading: true,
                isPaymentTermUpdated: false, isPaymentTermCreated: false,
                isPaymentTermRestored: false, isPaymentTermArchived: false,
                createPaymentTermError: null
            };
        case PaymentTermsTypes.ARCHIVE_PAYMENT_TERM: {
            return {
                ...state,
                isPaymentTermArchived: false, isPaymentTermRestored: false,
                isPaymentTermUpdated: false, isPaymentTermCreated: false,
                isPaymentTermDeleted: false,
                createPaymentTermError: null,
                loading: true
            }
        }
        case PaymentTermsTypes.RESTORE_PAYMENT_TERM: {
            return {
                ...state,
                isPaymentTermRestored: false, isPaymentTermArchived: false,
                isPaymentTermUpdated: false, isPaymentTermCreated: false,
                isPaymentTermDeleted: false, loading: true, createPaymentTermError: null
            }
        }
        case PaymentTermsTypes.RESET: {
            return {
                ...state,
                createPaymentTermError: null,
                editPaymentTermError: null,
                isPaymentTermCreated: false,
                isPaymentTermDeleted: false,
                isPaymentTermRestored: false,
                isPaymentTermArchived: false,
            }
        }
        default: return { ...state };
    }
}

export default PaymentTerms;