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

export const getSalesChartData = (companyId: string | number, filters?: any) => ({
    type: DashboardTypes.GET_SALESCHART_DATA,
    payload: { companyId, filters }
});

export const getSessionChartData = (companyId: string | number, filters?: any) => ({
    type: DashboardTypes.GET_SESSIONCHART_DATA,
    payload: { companyId, filters }
});

export const getEmailChartData = (companyId: string | number, filters?: any) => ({
    type: DashboardTypes.GET_EMAILCHART_DATA,
    payload: { companyId, filters }
});

export const getKeywordTrackingData = (companyId: string | number, filters?: any) => ({
    type: DashboardTypes.GET_KEYWORDTRACKING_DATA,
    payload: { companyId, filters }
});

export const getProductKeywordData = (companyId: string | number, keywordId: string | number, filters?: any) => ({
    type: DashboardTypes.GET_PRODUCTKEYWORD_DATA,
    payload: { companyId, keywordId, filters }
});

export const resetDashboard = () => ({
    type: DashboardTypes.RESET
})
