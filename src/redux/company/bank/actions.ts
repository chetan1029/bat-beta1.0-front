import { BankTypes } from './constants';


// common success
export const bankApiResponseSuccess = (actionType: string, data: any) => ({
    type: BankTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const bankApiResponseError = (actionType: string, error: string) => ({
    type: BankTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getBank = (companyId: string | number, filters?: any) => ({
    type: BankTypes.GET_BANK,
    payload: { companyId, filters }
});


export const createBank = (companyId: string | number, params: any) => ({
    type: BankTypes.CREATE_BANK,
    payload: { companyId, params }
});

export const editBank = (companyId: string | number, bankId, params: any) => ({
    type: BankTypes.EDIT_BANK,
    payload: { companyId, bankId, params }
});

export const deleteBank = (companyId: string | number, bankId) => ({
    type: BankTypes.DELETE_BANK,
    payload: { companyId, bankId }
});

export const archiveBank = (companyId: string | number, bankId) => ({
    type: BankTypes.ARCHIVE_BANK,
    payload: { companyId, bankId }
});

export const restoreBank = (companyId: string | number, bankId) => ({
    type: BankTypes.RESTORE_BANK,
    payload: { companyId, bankId }
});

export const bankreset = () => ({
    type: BankTypes.RESET,
});
