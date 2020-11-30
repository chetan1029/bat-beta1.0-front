import { APICore } from '../api/apiCore';

const api = new APICore();


function login(params?: any) {
    const baseUrl = "/login/";
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = "/logout/";
    return api.create(`${baseUrl}`, {});
}

function signup(params: any) {
    const baseUrl = "/auth/registration/";
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: any) {
    const baseUrl = "/password/reset/";
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: any) {
    const baseUrl = "/password/reset/confirm/";
    return api.create(`${baseUrl}`, params);
}

/*
companies
*/
function getCompaniesList(params?: any) {
    const baseUrl = "/companies/";
    return api.get(`${baseUrl}`, params);
}

function createCompany(params: any) {
    const baseUrl = "/companies/";
    return api.create(`${baseUrl}`, params);
}

/*
payment terms
*/
function getPaymentTerms(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/`;
    return api.get(`${baseUrl}`, params);
}

function createPaymentTerm(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/`;
    return api.create(`${baseUrl}`, params);
}

function updatePaymentTerm(companyId: number, paymentTermId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${paymentTermId}/`;
    return api.update(`${baseUrl}`, params);
}

function deletePaymentTerm(companyId: number, paymentTermId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${paymentTermId}/`;
    return api.delete(`${baseUrl}`);
}

function archivePaymentTerm(companyId: number, paymentTermId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${paymentTermId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restorePaymentTerm(companyId: number, paymentTermId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${paymentTermId}/restore/`;
    return api.create(`${baseUrl}`, params);
}

export {
    login, logout, signup, forgotPassword, forgotPasswordConfirm,
    getCompaniesList, createCompany,
    getPaymentTerms, createPaymentTerm, updatePaymentTerm, deletePaymentTerm, archivePaymentTerm, restorePaymentTerm
}
