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

export const restoreComponent = (companyId: string | number, componentId: number | string, filters:any = {}) => ({
    type: ComponentsTypes.RESTORE_COMPONENT,
    payload: { companyId, componentId, filters }
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

// component packing box
export const createComponentPackingBox = (companyId: string | number, componentId: any, data: any) => ({
    type: ComponentsTypes.CREATE_COMPONENT_PACKING_BOX,
    payload: { companyId, componentId, data }
});

export const getComponentsPackingBox = (companyId: string | number, componentId: any, filters?: any) => ({
    type: ComponentsTypes.GET_COMPONENT_PACKING_BOX,
    payload: { companyId, componentId, filters }
});

export const archiveComponentPackingBox = (companyId: string | number, componentId: number | string,  id: any, data: any, filters) => ({
    type: ComponentsTypes.ARCHIVE_COMPONENT_PACKING_BOX,
    payload: { companyId, componentId, id, data, filters }
});

export const restoreComponentPackingBox = (companyId: string | number, componentId: number | string, id: any, data: any, filters) => ({
    type: ComponentsTypes.RESTORE_COMPONENT_PACKING_BOX,
    payload: { companyId, componentId, id, data, filters }
});

export const deleteComponentPackingBox = (companyId: string | number, componentId: number | string, id: any, filters) => ({
    type: ComponentsTypes.DELETE_COMPONENT_PACKING_BOX,
    payload: { companyId, componentId, id, filters }
});

export const editComponentPackingBox = (companyId: string | number, componentId: number | string, id: any, data: any) => ({
    type: ComponentsTypes.EDIT_COMPONENT_PACKING_BOX,
    payload: { companyId, componentId, id, data }
});

// component ME
export const createComponentME = (companyId: string | number, componentId: any, data: any) => ({
    type: ComponentsTypes.CREATE_COMPONENT_ME,
    payload: { companyId, componentId, data }
});

export const getComponentsME = (companyId: string | number, componentId: any, filters?: any) => ({
    type: ComponentsTypes.GET_COMPONENT_ME,
    payload: { companyId, componentId, filters }
});

export const archiveComponentME = (companyId: string | number, componentId: number | string,  id: any, data: any, filters) => ({
    type: ComponentsTypes.ARCHIVE_COMPONENT_ME,
    payload: { companyId, componentId, id, data, filters }
});

export const restoreComponentME = (companyId: string | number, componentId: number | string, id: any, data: any, filters) => ({
    type: ComponentsTypes.RESTORE_COMPONENT_ME,
    payload: { companyId, componentId, id, data, filters }
});

export const deleteComponentME = (companyId: string | number, componentId: number | string, id: any, files, filters) => ({
    type: ComponentsTypes.DELETE_COMPONENT_ME,
    payload: { companyId, componentId, id, files, filters }
});

export const editComponentME = (companyId: string | number, componentId: number | string, id: any, data: any) => ({
    type: ComponentsTypes.EDIT_COMPONENT_ME,
    payload: { companyId, componentId, id, data }
});
