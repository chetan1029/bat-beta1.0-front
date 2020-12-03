import { MembersTypes } from './constants';


// common success
export const membersApiResponseSuccess = (actionType: string, data: any) => ({
    type: MembersTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const membersApiResponseError = (actionType: string, error: string) => ({
    type: MembersTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getMembers = (companyId: string | number, filters?: any) => ({
    type: MembersTypes.GET_MEMBERS,
    payload: { companyId, filters }
});

export const createMember = (companyId: string | number, data: any) => ({
    type: MembersTypes.CREATE_MEMBER,
    payload: { companyId, data }
});

export const editMember = (companyId: string | number, memberId: number | string, data: any) => ({
    type: MembersTypes.EDIT_MEMBER,
    payload: { companyId, memberId, data }
});

export const deleteMember = (companyId: string | number, memberId: number | string) => ({
    type: MembersTypes.DELETE_MEMBER,
    payload: { companyId, memberId }
});

export const getMemberDetails = (companyId: string | number, memberId: number | string) => ({
    type: MembersTypes.GET_MEMBER,
    payload: { companyId, memberId }
});

export const resetMembers = () => ({
    type: MembersTypes.RESET,
});

export const getCompanyInvitations = (companyId: string | number, filters?: any) => ({
    type: MembersTypes.GET_INVITATIONS,
    payload: { companyId, filters }
});

export const resendCompanyInvite = (companyId: string | number, inviteId: number | string) => ({
    type: MembersTypes.RESEND_INVITE,
    payload: { companyId, inviteId }
});