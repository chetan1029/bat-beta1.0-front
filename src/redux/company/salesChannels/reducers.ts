import { SalesChannelsTypes } from './constants';

const INIT_STATE: any = {
    salesChannels: []
};


const SalesChannels = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case SalesChannelsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case SalesChannelsTypes.GET_SALES_CHANNELS: {
                    return {
                        ...state,
                        salesChannels: action.payload.data,
                        isChannelsFetched: true,
                        loading: false,
                    }
                }
                case SalesChannelsTypes.GET_SALES_CHANNEL: {
                    return {
                        ...state,
                        channel: action.payload.data,
                        loading: false,
                    }
                }
                case SalesChannelsTypes.INVITE_SALES_CHANNEL: {
                    return {
                        ...state,
                        isChannelsInvited: true,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case SalesChannelsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case SalesChannelsTypes.GET_SALES_CHANNELS: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isChannelsFetched: false
                    }
                }
                case SalesChannelsTypes.GET_SALES_CHANNEL: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case SalesChannelsTypes.INVITE_SALES_CHANNEL: {
                    return {
                        ...state,
                        inviteError: action.payload.error,
                        isChannelsInvited: false,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case SalesChannelsTypes.GET_SALES_CHANNELS:
            return { ...state, isChannelsFetched: false, loading: true };

        case SalesChannelsTypes.GET_SALES_CHANNEL:
            return { ...state, loading: true };

        case SalesChannelsTypes.INVITE_SALES_CHANNEL:
            return { ...state, isChannelsInvited: false, loading: true };

        case SalesChannelsTypes.RESET: {
            return {
                ...state,
                isChannelsFetched: false,
                isChannelsInvited: false,
                inviteError: null,
                error: null
            }
        }
        default: return { ...state };
    }
}

export default SalesChannels;