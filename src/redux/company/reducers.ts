import { combineReducers } from 'redux';
import PaymentTerms from "./paymentTerms/reducers";
import Common from "./common/reducers";
import Members from "./members/reducers";

export default combineReducers({
    PaymentTerms,
    Members,
    Common
});