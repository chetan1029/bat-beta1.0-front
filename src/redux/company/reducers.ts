import { combineReducers } from 'redux';
import PaymentTerms from "./paymentTerms/reducers";
import Common from "./common/reducers";
import Members from "./members/reducers";
import Vendors from "./vendors/reducers";

export default combineReducers({
    PaymentTerms,
    Members,
    Vendors,
    Common
});