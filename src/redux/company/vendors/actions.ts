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


export const addVendor = (companyId: string | number, categoryId: number | string, data: any) => ({
    type: VendorsTypes.ADD_VENDOR,
    payload: { companyId, categoryId, data }
});

export const editVendor = (companyId: string | number, categoryId: number | string, data: any) => ({
    type: VendorsTypes.EDIT_VENDOR,
    payload: { companyId, categoryId, data }
});
