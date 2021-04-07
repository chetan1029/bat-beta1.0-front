import { PackingBoxTypes } from './constants';

const INIT_STATE: any = {
    packingBox: []
};


const PackingBox = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case PackingBoxTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case PackingBoxTypes.GET_PACKING_BOX: {
                    return {
                        ...state,
                        packingBox: action.payload.data,
                        isPackingBoxFetched: true,
                    }
                }
                case PackingBoxTypes.CREATE_PACKING_BOX: {
                    return {
                        ...state,
                        newPackingBox: action.payload.data,
                        isPackingBoxCreated: true,
                        loading: false
                    }
                }
                case PackingBoxTypes.EDIT_PACKING_BOX: {
                    return {
                        ...state,
                        isPackingBoxUpdated: true,
                        loading: false
                    }
                }
                case PackingBoxTypes.DELETE_PACKING_BOX: {
                    return {
                        ...state,
                        isPackingBoxDeleted: true,
                        loading: false
                    }
                }
                case PackingBoxTypes.ARCHIVE_PACKING_BOX: {
                    return {
                        ...state,
                        isPackingBoxArchived: true,
                        loading: false
                    }
                }
                case PackingBoxTypes.RESTORE_PACKING_BOX: {
                    return {
                        ...state,
                        isPackingBoxArchived: false,
                        isPackingBoxRestored: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case PackingBoxTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case PackingBoxTypes.GET_PACKING_BOX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPackingBoxFetched: false,
                    }
                }
                case PackingBoxTypes.CREATE_PACKING_BOX: {
                    return {
                        ...state,
                        createPackingBoxError: action.payload.error,
                        isPackingBoxCreated: false,
                        loading: false
                    }
                }
                case PackingBoxTypes.EDIT_PACKING_BOX: {
                    return {
                        ...state,
                        editPackingBoxError: action.payload.error,
                        isPackingBoxUpdated: false,
                        loading: false
                    }
                }
                case PackingBoxTypes.DELETE_PACKING_BOX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPackingBoxDeleted: false,
                        loading: false
                    }
                }
                case PackingBoxTypes.ARCHIVE_PACKING_BOX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPackingBoxArchived: false,
                        loading: false
                    }
                }
                case PackingBoxTypes.RESTORE_PACKING_BOX: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isPackingBoxRestored: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }
        case PackingBoxTypes.GET_PACKING_BOX:
            return { ...state, isPackingBoxFetched: false };
        case PackingBoxTypes.CREATE_PACKING_BOX:
            return { ...state, isPackingBoxCreated: false, loading: true, createPackingBoxError: null };
        case PackingBoxTypes.EDIT_PACKING_BOX:
            return {
                ...state,
                isPackingBoxUpdated: false, isPackingBoxCreated: false,
                isPackingBoxDeleted: false, isPackingBoxRestored: false, isPackingBoxArchived: false,
                createPackingBoxError: null, editPackingBoxError: null,
                loading: true
            };
        case PackingBoxTypes.DELETE_PACKING_BOX:
            return {
                ...state, isPackingBoxDeleted: false, loading: true,
                isPackingBoxUpdated: false, isPackingBoxCreated: false,
                isPackingBoxRestored: false, isPackingBoxArchived: false,
                createPackingBoxError: null
            };
        case PackingBoxTypes.ARCHIVE_PACKING_BOX: {
            return {
                ...state,
                isPackingBoxArchived: false, isPackingBoxRestored: false,
                isPackingBoxUpdated: false, isPackingBoxCreated: false,
                isPackingBoxDeleted: false,
                createPackingBoxError: null,
                loading: true
            }
        }
        case PackingBoxTypes.RESTORE_PACKING_BOX: {
            return {
                ...state,
                isPackingBoxRestored: false, isPackingBoxArchived: false,
                isPackingBoxUpdated: false, isPackingBoxCreated: false,
                isPackingBoxDeleted: false,
                loading: true, createPackingBoxError: null
            }
        }
        case PackingBoxTypes.RESET: {
            return {
                ...state,
                createPackingBoxError: null,
                editPackingBoxError: null,
                isPackingBoxCreated: false,
                isPackingBoxDeleted: false,
                isPackingBoxRestored: false,
                isPackingBoxArchived: false,
            }
        }
        default: return { ...state };
    }
}

export default PackingBox;
