import { all } from 'redux-saga/effects';
import authSaga from "./auth/saga";
import companySaga from "./company/sagas";


export default function* rootSaga() {
    yield all([
        authSaga(),
        companySaga()
    ]);
}
