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

export const getMarketPlaces = (filters?: any) => ({
    type: MarketPlacesTypes.GET_MARKETPLACES,
    payload: { filters }
});

export const getMarketPlace = (marketId: string | number) => ({
    type: MarketPlacesTypes.GET_MARKETPLACE,
    payload: { marketId }
});
