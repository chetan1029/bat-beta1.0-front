import { TaxTypes } from './constants';

const INIT_STATE: any = {
    taxs: []
};


const Tax = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case TaxTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case TaxTypes.GET_TAX: {
                    return {
                        ...state,
                        taxs: action.payload.data,
                        isTaxFetched: true,
                    }
                }
                case TaxTypes.CREATE_TAX: {
                    return {
                        ...state,
                        newTax: action.payload.data,
                        isTaxCreated: true,
                        loading: false
                    }
                }
                case TaxTypes.EDIT_TAX: {
                    return {
                        ...state,
                        isTaxUpdated: true,
                        loading: false
                    }
                }
                case TaxTypes.DELETE_TAX: {
                    return {
                        ...state,
                        isTaxDeleted: true,
                        loading: false
                    }
                }
                case TaxTypes.ARCHIVE_TAX: {
                    return {
                        ...state,
                        isTaxArchived: true,
                        loading: false
                    }
                }
                case TaxTypes.RESTORE_TAX: {
                    return {
                        ...state,
                        isTaxArchived: false,
                        isTaxRestored: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case TaxTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case TaxTypes.GET_TAX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isTaxFetched: false,
                    }
                }
                case TaxTypes.CREATE_TAX: {
                    return {
                        ...state,
                        createTaxError: action.payload.error,
                        isTaxCreated: false,
                        loading: false
                    }
                }
                case TaxTypes.EDIT_TAX: {
                    return {
                        ...state,
                        editTaxError: action.payload.error,
                        isTaxUpdated: false,
                        loading: false
                    }
                }
                case TaxTypes.DELETE_TAX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isTaxDeleted: false,
                        loading: false
                    }
                }
                case TaxTypes.ARCHIVE_TAX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isTaxArchived: false,
                        loading: false
                    }
                }
                case TaxTypes.RESTORE_TAX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isTaxRestored: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }
        case TaxTypes.GET_TAX:
            return { ...state, isTaxFetched: false };
        case TaxTypes.CREATE_TAX:
            return { ...state, isTaxCreated: false, loading: true, createTaxError: null };
        case TaxTypes.EDIT_TAX:
            return {
                ...state,
                isTaxUpdated: false, isTaxCreated: false,
                isTaxDeleted: false, isTaxRestored: false, isTaxArchived: false,
                createTaxError: null, editTaxError: null,
                loading: true
            };
        case TaxTypes.DELETE_TAX:
            return {
                ...state, isTaxDeleted: false, loading: true,
                isTaxUpdated: false, isTaxCreated: false,
                isTaxRestored: false, isTaxArchived: false,
                createTaxError: null
            };
        case TaxTypes.ARCHIVE_TAX: {
            return {
                ...state,
                isTaxArchived: false, isTaxRestored: false,
                isTaxUpdated: false, isTaxCreated: false,
                isTaxDeleted: false,
                createTaxError: null,
                loading: true
            }
        }
        case TaxTypes.RESTORE_TAX: {
            return {
                ...state,
                isTaxRestored: false, isTaxArchived: false,
                isTaxUpdated: false, isTaxCreated: false,
                isTaxDeleted: false,
                loading: true, createTaxError: null
            }
        }
        case TaxTypes.RESET: {
            return {
                ...state,
                createTaxError: null,
                editTaxError: null,
                isTaxCreated: false,
                isTaxDeleted: false,
                isTaxRestored: false,
                isTaxArchived: false,
            }
        }
        default: return { ...state };
    }
}

export default Tax;
