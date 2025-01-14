import { all } from 'redux-saga/effects';
import authSaga from "./auth/saga";
import companySaga from "./company/sagas";
import commonSaga from "./common/saga";
import invitationsSaga from "./invitations/saga";
import productManagementSaga from "./productManagement/sagas";
import marketPlacesSaga from "./marketPlaces/saga";
import dashboardSaga from "./dashboard/saga";


export default function* rootSaga() {
    yield all([
        authSaga(),
        companySaga(),
        commonSaga(),
        invitationsSaga(),
        productManagementSaga(),
        marketPlacesSaga(),
        dashboardSaga()
    ]);
}
