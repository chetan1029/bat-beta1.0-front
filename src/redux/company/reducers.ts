import { combineReducers } from 'redux';
import PaymentTerms from "./paymentTerms/reducers";
import Common from "./common/reducers";
import Members from "./members/reducers";
import Vendors from "./vendors/reducers";
import Bank from "./bank/reducers";
import Location from "./location/reducers";
import PackingBox from "./packingBox/reducers";

export default combineReducers({
    PaymentTerms,
    Members,
    Vendors,
    Common,
    Bank,
    Location,
    PackingBox,
});
