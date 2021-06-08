
export enum AutoEmailsTypes {
    API_RESPONSE_SUCCESS = '@@company/autoEmails/API_RESPONSE_SUCCESS',
    API_RESPONSE_ERROR = '@@company/autoEmails/API_RESPONSE_ERROR',

    GET_CAMPAIGNS = '@@company/autoEmails/GET_CAMPAIGNS',
    GET_CAMPAIGN = '@@company/autoEmails/GET_CAMPAIGN',
    UPDATE_CAMPAIGN = '@@company/autoEmails/UPDATE_CAMPAIGN',
    CREATE_CAMPAIGN = '@@company/autoEmails/CREATE_CAMPAIGN',
    TEST_CAMPAIGN = '@@company/autoEmails/TEST_CAMPAIGN',
    GET_EMAILQUEUES = '@@company/autoEmails/GET_EMAILQUEUES',

    GET_TEMPLATES = '@@company/autoEmails/GET_TEMPLATES',
    GET_TEMPLATE = '@@company/autoEmails/GET_TEMPLATE',
    CREATE_TEMPLATE = '@@company/autoEmails/CREATE_TEMPLATE',
    TEST_TEMPLATE = '@@company/autoEmails/TEST_TEMPLATE',
    EDIT_TEMPLATE = '@@company/autoEmails/EDIT_TEMPLATE',
    DELETE_TEMPLATE = '@@company/autoEmails/DELETE_TEMPLATE',

    GET_GLOBALTEMPLATES = '@@company/autoEmails/GET_GLOBALTEMPLATES',
    GET_GLOBALTEMPLATE = '@@company/autoEmails/GET_GLOBALTEMPLATE',

    RESET = '@@company/autoEmails/RESET',
}
