import { all } from 'redux-saga/effects';
import paymentTerms from "./paymentTerms/saga";
import commonSaga from "./common/saga";
import membersSaga from "./members/saga";
import vendorsSaga from "./vendors/saga";
import bank from "./bank/saga";
import tax from "./tax/saga";
import hscode from "./hscode/saga";
import location from "./location/saga";
import packingBox from "./packingBox/saga";
import deliveryTerms from "./deliveryTerms/saga";

export default function* companySaga() {
    yield all([
        paymentTerms(),
        commonSaga(),
        membersSaga(),
        vendorsSaga(),
        bank(),
        tax(),
        location(),
        packingBox(),
        hscode(),
        deliveryTerms(),
    ]);
}
