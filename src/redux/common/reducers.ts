import { CommonTypes } from './constants';

const INIT_STATE: any = {
    roles: []
};


const Common = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case CommonTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case CommonTypes.GET_ROLES: {
                    return {
                        ...state,
                        roles: action.payload.data,
                        loading: false
                    }
                }

                default:
                    return { ...state }
            }

        case CommonTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case CommonTypes.GET_ROLES: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case CommonTypes.GET_ROLES:
            return { ...state, loading: true };
        default: return { ...state };
    }
}

export default Common;