import { SalesChannelsTypes } from './constants';


// common success
export const salesChannelsApiResponseSuccess = (actionType: string, data: any) => ({
    type: SalesChannelsTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const salesChannelsApiResponseError = (actionType: string, error: string) => ({
    type: SalesChannelsTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getSalesChannels = (companyId: string | number, filters?: any) => ({
    type: SalesChannelsTypes.GET_SALES_CHANNELS,
    payload: { companyId, filters }
});

export const getSalesChannel = (companyId: string | number, channelId: number | string) => ({
    type: SalesChannelsTypes.GET_SALES_CHANNEL,
    payload: { companyId, channelId }
});


export const resetSalesChannels = () => ({
    type: SalesChannelsTypes.RESET
})

export const inviteSalesChannel = (companyId: string | number, data: any) => ({
    type: SalesChannelsTypes.INVITE_SALES_CHANNEL,
    payload: { companyId, data }
});