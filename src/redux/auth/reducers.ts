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
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        user: action.payload.data,
                        loading: false,
                        userSignUp: true,
                    }
                }
                case AuthActionTypes.LOGOUT_USER: {
                    return {
                        ...state,
                        user: null,
                        loading: false,
                        userLogout: true,
                    }
                }
                case AuthActionTypes.FORGOT_PASSWORD: {
                    return {
                        ...state,
                        loading: false,
                        passwordReset: true
                    }
                }
                case AuthActionTypes.FORGOT_PASSWORD_CHANGE:
                case AuthActionTypes.CHANGE_PASSWORD: {
                    return {
                        ...state,
                        loading: false,
                        passwordChange: true
                    }
                }

                case AuthActionTypes.UPDATE_PROFILE:
                case AuthActionTypes.UPDATE_PROFILE_PICTURE: {
                    api.setUserInSession(action.payload.data);
                    return {
                        ...state,
                        loading: false,
                        profileUpdated: true,
                        user: action.payload.data
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
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        userSignUp: false,
                        loading: false
                    }
                }
                case AuthActionTypes.FORGOT_PASSWORD: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        passwordReset: false
                    }
                }
                case AuthActionTypes.FORGOT_PASSWORD_CHANGE:
                case AuthActionTypes.CHANGE_PASSWORD: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        passwordChange: false
                    }
                }
                case AuthActionTypes.UPDATE_PROFILE:
                case AuthActionTypes.UPDATE_PROFILE_PICTURE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        profileUpdated: false
                    }
                }
                default:
                    return { ...state }
            }

        case AuthActionTypes.LOGIN_USER:
            return { ...state, loading: true, userLoggedIn: false, };
        case AuthActionTypes.LOGOUT_USER:
            return { ...state, loading: true, userLogout: false, };
        case AuthActionTypes.SIGNUP_USER:
            return { ...state, loading: true, userSignUp: false, };
        case AuthActionTypes.FORGOT_PASSWORD:
            return { ...state, loading: true, passwordReset: false, };
        case AuthActionTypes.FORGOT_PASSWORD_CHANGE:
        case AuthActionTypes.CHANGE_PASSWORD:
            return { ...state, loading: true, passwordChange: false, };
        case AuthActionTypes.UPDATE_PROFILE:
        case AuthActionTypes.UPDATE_PROFILE_PICTURE: {
            return { ...state, loading: true, profileUpdated: false, };
        }
        case AuthActionTypes.RESET:
            return { ...state, loading: false, profileUpdated: false, error: false, userSignUp: false, userLoggedIn: false, passwordChange: false };
        default: return { ...state };
    }
}

export default Auth;