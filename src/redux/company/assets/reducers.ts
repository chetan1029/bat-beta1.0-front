import { AssetType } from './constants';

const INIT_STATE: any = {
    assets: [],
    locations: [],
    assettypes: [],
};

const AssetsState = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case AssetType.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AssetType.GET_ASSETS: {
                    return {
                        ...state,
                        assets: action.payload.data,
                        isAssetsFetched: true,
                    }
                }
                case AssetType.GET_LOCATIONS:
                    return { ...state, locations: action.payload.data, isLocationFetched: false };

                case AssetType.GET_ASSET_TYPE:
                    return { ...state, assettypes: action.payload.data, isAssettypeFetched: false };

                case AssetType.CREATE_ASSET: {
                    return {
                        ...state,
                        newAsset: action.payload.data,
                        isAssetCreated: true,
                        loading: false
                    }
                }
                case AssetType.EDIT_ASSET: {
                    return {
                        ...state,
                        isAssetUpdated: true,
                        loading: false
                    }
                }
                case AssetType.DELETE_ASSET: {
                    return {
                        ...state,
                        isAssetDeleted: true,
                        loading: false
                    }
                }
                case AssetType.ARCHIVE_ASSET: {
                    return {
                        ...state,
                        isAssetArchived: true,
                        loading: false
                    }
                }
                case AssetType.RESTORE_ASSET: {
                    return {
                        ...state,
                        isAssetArchived: false,
                        isAssetRestored: true,
                        loading: false
                    }
                }
                case AssetType.TRANSFER_ASSET: {
                    return {
                        ...state,
                        isAssetTransferred: true,
                        transferAssetError: null,
                        loading: false
                    }
                }
                case AssetType.FETCH_ASSET_TRANSFERS: {
                    return {
                        ...state,
                        isTransferrsFetched: true,
                        loading: false,
                        assetTransferrs: action.payload.data.results
                    }
                }
                default:
                    return { ...state }
            }

        case AssetType.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AssetType.GET_ASSETS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isAssetsFetched: false,
                    }
                }
                case AssetType.GET_LOCATIONS:
                    return { ...state, error: action.payload.error, isLocationFetched: false };

                case AssetType.GET_ASSET_TYPE:
                    return { ...state, error: action.payload.error, isAssettypeFetched: false };

                case AssetType.CREATE_ASSET: {
                    return {
                        ...state,
                        createAssetError: action.payload.error,
                        isAssetCreated: false,
                        loading: false
                    }
                }
                case AssetType.EDIT_ASSET: {
                    return {
                        ...state,
                        editAssetError: action.payload.error,
                        isAssetUpdated: false,
                        loading: false
                    }
                }
                case AssetType.DELETE_ASSET: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isAssetDeleted: false,
                        loading: false
                    }
                }
                case AssetType.ARCHIVE_ASSET: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isAssetArchived: false,
                        loading: false
                    }
                }
                case AssetType.RESTORE_ASSET: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isAssetRestored: false,
                        loading: false
                    }
                }
                case AssetType.TRANSFER_ASSET: {
                    return {
                        ...state,
                        transferAssetError: action.payload.error,
                        isAssetTransferred: false,
                        loading: false
                    }
                }
                case AssetType.FETCH_ASSET_TRANSFERS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isTransferrsFetched: false,
                    }
                }
                default:
                    return { ...state }
            }

        case AssetType.GET_ASSETS:
            return { ...state, isAssetsFetched: false };

        case AssetType.GET_LOCATIONS:
            return { ...state, isLocationFetched: true };

        case AssetType.GET_ASSET_TYPE:
            return { ...state, isAssettypeFetched: true };

        case AssetType.CREATE_ASSET:
            return { ...state, isAssetCreated: false, loading: true, createAssetError: null };

        case AssetType.EDIT_ASSET:
            return {
                ...state,
                isAssetUpdated: false, isAssetCreated: false,
                isAssetDeleted: false, isAssetRestored: false, isAssetArchived: false,
                createAssetError: null, editAssetError: null, isAssetTransferred: false,
                loading: true
            };

        case AssetType.DELETE_ASSET:
            return {
                ...state, isAssetDeleted: false, loading: true,
                isAssetUpdated: false, isAssetCreated: false,
                isAssetRestored: false, isAssetArchived: false,
                createAssetError: null, isAssetTransferred: false
            };

        case AssetType.ARCHIVE_ASSET: {
            return {
                ...state,
                isAssetArchived: false, isAssetRestored: false,
                isAssetUpdated: false, isAssetCreated: false,
                isAssetDeleted: false, isAssetTransferred: false,
                createAssetError: null,
                loading: true
            }
        }
        case AssetType.RESTORE_ASSET: {
            return {
                ...state,
                isAssetRestored: false, isAssetArchived: false,
                isAssetUpdated: false, isAssetCreated: false,
                isAssetDeleted: false, loading: true, createAssetError: null,
                isAssetTransferred: false
            }
        }
        case AssetType.TRANSFER_ASSET: {
            return {
                ...state,
                isAssetRestored: false, isAssetArchived: false,
                isAssetUpdated: false, isAssetCreated: false,
                isAssetDeleted: false, loading: true, createAssetError: null,
                isAssetTransferred: false, transferAssetError: null
            }
        }
        case AssetType.FETCH_ASSET_TRANSFERS: {
            return {
                ...state,
                isTransferrsFetched: false,
                loading: true
            }
        }
        case AssetType.RESET: {
            return {
                ...state,
                createAssetError: null,
                editAssetError: null,
                isAssetCreated: false,
                isAssetDeleted: false,
                isAssetRestored: false,
                isAssetArchived: false,
                isAssetTransferred: false,
                transferAssetError: null
            }
        }
        default: return { ...state };
    }
}

export default AssetsState;
