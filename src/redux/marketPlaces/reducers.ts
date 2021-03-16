import { MarketPlacesTypes } from './constants';

const INIT_STATE: any = {
    markets: []
};


const MarketPlaces = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case MarketPlacesTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case MarketPlacesTypes.GET_MARKETPLACES: {
                    return {
                        ...state,
                        markets: action.payload.data.results,
                        isMarketsFetched: true,
                        loading: false,
                    }
                }
                case MarketPlacesTypes.GET_MARKETPLACE: {
                    return {
                        ...state,
                        market: action.payload.data,
                    }
                }
                default:
                    return { ...state }
            }

        case MarketPlacesTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case MarketPlacesTypes.GET_MARKETPLACES: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isMarketsFetched: false
                    }
                }
                case MarketPlacesTypes.GET_MARKETPLACE: {
                    return {
                        ...state,
                        error: action.payload.error
                    }
                }
                default:
                    return { ...state }
            }

        case MarketPlacesTypes.GET_MARKETPLACES:
            return { ...state, isMarketsFetched: false, loading: true };

        default: return { ...state };
    }
}

export default MarketPlaces;