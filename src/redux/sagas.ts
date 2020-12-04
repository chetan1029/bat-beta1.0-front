import { all } from 'redux-saga/effects';
import authSaga from "./auth/saga";
import companySaga from "./company/sagas";
import commonSaga from "./common/saga";
import invitationsSaga from "./invitations/saga";


export default function* rootSaga() {
    yield all([
        authSaga(),
        companySaga(),
        commonSaga(),
        invitationsSaga()
    ]);
}
