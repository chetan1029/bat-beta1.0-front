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
                default:
                    return { ...state }
            }

        case CommonTypes.GET_COMPANIES:
            return { ...state, isCompaniesFetched: false };
        case CommonTypes.CREATE_COMPANY:
            return { ...state, loading: true };

        default: return { ...state };
    }
}

export default Common;