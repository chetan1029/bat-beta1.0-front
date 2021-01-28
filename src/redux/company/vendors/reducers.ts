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
                case VendorsTypes.GET_VENDOR: {
                    return {
                        ...state,
                        vendor: action.payload.data,
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
                case VendorsTypes.INVITE_VENDOR: {
                    return {
                        ...state,
                        isVendorInvited: true,
                        loading: false,
                    }
                }
                case VendorsTypes.GET_VENDOR_MEMBERS: {
                    return {
                        ...state,
                        vendormembers: action.payload.data,
                        isVendorMembersFetched: true,
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
                        loading: false,
                        error: action.payload.error,
                        isVendorsFetched: false
                    }
                }
                case VendorsTypes.GET_VENDOR: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                }
                case VendorsTypes.ADD_VENDOR: {
                    return {
                        ...state,
                        loading: false,
                        createVendorError: action.payload.error,
                        isVendorAdded: false
                    }
                }
                case VendorsTypes.EDIT_VENDOR: {
                    return {
                        ...state,
                        loading: false,
                        editVendorError: action.payload.error,
                        isVendorEdited: false
                    }
                }
                case VendorsTypes.INVITE_VENDOR: {
                    return {
                        ...state,
                        inviteVendorError: action.payload.error,
                        isVendorInvited: false,
                        loading: false,
                    }
                }
                case VendorsTypes.GET_VENDOR_MEMBERS: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        isVendorMembersFetched: false
                    }
                }
                default:
                    return { ...state }
            }

        case VendorsTypes.GET_VENDORS:
            return { ...state, isVendorsFetched: false, loading: true };

        case VendorsTypes.GET_VENDOR:
            return { ...state, loading: true };

        case VendorsTypes.ADD_VENDOR:
        case VendorsTypes.EDIT_VENDOR:
        case VendorsTypes.INVITE_VENDOR:
            return { ...state, isVendorAdded: false, isVendorEdited: false, isVendorInvited: false, loading: true };

        case VendorsTypes.GET_VENDOR_MEMBERS:
            return { ...state, isVendorMembersFetched: false, loading: true };

        case VendorsTypes.RESET: {
            return {
                ...state,
                isVendorsFetched: false,
                isVendorAdded: false,
                isVendorEdited: false,
                createVendorError: null,
                editVendorError: null,
                isVendorInvited: false,
                inviteVendorError: null
            }
        }
        default: return { ...state };
    }
}

export default Vendors;
