import { LocationTypes } from './constants';


// common success
export const locationApiResponseSuccess = (actionType: string, data: any) => ({
    type: LocationTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const locationApiResponseError = (actionType: string, error: string) => ({
    type: LocationTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getLocation = (companyId: string | number, filters?: any) => ({
    type: LocationTypes.GET_LOCATION,
    payload: { companyId, filters }
});


export const createLocation = (companyId: string | number, params: any) => ({
    type: LocationTypes.CREATE_LOCATION,
    payload: { companyId, params }
});

export const editLocation = (companyId: string | number, locationId, params: any) => ({
    type: LocationTypes.EDIT_LOCATION,
    payload: { companyId, locationId, params }
});

export const deleteLocation = (companyId: string | number, locationId) => ({
    type: LocationTypes.DELETE_LOCATION,
    payload: { companyId, locationId }
});

export const archiveLocation = (companyId: string | number, locationId) => ({
    type: LocationTypes.ARCHIVE_LOCATION,
    payload: { companyId, locationId }
});

export const restoreLocation = (companyId: string | number, locationId) => ({
    type: LocationTypes.RESTORE_LOCATION,
    payload: { companyId, locationId }
});

export const locationreset = () => ({
    type: LocationTypes.RESET,
});
