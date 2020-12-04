import { MembersTypes } from './constants';

const INIT_STATE: any = {
    members: []
};


const Members = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case MembersTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case MembersTypes.GET_MEMBERS: {
                    return {
                        ...state,
                        members: action.payload.data,
                        isMembersFetched: true,
                        loading: false,
                    }
                }
                case MembersTypes.GET_MEMBER: {
                    return {
                        ...state,
                        member: action.payload.data,
                    }
                }
                case MembersTypes.CREATE_MEMBER: {
                    return {
                        ...state,
                        newMember: action.payload.data,
                        isMemberCreated: true,
                        loading: false
                    }
                }
                case MembersTypes.EDIT_MEMBER: {
                    return {
                        ...state,
                        isMemberEdited: true,
                        loading: false
                    }
                }
                case MembersTypes.DELETE_MEMBER: {
                    return {
                        ...state,
                        isMemberDeleted: true,
                        loading: false
                    }
                }
                case MembersTypes.GET_INVITATIONS: {
                    return {
                        ...state,
                        invitations: action.payload.data,
                        isInvitationsFetched: true,
                        loading: false,
                    }
                }
                case MembersTypes.RESEND_INVITE: {
                    return {
                        ...state,
                        isInvitationResent: true,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case MembersTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case MembersTypes.GET_MEMBERS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isMembersFetched: false
                    }
                }
                case MembersTypes.GET_MEMBER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                }
                case MembersTypes.CREATE_MEMBER: {
                    return {
                        ...state,
                        createMemberError: action.payload.error,
                        isMemberCreated: false,
                        loading: false
                    }
                }
                case MembersTypes.EDIT_MEMBER: {
                    return {
                        ...state,
                        editMemberError: action.payload.error,
                        isMemberEdited: false,
                        loading: false
                    }
                }
                case MembersTypes.DELETE_MEMBER: {
                    return {
                        ...state,
                        deleteMemberError: action.payload.error,
                        isMemberDeleted: false,
                        loading: false
                    }
                }
                case MembersTypes.GET_INVITATIONS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isInvitationsFetched: false,
                        loading: false,
                    }
                }
                case MembersTypes.RESEND_INVITE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isInvitationResent: false,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case MembersTypes.GET_MEMBERS:
            return { ...state, isMembersFetched: false, loading: true };

        case MembersTypes.GET_INVITATIONS:
            return { ...state, isInvitationsFetched: false, loading: true };

        case MembersTypes.RESEND_INVITE:
            return { ...state, isInvitationResent: false, loading: true };


        case MembersTypes.CREATE_MEMBER:
            return { ...state, isMemberCreated: false, loading: true };

        case MembersTypes.EDIT_MEMBER:
            return { ...state, isMemberEdited: false, loading: true };

        case MembersTypes.DELETE_MEMBER:
            return { ...state, isMemberDeleted: false, isMemberCreated: false, isMemberEdited: false, loading: true };


        case MembersTypes.RESET: {
            return {
                ...state,
                editMemberError: null,
                isMemberCreated: false,
                isMemberEdited: false,
                isMemberDeleted: false
            }
        }
        default: return { ...state };
    }
}

export default Members;