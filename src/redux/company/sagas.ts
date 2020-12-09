import { all } from 'redux-saga/effects';
import paymentTerms from "./paymentTerms/saga";
import commonSaga from "./common/saga";
import membersSaga from "./members/saga";
import bank from "./bank/saga";

export default function* companySaga() {
    yield all([
        paymentTerms(),
        commonSaga(),
        membersSaga(),
        bank(),
    ]);
}
