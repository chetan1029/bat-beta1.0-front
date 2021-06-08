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

export const createCampaign = (companyId: string | number, params: any) => ({
    type: AutoEmailsTypes.CREATE_CAMPAIGN,
    payload: { companyId, params }
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

// Global templates
export const getGlobalTemplates = (filters?: any) => ({
    type: AutoEmailsTypes.GET_GLOBALTEMPLATES,
    payload: { filters }
});

export const getGlobalTemplate = (templateId: number | string) => ({
    type: AutoEmailsTypes.GET_GLOBALTEMPLATE,
    payload: { templateId }
});

// templates
export const getTemplates = (companyId: string | number, filters?: any) => ({
    type: AutoEmailsTypes.GET_TEMPLATES,
    payload: { companyId, filters }
});

export const getTemplate = (companyId: string | number, templateId: number | string) => ({
    type: AutoEmailsTypes.GET_TEMPLATE,
    payload: { companyId, templateId }
});

export const createTemplate = (companyId: string | number, params: any) => ({
    type: AutoEmailsTypes.CREATE_TEMPLATE,
    payload: { companyId, params }
});

export const editTemplate = (companyId: string | number, templateId, params: any) => ({
    type: AutoEmailsTypes.EDIT_TEMPLATE,
    payload: { companyId, templateId, params }
});

export const testTemplate = (companyId: string | number, templateId: number | string, data: any) => ({
    type: AutoEmailsTypes.TEST_TEMPLATE,
    payload: { companyId, templateId, data }
});

export const deleteTemplate = (companyId: string | number, templateId) => ({
    type: AutoEmailsTypes.DELETE_TEMPLATE,
    payload: { companyId, templateId }
});
