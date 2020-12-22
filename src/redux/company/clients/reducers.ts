import { ClientTypes } from './constants';

const INIT_STATE: any = {
    clients: []
};


const Clients = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ClientTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ClientTypes.GET_CLIENTS: {
                    return {
                        ...state,
                        clients: action.payload.data,
                        isClientsFetched: true,
                        loading: false,
                    }
                }
                case ClientTypes.GET_CLIENT: {
                    return {
                        ...state,
                        client: action.payload.data,
                        loading: false,
                    }
                }
                case ClientTypes.ARCHIVE_CLIENT: {
                    return {
                        ...state,
                        loading: false,
                        isClientArchived: true,
                    }
                }
                default:
                    return { ...state }
            }

        case ClientTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ClientTypes.GET_CLIENTS: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isClientsFetched: false
                    }
                }
                case ClientTypes.GET_CLIENT: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case ClientTypes.ARCHIVE_CLIENT: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isClientArchived: false,
                    }
                }
                default:
                    return { ...state }
            }

        case ClientTypes.GET_CLIENTS:
            return { ...state, isClientsFetched: false, loading: true };

        case ClientTypes.GET_CLIENT:
            return { ...state, loading: true };

        case ClientTypes.ARCHIVE_CLIENT:
            return { ...state, loading: true, isClientArchived: false };

        case ClientTypes.RESET: {
            return {
                ...state,
                isClientsFetched: false,
                error: null
            }
        }
        default: return { ...state };
    }
}

export default Clients;