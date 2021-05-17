import { all } from 'redux-saga/effects';
import paymentTerms from "./paymentTerms/saga";
import commonSaga from "./common/saga";
import membersSaga from "./members/saga";
import vendorsSaga from "./vendors/saga";
import clientsSaga from "./clients/saga";
import salesChannelsSaga from "./salesChannels/saga";
import bank from "./bank/saga";
import tax from "./tax/saga";
import hscode from "./hscode/saga";
import location from "./location/saga";
import packingBox from "./packingBox/saga";
import deliveryTerms from "./deliveryTerms/saga";
import assetsSaga from "./assets/saga";
import membershipPlan from "./membershipPlan/saga";
import autoEmails from "./autoEmails/saga";
import amazonAccount from "./amazonCompany/saga";
import keywordTracking from "./keywordTracking/saga";


export default function* companySaga() {
    yield all([
        paymentTerms(),
        commonSaga(),
        membersSaga(),
        vendorsSaga(),
        clientsSaga(),
        salesChannelsSaga(),
        bank(),
        tax(),
        location(),
        packingBox(),
        hscode(),
        deliveryTerms(),
        assetsSaga(),
        membershipPlan(),
        autoEmails(),
        amazonAccount(),
        keywordTracking()
    ]);
}
