import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getAssets as getAssetsByCompanyId,
    createAsset as addAsset,
    updateAsset,
    deleteAsset as deleteAssetApi,
    archiveAsset as archiveAssetApi,
    restoreAsset as restoreAssetApi,
    getLocations as getLocationsApi,
    getAssetType as getAssetTypeApi,
    transferAsset as transferAssetApi,
    getAssetTransferrs,
} from "../../../api/index";

import { assetsApiResponseSuccess, assetsApiResponseError } from "./actions";
import { AssetType } from './constants';


/**
 * get all assets
 */
function* getAssets({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getAssetsByCompanyId, companyId, filters);
        yield put(assetsApiResponseSuccess(AssetType.GET_ASSETS, response.data));
    } catch (error) {
        yield put(assetsApiResponseError(AssetType.GET_ASSETS, error));
    }
}

/**
 * get all Locations
 */
function* getLocations({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getLocationsApi, companyId, filters);
        yield put(assetsApiResponseSuccess(AssetType.GET_LOCATIONS, response.data));
    } catch (error) {
        yield put(assetsApiResponseError(AssetType.GET_LOCATIONS, error));
    }
}

/**
 * get all AssetType
 */
function* getAssetType({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getAssetTypeApi, companyId, filters);
        yield put(assetsApiResponseSuccess(AssetType.GET_ASSET_TYPE, response.data));
    } catch (error) {
        yield put(assetsApiResponseError(AssetType.GET_ASSET_TYPE, error));
    }
}

/*
create asset
*/
function* createAsset({ payload: { companyId, params } }: any) {
    try {
        const response = yield call(addAsset, companyId, params);
        yield put(assetsApiResponseSuccess(AssetType.CREATE_ASSET, response.data));

    } catch (error) {
        yield put(assetsApiResponseError(AssetType.CREATE_ASSET, error));
    }
}

/*
update asset
*/
function* editAsset({ payload: { companyId, assetId, params } }: any) {
    try {
        const response = yield call(updateAsset, companyId, assetId, params);
        yield put(assetsApiResponseSuccess(AssetType.EDIT_ASSET, response.data));
    } catch (error) {
        yield put(assetsApiResponseError(AssetType.EDIT_ASSET, error));
    }
}

/*
delete asset
*/
function* deleteAsset({ payload: { companyId, assetId } }: any) {
    try {
        const response = yield call(deleteAssetApi, companyId, assetId);
        yield put(assetsApiResponseSuccess(AssetType.DELETE_ASSET, response.data));

    } catch (error) {
        yield put(assetsApiResponseError(AssetType.DELETE_ASSET, error));
    }
}

/*
archive
*/
function* archiveAsset({ payload: { companyId, assetId, params } }: any) {
    try {
        const response = yield call(archiveAssetApi, companyId, assetId, params);
        yield put(assetsApiResponseSuccess(AssetType.ARCHIVE_ASSET, response.data));

    } catch (error) {
        yield put(assetsApiResponseError(AssetType.ARCHIVE_ASSET, error));
    }
}

/*
restore
*/
function* restoreAsset({ payload: { companyId, assetId, params } }: any) {
    try {
        const response = yield call(restoreAssetApi, companyId, assetId, params);
        yield put(assetsApiResponseSuccess(AssetType.RESTORE_ASSET, response.data));

    } catch (error) {
        yield put(assetsApiResponseError(AssetType.RESTORE_ASSET, error));
    }
}


/**
 * Transfer records
 * @param param0 
 */
function* fetchAssetTransferrs({ payload: { companyId, assetId } }: any) {
    try {
        const response = yield call(getAssetTransferrs, companyId, assetId);
        yield put(assetsApiResponseSuccess(AssetType.FETCH_ASSET_TRANSFERS, response.data));
    } catch (error) {
        yield put(assetsApiResponseError(AssetType.FETCH_ASSET_TRANSFERS, error));
    }
}

/**
 * Transfer
 * @param param0 
 */
function* transferAsset({ payload: { companyId, data } }: any) {
    try {
        const response = yield call(transferAssetApi, companyId, data);
        yield put(assetsApiResponseSuccess(AssetType.TRANSFER_ASSET, response.data));
    } catch (error) {
        yield put(assetsApiResponseError(AssetType.TRANSFER_ASSET, error));
    }
}


export function* watchGetAssets() {
    yield takeEvery(AssetType.GET_ASSETS, getAssets)
}

export function* watchGetLocations() {
    yield takeEvery(AssetType.GET_ASSETS, getLocations)
}

export function* watchGetAssetType() {
    yield takeEvery(AssetType.GET_ASSET_TYPE, getAssetType)
}

export function* watchAsset() {
    yield takeEvery(AssetType.CREATE_ASSET, createAsset)
}

export function* watchEditAsset() {
    yield takeEvery(AssetType.EDIT_ASSET, editAsset)
}

export function* watchDeleteAsset() {
    yield takeEvery(AssetType.DELETE_ASSET, deleteAsset)
}

export function* watchArchiveAsset() {
    yield takeEvery(AssetType.ARCHIVE_ASSET, archiveAsset)
}

export function* watchRestoreAsset() {
    yield takeEvery(AssetType.RESTORE_ASSET, restoreAsset)
}

export function* watchTransferAsset() {
    yield takeEvery(AssetType.TRANSFER_ASSET, transferAsset)
}

export function* watchAssetTransfers() {
    yield takeEvery(AssetType.FETCH_ASSET_TRANSFERS, fetchAssetTransferrs)
}

function* assetsSaga() {
    yield all([
        fork(watchGetAssets),
        fork(watchAsset),
        fork(watchEditAsset),
        fork(watchDeleteAsset),
        fork(watchArchiveAsset),
        fork(watchRestoreAsset),
        fork(watchGetLocations),
        fork(watchGetAssetType),
        fork(watchTransferAsset),
        fork(watchAssetTransfers)
    ]);
}

export default assetsSaga;
