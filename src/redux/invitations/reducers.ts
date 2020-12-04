import { InvitationsTypes } from './constants';

const INIT_STATE: any = {
    invitations: null
};


const Invite = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case InvitationsTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case InvitationsTypes.GET_INVITATIONS: {
                    return {
                        ...state,
                        invitations: action.payload.data,
                        loading: false
                    }
                }
                case InvitationsTypes.ACCEPT_INVITATION: {
                    return {
                        ...state,
                        inviteAccepted: true,
                        loading: false
                    }
                }
                case InvitationsTypes.DECLINE_INVITATION: {
                    return {
                        ...state,
                        inviteDeclined: true,
                        loading: false
                    }
                }

                default:
                    return { ...state }
            }

        case InvitationsTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case InvitationsTypes.GET_INVITATIONS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                }
                case InvitationsTypes.ACCEPT_INVITATION: {
                    return {
                        ...state,
                        error: action.payload.error,
                        inviteAccepted: false,
                        loading: false
                    }
                }
                case InvitationsTypes.DECLINE_INVITATION: {
                    return {
                        ...state,
                        error: action.payload.error,
                        inviteDeclined: true,
                        loading: false
                    }
                }
                default:
                    return { ...state }
            }

        case InvitationsTypes.GET_INVITATIONS:
            return { ...state, loading: true };
        case InvitationsTypes.ACCEPT_INVITATION:
            return { ...state, loading: true, inviteAccepted: false };
        case InvitationsTypes.DECLINE_INVITATION:
            return { ...state, loading: true, inviteDeclined: false };
        default: return { ...state };
    }
}

export default Invite;