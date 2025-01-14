import { ComponentsTypes } from './constants';

const INIT_STATE: any = {
    components: []
};


const Components = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ComponentsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ComponentsTypes.GET_COMPONENTS: {
                    return {
                        ...state,
                        components: action.payload.data,
                        isComponentsFetched: true,
                        loading: false,
                    }
                }
                case ComponentsTypes.GET_COMPONENT: {
                    return {
                        ...state,
                        component: action.payload.data,
                        loading: false,
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT: {
                    return {
                        ...state,
                        newComponent: action.payload.data,
                        isComponentCreated: true,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT: {
                    return {
                        ...state,
                        isComponentEdited: true,
                        loading: false
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT: {
                    return {
                        ...state,
                        isComponentDeleted: true,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT: {
                    return {
                        ...state,
                        isComponentArchived: true,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT: {
                    return {
                        ...state,
                        isComponentRestored: true,
                        loading: false
                    }
                }
                case ComponentsTypes.DISCONTINUE_COMPONENT: {
                    return {
                        ...state,
                        isComponentDiscontinued: true,
                        loading: false
                    }
                }
                case ComponentsTypes.GET_TAGS_TYPES: {
                    return {
                        ...state,
                        tagsAndTypes: action.payload.data,
                    }
                }
                case ComponentsTypes.GET_TYPES_ALL: {
                    return {
                        ...state,
                        typesAll: action.payload.data,
                    }
                }
                case ComponentsTypes.EXPORT_COMPONENT: {
                    return {
                        ...state,
                        isExported: true,
                        loading: false,
                    }
                }
                case ComponentsTypes.IMPORT_COMPONENT: {
                    return {
                        ...state,
                        isImported: true,
                        importLoading: false,
                    }
                }
                case ComponentsTypes.GET_VARIATION: {
                    return {
                        ...state,
                        variation: action.payload.data,
                        loading: false,
                    }
                }
                case ComponentsTypes.EDIT_VARIATION: {
                    return {
                        ...state,
                        isVariationEdited: true,
                        loading: false
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        newComponentPackingBox: action.payload.data,
                        isComponentPackingBoxCreated: true,
                        loading: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        componentsPackingBox: action.payload.data,
                        isComponentsPackingBoxFetched: true,
                        loading: false,
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        isComponentPackingBoxDeleted: true,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        isComponentPackingBoxArchived: true,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        isComponentPackingBoxRestored: true,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        isComponentPackingBoxEdited: true,
                        loading: false
                    }
                }

                case ComponentsTypes.CREATE_COMPONENT_ME: {
                    return {
                        ...state,
                        newComponentME: action.payload.data,
                        isComponentMECreated: true,
                        loading: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT_ME: {
                    return {
                        ...state,
                        componentsME: action.payload.data,
                        isComponentsMEFetched: true,
                        loading: false,
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT_ME: {
                    return {
                        ...state,
                        isComponentMEDeleted: true,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT_ME: {
                    return {
                        ...state,
                        isComponentMEArchived: true,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT_ME: {
                    return {
                        ...state,
                        isComponentMERestored: true,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT_ME: {
                    return {
                        ...state,
                        isComponentMEEdited: true,
                        loading: false
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        newComponentProducts: action.payload.data,
                        isComponentProductsCreated: true,
                        loading: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        componentsProducts: action.payload.data,
                        isComponentsProductsFetched: true,
                        loading: false,
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        isComponentProductsDeleted: true,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        isComponentProductsArchived: true,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        isComponentProductsRestored: true,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        isComponentProductsEdited: true,
                        loading: false
                    }
                }
                case ComponentsTypes.PERFORM_BULK: {
                    return {
                        ...state,
                        bulkActionResponse: action.payload.data,
                        isBulkActionPerformed: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case ComponentsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ComponentsTypes.GET_COMPONENTS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isComponentsFetched: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT: {
                    return {
                        ...state,
                        createComponentError: action.payload.error,
                        isComponentCreated: false,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT: {
                    return {
                        ...state,
                        editComponentError: action.payload.error,
                        isComponentEdited: false,
                        loading: false
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT: {
                    return {
                        ...state,
                        deleteComponentError: action.payload.error,
                        isComponentDeleted: false,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT: {
                    return {
                        ...state,
                        archiveComponentError: action.payload.error,
                        isComponentArchived: false,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT: {
                    return {
                        ...state,
                        restoreComponentError: action.payload.error,
                        isComponentRestored: false,
                        loading: false
                    }
                }
                case ComponentsTypes.DISCONTINUE_COMPONENT: {
                    return {
                        ...state,
                        discontinueComponentError: action.payload.error,
                        isComponentArchived: false,
                        loading: false
                    }
                }
                case ComponentsTypes.EXPORT_COMPONENT: {
                    return {
                        ...state,
                        exportComponentError: action.payload.error,
                        isExported: false,
                        loading: false,
                    }
                }
                case ComponentsTypes.IMPORT_COMPONENT: {
                    return {
                        ...state,
                        importComponentError: action.payload.error,
                        isImported: false,
                        importLoading: false,
                    }
                }
                case ComponentsTypes.GET_VARIATION: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_VARIATION: {
                    return {
                        ...state,
                        editVariationError: action.payload.error,
                        isVariationEdited: false,
                        loading: false
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        createComponentPackingBoxError: action.payload.error,
                        isComponentPackingBoxCreated: false,
                        loading: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        getComponentPackingBoxError: action.payload.error,
                        isComponentsPackingBoxFetched: false
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        deleteComponentPackingBoxError: action.payload.error,
                        isComponentPackingBoxDeleted: false,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        archiveComponentPackingBoxError: action.payload.error,
                        isComponentPackingBoxArchived: false,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        restoreComponentPackingBoxError: action.payload.error,
                        isComponentPackingBoxRestored: false,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT_PACKING_BOX: {
                    return {
                        ...state,
                        editComponentPackingBoxError: action.payload.error,
                        isComponentPackingBoxEdited: false,
                        loading: false
                    }
                }

                case ComponentsTypes.CREATE_COMPONENT_ME: {
                    return {
                        ...state,
                        createComponentMEError: action.payload.error,
                        isComponentMECreated: false,
                        loading: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT_ME: {
                    return {
                        ...state,
                        getComponentMEError: action.payload.error,
                        isComponentsMEFetched: false
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT_ME: {
                    return {
                        ...state,
                        deleteComponentMEError: action.payload.error,
                        isComponentMEDeleted: false,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT_ME: {
                    return {
                        ...state,
                        archiveComponentMEError: action.payload.error,
                        isComponentMEArchived: false,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT_ME: {
                    return {
                        ...state,
                        restoreComponentMEError: action.payload.error,
                        isComponentMERestored: false,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT_ME: {
                    return {
                        ...state,
                        editComponentMEError: action.payload.error,
                        isComponentMEEdited: false,
                        loading: false
                    }
                }
                case ComponentsTypes.CREATE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        createComponentProductsError: action.payload.error,
                        isComponentProductsCreated: false,
                        loading: false
                    }
                }
                case ComponentsTypes.GET_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        getComponentProductsError: action.payload.error,
                        isComponentsProductsFetched: false
                    }
                }
                case ComponentsTypes.DELETE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        deleteComponentProductsError: action.payload.error,
                        isComponentProductsDeleted: false,
                        loading: false
                    }
                }
                case ComponentsTypes.ARCHIVE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        archiveComponentProductsError: action.payload.error,
                        isComponentProductsArchived: false,
                        loading: false
                    }
                }
                case ComponentsTypes.RESTORE_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        restoreComponentProductsError: action.payload.error,
                        isComponentProductsRestored: false,
                        loading: false
                    }
                }
                case ComponentsTypes.EDIT_COMPONENT_PRODUCTS: {
                    return {
                        ...state,
                        editComponentProductsError: action.payload.error,
                        isComponentProductsEdited: false,
                        loading: false
                    }
                }
                case ComponentsTypes.PERFORM_BULK: {
                    return {
                        ...state,
                        bulkActionError: action.payload.error,
                        isBulkActionPerformed: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case ComponentsTypes.GET_COMPONENTS:
            return { ...state, isComponentsFetched: false, loading: true };

        case ComponentsTypes.GET_COMPONENT:
            return { ...state, loading: true };

        case ComponentsTypes.CREATE_COMPONENT:
            return { ...state, isComponentCreated: false, loading: true };

        case ComponentsTypes.EDIT_COMPONENT:
            return { ...state, isComponentEdited: false, loading: true };

        case ComponentsTypes.DELETE_COMPONENT:
            return { ...state, isComponentDeleted: false, isComponentCreated: false, isComponentEdited: false, loading: true };

        case ComponentsTypes.ARCHIVE_COMPONENT:
            return { ...state, isComponentArchived: false, isComponentCreated: false, isComponentEdited: false, loading: true };

        case ComponentsTypes.RESTORE_COMPONENT:
            return { ...state, isComponentRestored: false, isComponentArchived: false, isComponentCreated: false, isComponentEdited: false, loading: true };

        case ComponentsTypes.DISCONTINUE_COMPONENT:
            return { ...state, isComponentDiscontinued: false, isComponentCreated: false, isComponentEdited: false, loading: true };

        case ComponentsTypes.IMPORT_COMPONENT:
            return { ...state, isImported: false, importLoading: true };

        case ComponentsTypes.EXPORT_COMPONENT:
            return { ...state, isExported: false, loading: true };

        case ComponentsTypes.GET_VARIATION:
            return { ...state, loading: true };

        case ComponentsTypes.EDIT_VARIATION:
            return { ...state, isVariationEdited: false, loading: true };

        case ComponentsTypes.CREATE_COMPONENT_PACKING_BOX:
            return { ...state, isComponentPackingBoxCreated: false, loading: true };

        case ComponentsTypes.GET_COMPONENT_PACKING_BOX:
            return { ...state, isComponentPackingBoxCreated: false, loading: true };

        case ComponentsTypes.DELETE_COMPONENT_PACKING_BOX:
            return { ...state, isComponentPackingBoxDeleted: false, isComponentCreated: false, isComponentEdited: false, loading: true };

        case ComponentsTypes.ARCHIVE_COMPONENT_PACKING_BOX:
            return { ...state, isComponentPackingBoxArchived: false, isComponentCreated: false, isComponentEdited: false, loading: true };

        case ComponentsTypes.RESTORE_COMPONENT_PACKING_BOX:
            return { ...state, isComponentPackingBoxRestored: false, isComponentArchived: false, isComponentCreated: false, isComponentEdited: false, loading: true };

        case ComponentsTypes.EDIT_COMPONENT_PACKING_BOX:
            return { ...state, isComponentPackingBoxEdited: false, loading: true };

        case ComponentsTypes.CREATE_COMPONENT_ME:
            return { ...state, isComponentMECreated: false, loading: true };

        case ComponentsTypes.GET_COMPONENT_ME:
            return { ...state, isComponentMECreated: false, isComponentMEDeleted: false, isComponentMEEdited: false, loading: true };

        case ComponentsTypes.DELETE_COMPONENT_ME:
            return { ...state, isComponentMEDeleted: false, isComponentMECreated: false, isComponentMEEdited: false, loading: true };

        case ComponentsTypes.ARCHIVE_COMPONENT_ME:
            return { ...state, isComponentMEArchived: false, isComponentMECreated: false, isComponentMEEdited: false, loading: true };

        case ComponentsTypes.RESTORE_COMPONENT_ME:
            return { ...state, isComponentMERestored: false, isComponentMEArchived: false, isComponentMECreated: false, isComponentMEEdited: false, loading: true };

        case ComponentsTypes.EDIT_COMPONENT_ME:
            return { ...state, isComponentMEEdited: false, loading: true };

        case ComponentsTypes.CREATE_COMPONENT_PRODUCTS:
            return { ...state, isComponentProductsCreated: false, loading: true };

        case ComponentsTypes.GET_COMPONENT_PRODUCTS:
            return { ...state, isComponentProductsCreated: false, isComponentProductsDeleted: false, isComponentProductsEdited: false, loading: true };

        case ComponentsTypes.DELETE_COMPONENT_PRODUCTS:
            return { ...state, isComponentProductsDeleted: false, isComponentProductsCreated: false, isComponentProductsEdited: false, loading: true };

        case ComponentsTypes.ARCHIVE_COMPONENT_PRODUCTS:
            return { ...state, isComponentProductsArchived: false, isComponentProductsCreated: false, isComponentProductsEdited: false, loading: true };

        case ComponentsTypes.RESTORE_COMPONENT_PRODUCTS:
            return { ...state, isComponentProductsRestored: false, isComponentProductsArchived: false, isComponentProductsCreated: false, isComponentProductsEdited: false, loading: true };

        case ComponentsTypes.EDIT_COMPONENT_PRODUCTS:
            return { ...state, isComponentProductsEdited: false, loading: true };

        case ComponentsTypes.RESET: {
            return {
                ...state,
                component: null,
                variation: null,
                createComponentError: null,
                createComponentPackingBoxError: null,
                editComponentError: null,
                editVariationError: null,
                archiveComponentError: null,
                exportComponentError: null,
                isComponentCreated: false,
                isComponentEdited: false,
                isComponentDeleted: false,
                isComponentArchived: false,
                isComponentDiscontinued: false,
                isExported: false,
                isVariationEdited: false,
                isComponentRestored: false,
                restoreComponentError: null,
                isComponentPackingBoxEdited: false,
                isComponentMECreated: false,
                isComponentMEEdited: false,
                isComponentProductsCreated: false,
                isComponentProductsEdited: false,
                isImported: false,
                isBulkActionPerformed: false
            }
        }
        case ComponentsTypes.RESET_COMPONENTS: {
            return {
                ...state,
                components: {}
            }
        }
        case ComponentsTypes.PERFORM_BULK: {
            return {
                ...state,
                isBulkActionPerformed: false,
                loading: true
            }
        }
        default: return { ...state };
    }
}

export default Components;
