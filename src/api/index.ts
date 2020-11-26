import { APICore } from '../api/apiCore';

const api = new APICore();


function login(params?: any) {
    const baseUrl = "/auth/login";
    return api.get(`${baseUrl}`, params);
}

export { login }
