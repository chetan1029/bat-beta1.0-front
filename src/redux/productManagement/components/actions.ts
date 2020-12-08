import { ComponentsTypes } from './constants';


// common success
export const componentsApiResponseSuccess = (actionType: string, data: any) => ({
    type: ComponentsTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const componentsApiResponseError = (actionType: string, error: string) => ({
    type: ComponentsTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getComponents = (companyId: string | number, filters?: any) => ({
    type: ComponentsTypes.GET_COMPONENTS,
    payload: { companyId, filters }
});

export const createComponent = (companyId: string | number, data: any) => ({
    type: ComponentsTypes.CREATE_COMPONENT,
    payload: { companyId, data }
});

export const editComponent = (companyId: string | number, memberId: number | string, data: any) => ({
    type: ComponentsTypes.EDIT_COMPONENT,
    payload: { companyId, memberId, data }
});

export const deleteComponent = (companyId: string | number, memberId: number | string) => ({
    type: ComponentsTypes.DELETE_COMPONENT,
    payload: { companyId, memberId }
});

export const getComponentDetails = (companyId: string | number, memberId: number | string) => ({
    type: ComponentsTypes.GET_COMPONENT,
    payload: { companyId, memberId }
});

export const resetComponents = () => ({
    type: ComponentsTypes.RESET,
});
