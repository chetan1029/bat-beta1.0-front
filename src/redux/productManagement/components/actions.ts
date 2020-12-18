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

export const createComponent = (companyId: string | number, data: any, images: any) => ({
    type: ComponentsTypes.CREATE_COMPONENT,
    payload: { companyId, data, images }
});

export const editComponent = (companyId: string | number, componentId: number | string, data: any) => ({
    type: ComponentsTypes.EDIT_COMPONENT,
    payload: { companyId, componentId, data }
});

export const deleteComponent = (companyId: string | number, componentId: number | string) => ({
    type: ComponentsTypes.DELETE_COMPONENT,
    payload: { companyId, componentId }
});

export const archiveComponent = (companyId: string | number, componentId: number | string, data: any, filters) => ({
    type: ComponentsTypes.ARCHIVE_COMPONENT,
    payload: { companyId, componentId, data, filters }
});

export const getComponentDetails = (companyId: string | number, componentId: number | string) => ({
    type: ComponentsTypes.GET_COMPONENT,
    payload: { companyId, componentId }
});

export const resetComponents = () => ({
    type: ComponentsTypes.RESET,
});
