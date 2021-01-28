import { VendorsTypes } from './constants';


// common success
export const vendorsApiResponseSuccess = (actionType: string, data: any) => ({
    type: VendorsTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const vendorsApiResponseError = (actionType: string, error: string) => ({
    type: VendorsTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getVendors = (companyId: string | number, filters?: any) => ({
    type: VendorsTypes.GET_VENDORS,
    payload: { companyId, filters }
});

export const getVendor = (companyId: string | number, vendorId: number | string) => ({
    type: VendorsTypes.GET_VENDOR,
    payload: { companyId, vendorId }
});

export const addVendor = (companyId: string | number, data: any) => ({
    type: VendorsTypes.ADD_VENDOR,
    payload: { companyId, data }
});

export const editVendor = (companyId: string | number, vendorId: number | string, data: any) => ({
    type: VendorsTypes.EDIT_VENDOR,
    payload: { companyId, vendorId, data }
});

export const resetVendors = () => ({
    type: VendorsTypes.RESET
})

export const inviteVendor = (companyId: string | number, data: any) => ({
    type: VendorsTypes.INVITE_VENDOR,
    payload: { companyId, data }
});

export const getVendorMembers = (companyId: string | number, filters?: any) => ({
    type: VendorsTypes.GET_VENDOR_MEMBERS,
    payload: { companyId, filters }
});
