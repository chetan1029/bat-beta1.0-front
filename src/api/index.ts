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


function updateProfile(username: string, data: any) {
    const baseUrl = `/user/${username}/`;
    return api.updatePatch(`${baseUrl}`, data);
}

function updateProfilePicture(username: string, data: any) {
    const baseUrl = `/user/${username}/`;
    return api.updateWithFile(`${baseUrl}`, data);
}

function changePassword(params: any) {
    const baseUrl = "/password/change/";
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

function getCompanyCategories(companyId: string | number, params?: any) {
    const baseUrl = `/companies/${companyId}/categories`;
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
    return api.updatePatch(`${baseUrl}`, data);
}

function deleteMember(companyId: number, memberId: number | string) {
    const baseUrl = `/companies/${companyId}/members/${memberId}/archive/`;
    return api.create(`${baseUrl}`, {});
}

function getMember(companyId: number, memberId: number | string) {
    const baseUrl = `/companies/${companyId}/members/${memberId}/`;
    return api.get(`${baseUrl}`);
}

function getCompanyInvitataions(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/invitations/`;
    return api.get(`${baseUrl}`, params);
}

function resendCompanyInvite(companyId: number | string, inviteId: number | string) {
    const baseUrl = `/companies/${companyId}/invitations/${inviteId}/resend/`;
    return api.create(`${baseUrl}`, {});
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

/* vendors */
function getVendors(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/vendors/`;
    return api.get(`${baseUrl}`, params);
}

function getVendor(companyId: number, vendorId: number,) {
    const baseUrl = `/companies/${companyId}/vendors/${vendorId}/`;
    return api.get(`${baseUrl}`);
}

function createVendor(companyId: number, data: any) {
    const baseUrl = `/companies/${companyId}/vendors/`;
    return api.create(`${baseUrl}`, data);
}

function updateVendor(companyId: number, vendorId: number, data: any) {
    const baseUrl = `/companies/${companyId}/vendors/${vendorId}/`;
    return api.updatePatch(`${baseUrl}`, data);
}


/* components */
const componentUrl = (companyId) => `/companies/${companyId}/products/`;

function getComponents(companyId: number, params?: any) {
    return api.get(componentUrl(companyId), params);
}

function createComponent(companyId: number, data: any) {
    return api.create(componentUrl(companyId), data);
}

function editComponent(companyId: number, componentId: number | string, data: any) {
    return api.updatePatch(`${componentUrl(companyId)}components/${componentId}/`, data);
}

function deleteComponent(companyId: number, componentId: number | string) {
    return api.create(`${componentUrl(companyId)}${componentId}/archive/`, {});
}

function archiveComponent(companyId: number, componentId: number | string, data: any) {
    return api.create(`${componentUrl(companyId)}${componentId}/archive/`, data);
}

function getComponent(companyId: number, componentId: number | string) {
    return api.get(`${componentUrl(companyId)}${componentId}/`);
}

function uploadComponentImages(companyId: number, componentId: number | string, data: any) {
    return api.createWithFile(`${componentUrl(companyId)}${componentId}/images/`, data);
}

function uploadVariationImages(companyId: number, variationId: number | string, data: any) {
    const baseUrl = `/companies/${companyId}/product-variations/${variationId}/images/`;
    return api.createWithFile(`${baseUrl}`, data);
}

export {
    getRoles, getCompanyCategories,
    login, logout, signup, forgotPassword, forgotPasswordConfirm, changePassword,
    updateProfile, updateProfilePicture,
    getInvitataions, acceptInvite, rejectInvite,
    getCompaniesList, createCompany,
    getPaymentTerms, createPaymentTerm, updatePaymentTerm, deletePaymentTerm, archivePaymentTerm, restorePaymentTerm,
    getMembers, getMember, createMember, deleteMember, editMember, getCompanyInvitataions, resendCompanyInvite,
    getVendors, getVendor, createVendor, updateVendor,
    getComponents, createComponent, editComponent, deleteComponent, getComponent, archiveComponent,
    uploadComponentImages, uploadVariationImages
}
