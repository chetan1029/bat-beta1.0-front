import { all } from 'redux-saga/effects';
import paymentTerms from "./paymentTerms/saga";
import commonSaga from "./common/saga";
import membersSaga from "./members/saga";

export default function* companySaga() {
    yield all([
        paymentTerms(),
        commonSaga(),
        membersSaga()
    ]);
}
