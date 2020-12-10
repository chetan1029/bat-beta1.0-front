import { all } from 'redux-saga/effects';
import paymentTerms from "./paymentTerms/saga";
import commonSaga from "./common/saga";
import membersSaga from "./members/saga";
import vendorsSaga from "./vendors/saga";
import bank from "./bank/saga";
import location from "./location/saga";
import packingBox from "./packingBox/saga";

export default function* companySaga() {
    yield all([
        paymentTerms(),
        commonSaga(),
        membersSaga(),
        vendorsSaga(),
        bank(),
        location(),
        packingBox(),
    ]);
}
