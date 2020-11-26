import { AuthActionTypes } from './constants';

import { APICore } from '../../api/apiCore';

const api = new APICore();

const INIT_STATE: any = {
    user: api.getLoggedInUser(),
    loading: false
};


const Auth = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case AuthActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        user: action.payload.data,
                        userLoggedIn: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case AuthActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        userLoggedIn: false,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case AuthActionTypes.LOGIN_USER:
            return { ...state, loading: true, userLoggedIn: false, };

        default: return { ...state };
    }
}

export default Auth;