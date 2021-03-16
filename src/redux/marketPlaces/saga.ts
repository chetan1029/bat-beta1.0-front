import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { getMarketPlaces as getMarketPlacesApi, getMarketPlace as getMarketPlaceApi } from "../../api/index";

import { marketPlacesApiResponseSuccess, marketPlacesApiResponseError } from "./actions";
import { MarketPlacesTypes } from './constants';


/**
 * get all
 */
function* getMarkets({ payload: { filters } }: any) {
    try {
        const response = yield call(getMarketPlacesApi, filters);
        yield put(marketPlacesApiResponseSuccess(MarketPlacesTypes.GET_MARKETPLACES, response.data));
    } catch (error) {
        yield put(marketPlacesApiResponseError(MarketPlacesTypes.GET_MARKETPLACES, error));
    }
}


function* getMarket({ payload: { marketId } }: any) {
    try {
        const response = yield call(getMarketPlaceApi, marketId);
        yield put(marketPlacesApiResponseSuccess(MarketPlacesTypes.GET_MARKETPLACE, response.data));
    } catch (error) {
        yield put(marketPlacesApiResponseError(MarketPlacesTypes.GET_MARKETPLACE, error));
    }
}

export function* watchGetMarkets() {
    yield takeEvery(MarketPlacesTypes.GET_MARKETPLACES, getMarkets)
}

export function* watchGetMarket() {
    yield takeEvery(MarketPlacesTypes.GET_MARKETPLACE, getMarket)
}

function* marketsSaga() {
    yield all([
        fork(watchGetMarkets),
        fork(watchGetMarket)
    ]);
}

export default marketsSaga;