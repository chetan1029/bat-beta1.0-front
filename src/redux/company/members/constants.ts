
export enum MembersTypes {
    API_RESPONSE_SUCCESS = '@@company/members/API_RESPONSE_SUCCESS',
    API_RESPONSE_ERROR = '@@company/members/API_RESPONSE_ERROR',

    GET_MEMBERS = '@@company/members/GET_MEMBERS',
    GET_MEMBER = '@@company/members/GET_MEMBER',
    CREATE_MEMBER = '@@company/members/CREATE_MEMBER',
    EDIT_MEMBER = '@@company/members/EDIT_MEMBER',
    DELETE_MEMBER = '@@company/members/DELETE_MEMBER',

    GET_INVITATIONS = '@@company/members/GET_INVITATIONS',
    RESEND_INVITE = '@@company/members/RESEND_INVITE',

    GET_PARTNERS = '@@company/members/GET_PARTNERS',
    ARCHIVE_PARTNER = '@@company/members/ARCHIVE_PARTNER',

    RESET = '@@company/members/RESET',
}
