import { KeywordTrackingTypes } from './constants';

const INIT_STATE: any = {
    products: [],
    keywords: [],
    suggestedkeywords: [],
    asinperformance: [],
};


const KeywordTracking = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case KeywordTrackingTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case KeywordTrackingTypes.GET_KTPRODUCTS: {
                    return {
                        ...state,
                        products: action.payload.data.results,
                        isKtproductsFetched: true,
                        loading: false,
                    }
                }
                case KeywordTrackingTypes.CREATE_KEYWORDS: {
                    return {
                        ...state,
                        keywords: action.payload.data,
                        isKeywordsCreated: true,
                        loading: false
                    }
                }
                case KeywordTrackingTypes.GET_KTPRODUCT: {
                    return {
                        ...state,
                        product: action.payload.data,
                        loading: false,
                    }
                }
                case KeywordTrackingTypes.GET_KEYWORDRANKS: {
                    return {
                        ...state,
                        keywordranks: action.payload.data.results,
                        isKeywordrankFetched: true,
                        loading: false,
                    }
                }
                case KeywordTrackingTypes.SUGGEST_KEYWORDS: {
                    return {
                        ...state,
                        suggestedkeywords: action.payload.data,
                        suggestedKeywordLoading: false,
                    }
                }
                case KeywordTrackingTypes.PERFORM_BULK: {
                    return {
                        ...state,
                        bulkActionResponse: action.payload.data,
                        isBulkActionPerformed: true,
                        loading: false
                    }
                }
                case KeywordTrackingTypes.GET_ASINPERFORMANCE: {
                    return {
                        ...state,
                        asinperformance: action.payload.data,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case KeywordTrackingTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case KeywordTrackingTypes.GET_KTPRODUCTS: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isClientsFetched: false
                    }
                }
                case KeywordTrackingTypes.GET_KTPRODUCT: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case KeywordTrackingTypes.GET_KEYWORDRANKS: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isClientsFetched: false
                    }
                }
                case KeywordTrackingTypes.CREATE_KEYWORDS: {
                    return {
                        ...state,
                        createKeywordsError: action.payload.error,
                        isKeywordsCreated: false,
                        loading: false
                    }
                }
                case KeywordTrackingTypes.SUGGEST_KEYWORDS: {
                    return {
                        ...state,
                        suggestedKeywordLoading: false,
                        error: action.payload.error
                    }
                }
                case KeywordTrackingTypes.PERFORM_BULK: {
                    return {
                        ...state,
                        bulkActionError: action.payload.error,
                        isBulkActionPerformed: false,
                        loading: false
                    }
                }
                case KeywordTrackingTypes.GET_ASINPERFORMANCE: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                default:
                    return { ...state }
            }

        case KeywordTrackingTypes.GET_KTPRODUCTS:
            return { ...state, isKtproductsFetched: false, loading: true };

        case KeywordTrackingTypes.GET_KTPRODUCT:
            return { ...state, loading: true };

        case KeywordTrackingTypes.CREATE_KEYWORDS:
            return { ...state, isKeywordsCreated: false, loading: true, createKeywordsError: null };

        case KeywordTrackingTypes.GET_KEYWORDRANKS:
            return { ...state, isKeywordrankFetched: false, loading: true };

        case KeywordTrackingTypes.SUGGEST_KEYWORDS:
            return { ...state, suggestedKeywordLoading: true };

        case KeywordTrackingTypes.PERFORM_BULK: {
            return {
                ...state,
                isBulkActionPerformed: false,
                loading: true
            }
        }
        case KeywordTrackingTypes.GET_ASINPERFORMANCE:
            return { ...state, loading: true };

        case KeywordTrackingTypes.RESET: {
            return {
                ...state,
                isKtproductsFetched: false,
                isKeywordrankFetched: false,
                isKeywordsCreated: false,
                createKeywordsError: null,
                keywords: null,
                asinperformance: null,
                error: null,
                updateError: null,
                isBulkActionPerformed: false
            }
        }
        default: return { ...state };
    }
}

export default KeywordTracking;
