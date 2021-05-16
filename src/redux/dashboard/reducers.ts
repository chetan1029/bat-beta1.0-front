import { DashboardTypes } from './constants';

const INIT_STATE: any = {
    campaignDashboard: {},
    keywordTrackingDashboard: {}
};


const Dashboard = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case DashboardTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case DashboardTypes.GET_CAMPAIGN_DATA: {
                    return {
                        ...state,
                        campaignDashboard: action.payload.data,
                        loading: false,
                    }
                }
                case DashboardTypes.GET_KEYWORDTRACKING_DATA: {
                    return {
                        ...state,
                        keywordTrackingDashboard: action.payload.data,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case DashboardTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case DashboardTypes.GET_CAMPAIGN_DATA: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case DashboardTypes.GET_KEYWORDTRACKING_DATA: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                default:
                    return { ...state }
            }

        case DashboardTypes.GET_CAMPAIGN_DATA:
            return { ...state, loading: true };

        case DashboardTypes.GET_KEYWORDTRACKING_DATA:
            return { ...state, loading: true };

        default: return { ...state };
    }
}

export default Dashboard;
