import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getMarketPlaces as getMarketPlacesApi, getMarketPlace as getMarketPlaceApi, connectMarketPlace, disConnectMarketPlace } from "../../api/index";

import { marketPlacesApiResponseSuccess, marketPlacesApiResponseError } from "./actions";
import { MarketPlacesTypes } from './constants';


/**
 * get all
 */
function* getMarkets({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getMarketPlacesApi, companyId, filters);
        yield put(marketPlacesApiResponseSuccess(MarketPlacesTypes.GET_MARKETPLACES, response.data));
    } catch (error) {
        yield put(marketPlacesApiResponseError(MarketPlacesTypes.GET_MARKETPLACES, error));
    }
}


function* getMarket({ payload: { companyId, marketId } }: any) {
    try {
        const response = yield call(getMarketPlaceApi, companyId, marketId);
        yield put(marketPlacesApiResponseSuccess(MarketPlacesTypes.GET_MARKETPLACE, response.data));
    } catch (error) {
        yield put(marketPlacesApiResponseError(MarketPlacesTypes.GET_MARKETPLACE, error));
    }
}

function* connectMarket({ payload: { companyId, marketId } }: any) {
    try {
        const response = yield call(connectMarketPlace, companyId, marketId);
        yield put(marketPlacesApiResponseSuccess(MarketPlacesTypes.CONNECT_MARKETPLACE, response.data));
    } catch (error) {
        yield put(marketPlacesApiResponseError(MarketPlacesTypes.CONNECT_MARKETPLACE, error));
    }
}

function* disConnectMarket({ payload: { companyId, marketId } }: any) {
    try {
        const response = yield call(disConnectMarketPlace, companyId, marketId);
        yield put(marketPlacesApiResponseSuccess(MarketPlacesTypes.DISCONNECT_MARKETPLACE, response.data));
    } catch (error) {
        yield put(marketPlacesApiResponseError(MarketPlacesTypes.DISCONNECT_MARKETPLACE, error));
    }
}

export function* watchGetMarkets() {
    yield takeEvery(MarketPlacesTypes.GET_MARKETPLACES, getMarkets)
}

export function* watchGetMarket() {
    yield takeEvery(MarketPlacesTypes.GET_MARKETPLACE, getMarket)
}

export function* watchConnectMarket() {
    yield takeEvery(MarketPlacesTypes.CONNECT_MARKETPLACE, connectMarket)
}

export function* watchDisConnectMarket() {
    yield takeEvery(MarketPlacesTypes.DISCONNECT_MARKETPLACE, disConnectMarket)
}

function* marketsSaga() {
    yield all([
        fork(watchGetMarkets),
        fork(watchGetMarket),
        fork(watchConnectMarket),
        fork(watchDisConnectMarket)
    ]);
}

export default marketsSaga;