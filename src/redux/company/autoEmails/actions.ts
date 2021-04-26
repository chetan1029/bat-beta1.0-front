import { AutoEmailsTypes } from './constants';


// common success
export const autoEmailsApiResponseSuccess = (actionType: string, data: any) => ({
    type: AutoEmailsTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const autoEmailsApiResponseError = (actionType: string, error: string) => ({
    type: AutoEmailsTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getCampaigns = (companyId: string | number, filters?: any) => ({
    type: AutoEmailsTypes.GET_CAMPAIGNS,
    payload: { companyId, filters }
});

export const getCampaign = (companyId: string | number, campaignId: number | string) => ({
    type: AutoEmailsTypes.GET_CAMPAIGN,
    payload: { companyId, campaignId }
});

export const updateCampaign = (companyId: string | number, campaignId: number | string, data: any) => ({
    type: AutoEmailsTypes.UPDATE_CAMPAIGN,
    payload: { companyId, campaignId, data }
});

export const getEmailQueues = (companyId: string | number, filters?: any) => ({
    type: AutoEmailsTypes.GET_EMAILQUEUES,
    payload: { companyId, filters }
});

export const resetAutoEmails = () => ({
    type: AutoEmailsTypes.RESET
})

export const testCampaign = (companyId: string | number, campaignId: number | string, data: any) => ({
    type: AutoEmailsTypes.TEST_CAMPAIGN,
    payload: { companyId, campaignId, data }
});
