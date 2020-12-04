import { InvitationsTypes } from './constants';


// common success
export const inviteApiResponseSuccess = (actionType: string, data: any) => ({
    type: InvitationsTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const inviteApiResponseError = (actionType: string, error: string) => ({
    type: InvitationsTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getInvitations = (params?: any) => ({
    type: InvitationsTypes.GET_INVITATIONS,
    payload: { params }
});


export const acceptInvitation = (inviteId: string | number) => ({
    type: InvitationsTypes.ACCEPT_INVITATION,
    payload: { inviteId }
});


export const declineInvitation = (inviteId: string | number) => ({
    type: InvitationsTypes.DECLINE_INVITATION,
    payload: { inviteId }
});
