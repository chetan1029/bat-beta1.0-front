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

export const archiveComponent = (companyId: string | number, componentId: number | string, data: any, filters:any = {}) => ({
    type: ComponentsTypes.ARCHIVE_COMPONENT,
    payload: { companyId, componentId, data, filters }
});

export const discontinueComponent = (companyId: string | number, componentId: number | string, data: any, filters:any = {}) => ({
    type: ComponentsTypes.DISCONTINUE_COMPONENT,
    payload: { companyId, componentId, data, filters }
});

export const getComponentDetails = (companyId: string | number, componentId: number | string) => ({
    type: ComponentsTypes.GET_COMPONENT,
    payload: { companyId, componentId }
});

export const getTagsAndTypes = (companyId: string | number) => ({
    type: ComponentsTypes.GET_TAGS_TYPES,
    payload: { companyId }
});

export const exportComponent = (companyId: string | number, fileType: string, filters?: any) => ({
    type: ComponentsTypes.EXPORT_COMPONENT,
    payload: { companyId, fileType, filters }
});

export const resetComponents = () => ({
    type: ComponentsTypes.RESET,
});

export const getVariationDetails = (companyId: string | number, variationId: number | string) => ({
    type: ComponentsTypes.GET_VARIATION,
    payload: { companyId, variationId }
});

export const editVariation = (companyId: string | number, variationId: number | string, data: any, images: any) => ({
    type: ComponentsTypes.EDIT_VARIATION,
    payload: { companyId, variationId, data, images }
});
