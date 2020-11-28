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

/*
companies
*/
function getCompaniesList(params?: any) {
    const baseUrl = "/companies/";
    return api.get(`${baseUrl}`, params);
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
    login, logout,
    getCompaniesList,
    getPaymentTerms, createPaymentTerm, updatePaymentTerm, deletePaymentTerm, archivePaymentTerm, restorePaymentTerm
}
