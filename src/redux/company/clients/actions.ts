import { ClientTypes } from './constants';


// common success
export const clientsApiResponseSuccess = (actionType: string, data: any) => ({
    type: ClientTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});
// common error
export const clientsApiResponseError = (actionType: string, error: string) => ({
    type: ClientTypes.API_RESPONSE_ERROR,
    payload: { actionType, error }
});

export const getClients = (companyId: string | number, filters?: any) => ({
    type: ClientTypes.GET_CLIENTS,
    payload: { companyId, filters }
});

export const getClient = (companyId: string | number, clientId: number | string) => ({
    type: ClientTypes.GET_CLIENT,
    payload: { companyId, clientId }
});

export const archiveClient = (companyId: string | number, clientId: number | string) => ({
    type: ClientTypes.ARCHIVE_CLIENT,
    payload: { companyId, clientId }
});

export const resetClients = () => ({
    type: ClientTypes.RESET
})
