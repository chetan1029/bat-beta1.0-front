import { CommonTypes } from './constants';

import { APICore } from '../../../api/apiCore';

const api = new APICore();

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
                default:
                    return { ...state }
            }

        case CommonTypes.GET_COMPANIES:
            return { ...state, isCompaniesFetched: false };

        default: return { ...state };
    }
}

export default Common;