import { combineReducers } from 'redux';
import PaymentTerms from "./paymentTerms/reducers";
import Common from "./common/reducers";

export default combineReducers({
    PaymentTerms,
    Common
});