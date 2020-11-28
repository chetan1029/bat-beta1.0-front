import { combineReducers } from 'redux';
import Auth from "./auth/reducers";
import Company from "./company/reducers";

export default combineReducers({
    Auth,
    Company
});