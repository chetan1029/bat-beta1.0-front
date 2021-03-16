import { AutoEmailsTypes } from './constants';

const INIT_STATE: any = {
    campaigns: []
};


const AutoEmails = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case AutoEmailsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AutoEmailsTypes.GET_CAMPAIGNS: {
                    return {
                        ...state,
                        campaigns: action.payload.data.results,
                        isCampaignsFetched: true,
                        loading: false,
                    }
                }
                case AutoEmailsTypes.GET_CAMPAIGN: {
                    return {
                        ...state,
                        campaign: action.payload.data,
                        loading: false,
                    }
                }
                case AutoEmailsTypes.UPDATE_CAMPAIGN: {
                    return {
                        ...state,
                        loading: false,
                        isCampaignUpdated: true,
                    }
                }
                default:
                    return { ...state }
            }

        case AutoEmailsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AutoEmailsTypes.GET_CAMPAIGNS: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isClientsFetched: false
                    }
                }
                case AutoEmailsTypes.GET_CAMPAIGN: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case AutoEmailsTypes.UPDATE_CAMPAIGN: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isCampaignUpdated: false,
                    }
                }
                default:
                    return { ...state }
            }

        case AutoEmailsTypes.GET_CAMPAIGNS:
            return { ...state, isCampaignsFetched: false, loading: true };

        case AutoEmailsTypes.GET_CAMPAIGN:
            return { ...state, loading: true };

        case AutoEmailsTypes.UPDATE_CAMPAIGN:
            return { ...state, loading: true, isCampaignUpdated: false };

        case AutoEmailsTypes.RESET: {
            return {
                ...state,
                isCampaignsFetched: false,
                isCampaignUpdated: false,
                error: null
            }
        }
        default: return { ...state };
    }
}

export default AutoEmails;