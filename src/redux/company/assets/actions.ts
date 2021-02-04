import { AssetType } from './constants';

// common success
export const assetsApiResponseSuccess = (actionType: string, data: any) => ({
    type: AssetType.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const assetsApiResponseError = (actionType: string, error: string) => ({
    type: AssetType.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getAssets = (companyId: string | number, filters?: any) => ({
    type: AssetType.GET_ASSETS,
    payload: { companyId, filters }
});

export const getLocations = (companyId: string | number, filters?: any) => ({
    type: AssetType.GET_LOCATIONS,
    payload: { companyId, filters }
});

export const getAssetType = (companyId: string | number, filters?: any) => ({
    type: AssetType.GET_ASSET_TYPE,
    payload: { companyId, filters }
});

export const createAsset = (companyId: string | number, params: any) => ({
    type: AssetType.CREATE_ASSET,
    payload: { companyId, params }
});

export const editAsset = (companyId: string | number, assetId, params: any) => ({
    type: AssetType.EDIT_ASSET,
    payload: { companyId, assetId, params }
});

export const deleteAsset = (companyId: string | number, assetId) => ({
    type: AssetType.DELETE_ASSET,
    payload: { companyId, assetId }
});

export const archiveAsset = (companyId: string | number, assetId) => ({
    type: AssetType.ARCHIVE_ASSET,
    payload: { companyId, assetId }
});

export const restoreAsset = (companyId: string | number, assetId) => ({
    type: AssetType.RESTORE_ASSET,
    payload: { companyId, assetId }
});

export const resetAsset = () => ({
    type: AssetType.RESET,
});

export const transferAsset = (companyId: string | number, data: any) => ({
    type: AssetType.TRANSFER_ASSET,
    payload: { companyId, data }
});

export const fetchAssetTransfers = (companyId: string | number, assetId: string | number) => ({
    type: AssetType.FETCH_ASSET_TRANSFERS,
    payload: { companyId, assetId }
});