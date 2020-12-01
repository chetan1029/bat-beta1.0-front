import { APICore } from '../api/apiCore';

const api = new APICore();


// common

function getRoles() {
    const baseUrl = "/role-permissions/";
    return api.get(`${baseUrl}`);
}

// account
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


/* members */
function getMembers(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/members/`;
    return api.get(`${baseUrl}`, params);
}

function createMember(companyId: number, data: any) {
    const baseUrl = `/companies/${companyId}/invite/`;
    return api.create(`${baseUrl}`, data);
}

function editMember(companyId: number, memberId: number | string, data: any) {
    const baseUrl = `/companies/${companyId}/members/${memberId}/`;
    return api.update(`${baseUrl}`, data);
}

function deleteMember(companyId: number, memberId: number | string) {
    const baseUrl = `/companies/${companyId}/members/${memberId}/`;
    return api.delete(`${baseUrl}`);
}

function getMember(companyId: number, memberId: number | string) {
    const baseUrl = `/companies/${companyId}/members/${memberId}/`;
    return api.get(`${baseUrl}`);
}

/* invitations */
function getInvitataions(params?: any) {
    const baseUrl = `/invitations/`;
    return api.get(`${baseUrl}`, params);
}

function acceptInvite(inviteId: number) {
    const baseUrl = `/invitations/${inviteId}/accept/`;
    return api.create(`${baseUrl}`, {});
}

function rejectInvite(inviteId: number) {
    const baseUrl = `/invitations/${inviteId}/reject/`;
    return api.create(`${baseUrl}`, {});
}

export {
    getRoles,
    login, logout, signup, forgotPassword, forgotPasswordConfirm,
    getInvitataions, acceptInvite, rejectInvite,
    getCompaniesList, createCompany,
    getPaymentTerms, createPaymentTerm, updatePaymentTerm, deletePaymentTerm, archivePaymentTerm, restorePaymentTerm,
    getMembers, getMember, createMember, deleteMember, editMember
}
