import { AuthActionTypes } from './constants';


// common success
export const authApiResponseSuccess = (actionType: string, data: any) => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const authApiResponseError = (actionType: string, error: string) => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const loginUser = (username: string, password: string) => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { username, password }
});

export const logoutUser = () => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {}
});