import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    getDeliveryTerms as getDeliveryTermsByCompanyId,
} from "../../../api/index";

import { deliveryTermsApiResponseSuccess, deliveryTermsApiResponseError } from "./actions";
import { DeliveryTermsTypes } from './constants';


/**
 * get all payment terms
 */
function* getDeliveryTerms({ payload: { companyId, filters } }: any) {
    try {
        const response = yield call(getDeliveryTermsByCompanyId, companyId, filters);
        yield put(deliveryTermsApiResponseSuccess(DeliveryTermsTypes.GET_DELIVERY_TERMS, response.data));
    } catch (error) {
        yield put(deliveryTermsApiResponseError(DeliveryTermsTypes.GET_DELIVERY_TERMS, error));
    }
}


export function* watchGetPaymentTerms() {
    yield takeEvery(DeliveryTermsTypes.GET_DELIVERY_TERMS, getDeliveryTerms)
}

function* deliveryTermsSaga() {
    yield all([
        fork(watchGetPaymentTerms),
    ]);
}

export default deliveryTermsSaga;
