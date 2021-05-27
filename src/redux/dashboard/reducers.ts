import { DashboardTypes } from './constants';

const INIT_STATE: any = {
    salesChartData: {},
    emailChartData: {},
    keywordTrackingData: {},
    productKeywordData: {}
};


const Dashboard = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case DashboardTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case DashboardTypes.GET_SALESCHART_DATA: {
                    return {
                        ...state,
                        salesChartData: action.payload.data,
                        loading: false,
                    }
                }
                case DashboardTypes.GET_EMAILCHART_DATA: {
                    return {
                        ...state,
                        emailChartData: action.payload.data,
                        loading: false,
                    }
                }
                case DashboardTypes.GET_KEYWORDTRACKING_DATA: {
                    return {
                        ...state,
                        keywordTrackingData: action.payload.data,
                        loading: false,
                    }
                }
                case DashboardTypes.GET_PRODUCTKEYWORD_DATA: {
                    return {
                        ...state,
                        productKeywordData: action.payload.data,
                        isProductKeywordChartFetched: true,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case DashboardTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case DashboardTypes.GET_SALESCHART_DATA: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case DashboardTypes.GET_EMAILCHART_DATA: {
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
                case DashboardTypes.GET_PRODUCTKEYWORD_DATA: {
                    return {
                        ...state,
                        loading: false,
                        isProductKeywordChartFetched: false,
                        error: action.payload.error,
                    }
                }
                default:
                    return { ...state }
            }

        case DashboardTypes.GET_SALESCHART_DATA:
            return { ...state, loading: true };

        case DashboardTypes.GET_EMAILCHART_DATA:
            return { ...state, loading: true };

        case DashboardTypes.GET_KEYWORDTRACKING_DATA:
            return { ...state, loading: true };

        case DashboardTypes.GET_PRODUCTKEYWORD_DATA:
            return { ...state, loading: true, isProductKeywordChartFetched: false };

        case DashboardTypes.RESET: {
            return {
                ...state,
                isProductKeywordChartFetched: false,
            }
        }

        default: return { ...state };
    }
}

export default Dashboard;
