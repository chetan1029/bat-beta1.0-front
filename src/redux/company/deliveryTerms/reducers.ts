import { DeliveryTermsTypes } from './constants';

const INIT_STATE: any = {
    deliveryTerms: []
};


const DeliveryTerms = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case DeliveryTermsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case DeliveryTermsTypes.GET_DELIVERY_TERMS: {
                    return {
                        ...state,
                        deliveryTerms: action.payload.data,
                        isDeliveryTermsFetched: true,
                    }
                }
                default:
                    return { ...state }
            }

        case DeliveryTermsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case DeliveryTermsTypes.GET_DELIVERY_TERMS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isDeliveryTermsFetched: false,
                    }
                }
                default:
                    return { ...state }
            }
        case DeliveryTermsTypes.GET_DELIVERY_TERMS:
            return { ...state, isDeliveryTermsFetched: false };
        default: return { ...state };
    }
}

export default DeliveryTerms;
