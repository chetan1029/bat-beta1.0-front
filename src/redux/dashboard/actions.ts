import { DashboardTypes } from './constants';


// common success
export const dashboardApiResponseSuccess = (actionType: string, data: any) => ({
    type: DashboardTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const dashboardApiResponseError = (actionType: string, error: string) => ({
    type: DashboardTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getCampaignDashboard = (companyId: string | number, filters?: any) => ({
    type: DashboardTypes.GET_CAMPAIGN_DATA,
    payload: { companyId, filters }
});

export const getKeywordTrackingDashboard = (companyId: string | number, filters?: any) => ({
    type: DashboardTypes.GET_KEYWORDTRACKING_DATA,
    payload: { companyId, filters }
});
