import { AmazonCompanyTypes } from './constants';

const INIT_STATE: any = {
    amazonCompany: []
};


const AmazonCompany = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case AmazonCompanyTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AmazonCompanyTypes.GET_AMAZON_COMPANY: {
                    return {
                        ...state,
                        amazonCompany: action.payload.data,
                        isCompanyFetched: true,
                        loading: false,
                    }
                }
                case AmazonCompanyTypes.UPDATE_AMAZON_COMPANY: {
                    return {
                        ...state,
                        loading: false,
                        isCompanyUpdated: true,
                    }
                }
                default:
                    return { ...state }
            }

        case AmazonCompanyTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AmazonCompanyTypes.GET_AMAZON_COMPANY: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isCompanyFetched: false
                    }
                }
                case AmazonCompanyTypes.UPDATE_AMAZON_COMPANY: {
                    return {
                        ...state,
                        loading: false,
                        isCompanyUpdated: false,
                        error: action.payload.error,
                    }
                }
                default:
                    return { ...state }
            }

        case AmazonCompanyTypes.GET_AMAZON_COMPANY:
            return { ...state, isCompanyFetched: false, loading: true };

        case AmazonCompanyTypes.UPDATE_AMAZON_COMPANY:
            return { ...state, loading: true, isCompanyUpdated: false };

        case AmazonCompanyTypes.RESET: {
            return {
                ...state,
                amazonCompany: {},
                isCompanyFetched: false,
                error: null,
                isCompanyUpdated: null
            }
        }
        default: return { ...state };
    }
}

export default AmazonCompany;