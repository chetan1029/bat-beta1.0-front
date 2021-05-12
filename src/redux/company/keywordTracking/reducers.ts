import { KeywordTrackingTypes } from './constants';

const INIT_STATE: any = {
    products: [],
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
                default:
                    return { ...state }
            }

        case KeywordTrackingTypes.GET_KTPRODUCTS:
            return { ...state, isKtproductsFetched: false, loading: true };

        case KeywordTrackingTypes.GET_KTPRODUCT:
            return { ...state, loading: true };

        case KeywordTrackingTypes.GET_KEYWORDRANKS:
            return { ...state, isKeywordrankFetched: false, loading: true };

        case KeywordTrackingTypes.RESET: {
            return {
                ...state,
                isKtproductsFetched: false,
                isKeywordrankFetched: false,
                error: null,
                updateError: null
            }
        }
        default: return { ...state };
    }
}

export default KeywordTracking;
