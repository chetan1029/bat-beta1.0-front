import { PackingBoxTypes } from './constants';


// common success
export const packingBoxApiResponseSuccess = (actionType: string, data: any) => ({
    type: PackingBoxTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const packingBoxApiResponseError = (actionType: string, error: string) => ({
    type: PackingBoxTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getPackingBox = (companyId: string | number, filters?: any) => ({
    type: PackingBoxTypes.GET_PACKING_BOX,
    payload: { companyId, filters }
});


export const createPackingBox = (companyId: string | number, params: any) => ({
    type: PackingBoxTypes.CREATE_PACKING_BOX,
    payload: { companyId, params }
});

export const editPackingBox = (companyId: string | number, packingBoxId, params: any) => ({
    type: PackingBoxTypes.EDIT_PACKING_BOX,
    payload: { companyId, packingBoxId, params }
});

export const deletePackingBox = (companyId: string | number, packingBoxId) => ({
    type: PackingBoxTypes.DELETE_PACKING_BOX,
    payload: { companyId, packingBoxId }
});

export const archivePackingBox = (companyId: string | number, packingBoxId) => ({
    type: PackingBoxTypes.ARCHIVE_PACKING_BOX,
    payload: { companyId, packingBoxId }
});

export const restorePackingBox = (companyId: string | number, packingBoxId) => ({
    type: PackingBoxTypes.RESTORE_PACKING_BOX,
    payload: { companyId, packingBoxId }
});

export const resetPackingBox = () => ({
    type: PackingBoxTypes.RESET,
});
