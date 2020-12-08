import { VendorsTypes } from './constants';

const INIT_STATE: any = {
    vendors: []
};


const Vendors = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case VendorsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case VendorsTypes.GET_VENDORS: {
                    return {
                        ...state,
                        vendors: action.payload.data,
                        isVendorsFetched: true,
                        loading: false,
                    }
                }
                case VendorsTypes.ADD_VENDOR: {
                    return {
                        ...state,
                        isVendorAdded: true,
                        loading: false,
                    }
                }
                case VendorsTypes.EDIT_VENDOR: {
                    return {
                        ...state,
                        isVendorEdited: true,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case VendorsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case VendorsTypes.GET_VENDORS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isVendorsFetched: false
                    }
                }
                case VendorsTypes.ADD_VENDOR: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isVendorAdded: false
                    }
                }
                case VendorsTypes.EDIT_VENDOR: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isVendorEdited: false
                    }
                }
                default:
                    return { ...state }
            }

        case VendorsTypes.GET_VENDORS:
            return { ...state, isVendorsFetched: false, loading: true };

        case VendorsTypes.ADD_VENDOR:
        case VendorsTypes.EDIT_VENDOR:
            return { ...state, isVendorAdded: false, isVendorEdited: false, loading: true };

        case VendorsTypes.RESET: {
            return {
                ...state,
                isVendorsFetched: false,
                isVendorAdded: false,
                isVendorEdited: false
            }
        }
        default: return { ...state };
    }
}

export default Vendors;