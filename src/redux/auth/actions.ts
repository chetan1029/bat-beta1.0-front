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

export const signupUser = (data: any) => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { data }
});

export const forgotPassword = (data: any) => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { data }
});

export const forgotPasswordChange = (data: any) => ({
    type: AuthActionTypes.FORGOT_PASSWORD_CHANGE,
    payload: { data }
});

export const updateProfile = (username: string, data: any) => ({
    type: AuthActionTypes.UPDATE_PROFILE,
    payload: { username, data }
});

export const updateProfilePicture = (username: string, profile_pic: any) => ({
    type: AuthActionTypes.UPDATE_PROFILE_PICTURE,
    payload: { username, profile_pic }
});