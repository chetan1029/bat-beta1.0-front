import { APICore } from '../api/apiCore';

const api = new APICore();


function login(params?: any) {
    const baseUrl = "/login/";
    return api.create(`${baseUrl}`, params);
}

export { login }
