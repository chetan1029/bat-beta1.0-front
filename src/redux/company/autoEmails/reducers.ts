import { AutoEmailsTypes } from './constants';

const INIT_STATE: any = {
    campaigns: [],
    emailqueues: [],
    templates: [],
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
                case AutoEmailsTypes.TEST_CAMPAIGN: {
                    return {
                        ...state,
                        campaignTestSent: true,
                        campaignTestLoading: false,
                    }
                }
                case AutoEmailsTypes.UPDATE_CAMPAIGN: {
                    return {
                        ...state,
                        loading: false,
                        isCampaignUpdated: true,
                    }
                }
                case AutoEmailsTypes.GET_EMAILQUEUES: {
                    return {
                        ...state,
                        emailQueues: action.payload.data,
                        isEmailQueuesFetched: true,
                        loading: false,
                    }
                }
                case AutoEmailsTypes.GET_TEMPLATES: {
                    return {
                        ...state,
                        templates: action.payload.data.results,
                        isTemplatesFetched: true,
                        loading: false,
                    }
                }
                case AutoEmailsTypes.GET_TEMPLATE: {
                    return {
                        ...state,
                        template: action.payload.data,
                        loading: false,
                    }
                }
                case AutoEmailsTypes.CREATE_TEMPLATE: {
                    return {
                        ...state,
                        newAsset: action.payload.data,
                        isTemplateCreated: true,
                        loading: false
                    }
                }
                case AutoEmailsTypes.EDIT_TEMPLATE: {
                    return {
                        ...state,
                        isTemplateUpdated: true,
                        loading: false
                    }
                }
                case AutoEmailsTypes.DELETE_TEMPLATE: {
                    return {
                        ...state,
                        isTemplateDeleted: true,
                        loading: false
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
                case AutoEmailsTypes.TEST_CAMPAIGN: {
                    return {
                        ...state,
                        campaignTestLoading: false,
                        campaignTestSentError: action.payload.error,
                        campaignTestSent: false
                    }
                }
                case AutoEmailsTypes.UPDATE_CAMPAIGN: {
                    return {
                        ...state,
                        loading: false,
                        updateError: action.payload.error,
                        isCampaignUpdated: false,
                    }
                }
                case AutoEmailsTypes.GET_EMAILQUEUES: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isClientsFetched: false
                    }
                }
                case AutoEmailsTypes.GET_TEMPLATES: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isTemplatesFetched: false
                    }
                }
                case AutoEmailsTypes.GET_TEMPLATE: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case AutoEmailsTypes.CREATE_TEMPLATE: {
                    return {
                        ...state,
                        createAssetError: action.payload.error,
                        isTemplateCreated: false,
                        loading: false
                    }
                }
                case AutoEmailsTypes.EDIT_TEMPLATE: {
                    return {
                        ...state,
                        editAssetError: action.payload.error,
                        isTemplateUpdated: false,
                        loading: false
                    }
                }
                case AutoEmailsTypes.DELETE_TEMPLATE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isTemplateDeleted: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case AutoEmailsTypes.GET_CAMPAIGNS:
            return { ...state, isCampaignsFetched: false, loading: true };

        case AutoEmailsTypes.GET_CAMPAIGN:
            return { ...state, loading: true };

        case AutoEmailsTypes.TEST_CAMPAIGN:
            return { ...state, campaignTestLoading: true, campaignTestSent: false };

        case AutoEmailsTypes.UPDATE_CAMPAIGN:
            return { ...state, loading: true, isCampaignUpdated: false, updateError: null };

        case AutoEmailsTypes.GET_EMAILQUEUES:
            return { ...state, isEmailQueuesFetched: false, loading: true };

        case AutoEmailsTypes.GET_TEMPLATES:
            return { ...state, isTemplatesFetched: false, loading: true };

        case AutoEmailsTypes.GET_TEMPLATE:
            return { ...state, loading: true };

        case AutoEmailsTypes.CREATE_TEMPLATE:
            return { ...state, isTemplateCreated: false, loading: true, createTemplateError: null };

        case AutoEmailsTypes.EDIT_TEMPLATE:
            return {
                ...state,
                isTemplateUpdated: false, isTemplateCreated: false,
                isTemplateDeleted: false,
                createTemplateError: null, editTemplateError: null,
                loading: true
            };

        case AutoEmailsTypes.DELETE_TEMPLATE:
            return {
                ...state, isTemplateDeleted: false, loading: true
            };

        case AutoEmailsTypes.RESET: {
            return {
                ...state,
                isCampaignsFetched: false,
                isCampaignUpdated: false,
                isTemplatesFetched: false,
                isEmailQueuesFetched: false,
                error: null,
                campaignTestSentError: null,
                updateError: null,
                isTemplateCreated: false,
                isTemplateUpdated: false,
                isTemplateDeleted: false,
                createTemplateError: null,
                editTemplateError: null,
                template: null,
            }
        }
        default: return { ...state };
    }
}

export default AutoEmails;
