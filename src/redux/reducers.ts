import { combineReducers } from 'redux';
import Auth from "./auth/reducers";
import Company from "./company/reducers";
import Common from "./common/reducers";
import Invite from "./invitations/reducers";

export default combineReducers({
    Auth,
    Company,
    Common,
    Invite
});