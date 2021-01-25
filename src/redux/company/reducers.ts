import { combineReducers } from 'redux';
import PaymentTerms from "./paymentTerms/reducers";
import Common from "./common/reducers";
import Members from "./members/reducers";
import Vendors from "./vendors/reducers";
import Clients from "./clients/reducers";
import SalesChannels from "./salesChannels/reducers";
import Bank from "./bank/reducers";
import Tax from "./tax/reducers";
import Hscode from "./hscode/reducers";
import Location from "./location/reducers";
import PackingBox from "./packingBox/reducers";
import DeliveryTerms from "./deliveryTerms/reducers";
import AssetsState from "./assets/reducers"
import MembershipPlan from "./membershipPlan/reducers"

export default combineReducers({
    PaymentTerms,
    Members,
    Vendors,
    Clients,
    SalesChannels,
    Common,
    Bank,
    Hscode,
    Location,
    PackingBox,
    Tax,
    DeliveryTerms,
    AssetsState,
    MembershipPlan
});
