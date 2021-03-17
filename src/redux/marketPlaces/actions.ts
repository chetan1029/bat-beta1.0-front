import { MarketPlacesTypes } from './constants';


// common success
export const marketPlacesApiResponseSuccess = (actionType: string, data: any) => ({
    type: MarketPlacesTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const marketPlacesApiResponseError = (actionType: string, error: string) => ({
    type: MarketPlacesTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getMarketPlaces = (companyId: string | number, filters?: any) => ({
    type: MarketPlacesTypes.GET_MARKETPLACES,
    payload: { companyId, filters }
});

export const getMarketPlace = (companyId: string | number, marketId: string | number) => ({
    type: MarketPlacesTypes.GET_MARKETPLACE,
    payload: { companyId, marketId }
});
