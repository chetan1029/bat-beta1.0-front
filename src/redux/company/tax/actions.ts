import { TaxTypes } from './constants';


// common success
export const taxApiResponseSuccess = (actionType: string, data: any) => ({
    type: TaxTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const taxApiResponseError = (actionType: string, error: string) => ({
    type: TaxTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getTax = (companyId: string | number, filters?: any) => ({
    type: TaxTypes.GET_TAX,
    payload: { companyId, filters }
});


export const createTax = (companyId: string | number, params: any) => ({
    type: TaxTypes.CREATE_TAX,
    payload: { companyId, params }
});

export const editTax = (companyId: string | number, taxId, params: any) => ({
    type: TaxTypes.EDIT_TAX,
    payload: { companyId, taxId, params }
});

export const deleteTax = (companyId: string | number, taxId) => ({
    type: TaxTypes.DELETE_TAX,
    payload: { companyId, taxId }
});

export const archiveTax = (companyId: string | number, taxId) => ({
    type: TaxTypes.ARCHIVE_TAX,
    payload: { companyId, taxId }
});

export const restoreTax = (companyId: string | number, taxId) => ({
    type: TaxTypes.RESTORE_TAX,
    payload: { companyId, taxId }
});

export const resetTax = () => ({
    type: TaxTypes.RESET,
});
