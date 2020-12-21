import { CommonTypes } from './constants';

const INIT_STATE: any = {
    companies: []
};


const Common = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case CommonTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case CommonTypes.GET_COMPANIES: {
                    return {
                        ...state,
                        companies: action.payload.data,
                        isCompaniesFetched: true,
                        loading: false
                    }
                }
                case CommonTypes.GET_COMPANY: {
                    return {
                        ...state,
                        company: action.payload.data,
                        loading: false
                    }
                }
                case CommonTypes.CREATE_COMPANY: {
                    return {
                        ...state,
                        company: action.payload.data,
                        companyCreated: true,
                        loading: false
                    }
                }
                case CommonTypes.EDIT_COMPANY: {
                    return {
                        ...state,
                        company: action.payload.data,
                        companyEdited: true,
                        loading: false
                    }
                }
                case CommonTypes.GET_CATEGORIES: {
                    return {
                        ...state,
                        categories: action.payload.data,
                        isCategoriesFetched: true,
                        loading: false
                    }
                }
                case CommonTypes.GET_VENDOR_CATEGORIES: {
                    return {
                        ...state,
                        vendorCategories: action.payload.data,
                        isCategoriesFetched: true,
                        loading: false
                    }
                }
                case CommonTypes.GET_SALES_CATEGORIES: {
                    return {
                        ...state,
                        salesCategories: action.payload.data,
                        isCategoriesFetched: true,
                        loading: false
                    }
                }

                default:
                    return { ...state }
            }

        case CommonTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case CommonTypes.GET_COMPANIES: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isCompaniesFetched: false,
                        loading: false
                    }
                }
                case CommonTypes.GET_COMPANY: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                }
                case CommonTypes.CREATE_COMPANY: {
                    return {
                        ...state,
                        error: action.payload.error,
                        companyCreated: false,
                        loading: false
                    }
                }
                case CommonTypes.EDIT_COMPANY: {
                    return {
                        ...state,
                        error: action.payload.error,
                        companyEdited: false,
                        loading: false
                    }
                }
                case CommonTypes.GET_CATEGORIES: 
                case CommonTypes.GET_VENDOR_CATEGORIES:
                case CommonTypes.GET_SALES_CATEGORIES: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isCategoriesFetched: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case CommonTypes.GET_COMPANIES:
            return { ...state, isCompaniesFetched: false, loading: true };
        case CommonTypes.GET_COMPANY:
            return { ...state, loading: true };
        case CommonTypes.CREATE_COMPANY:
            return { ...state, loading: true, companyCreated: false };
        case CommonTypes.EDIT_COMPANY:
            return { ...state, loading: true, companyEdited: false };
        case CommonTypes.GET_CATEGORIES:
        case CommonTypes.GET_VENDOR_CATEGORIES:
        case CommonTypes.GET_SALES_CATEGORIES: 
            return { ...state, isCategoriesFetched: false, loading: true };

        default: return { ...state };
    }
}

export default Common;