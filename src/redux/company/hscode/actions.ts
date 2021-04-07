import { HscodeTypes } from './constants';


// common success
export const hscodeApiResponseSuccess = (actionType: string, data: any) => ({
    type: HscodeTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const hscodeApiResponseError = (actionType: string, error: string) => ({
    type: HscodeTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getHscode = (companyId: string | number, filters?: any) => ({
    type: HscodeTypes.GET_HSCODE,
    payload: { companyId, filters }
});


export const createHscode = (companyId: string | number, params: any) => ({
    type: HscodeTypes.CREATE_HSCODE,
    payload: { companyId, params }
});

export const editHscode = (companyId: string | number, hscodeId, params: any) => ({
    type: HscodeTypes.EDIT_HSCODE,
    payload: { companyId, hscodeId, params }
});

export const deleteHscode = (companyId: string | number, hscodeId) => ({
    type: HscodeTypes.DELETE_HSCODE,
    payload: { companyId, hscodeId }
});

export const archiveHscode = (companyId: string | number, hscodeId) => ({
    type: HscodeTypes.ARCHIVE_HSCODE,
    payload: { companyId, hscodeId }
});

export const restoreHscode = (companyId: string | number, hscodeId) => ({
    type: HscodeTypes.RESTORE_HSCODE,
    payload: { companyId, hscodeId }
});

export const resetHscode = () => ({
    type: HscodeTypes.RESET,
});
