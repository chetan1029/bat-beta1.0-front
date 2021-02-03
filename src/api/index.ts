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
    return api.updateWithFile(`${baseUrl}`, data);
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

function getCompany(companyId: number | string) {
    const baseUrl = `/companies/${companyId}/`;
    return api.get(`${baseUrl}`);
}

function createCompany(params: any) {
    const baseUrl = "/companies/";
    return api.create(`${baseUrl}`, params);
}

function editCompany(companyId: number | string, data: any) {
    const baseUrl = `/companies/${companyId}/`;
    return api.updateWithFile(`${baseUrl}`, data);
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

function updatePaymentTerm(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${assetId}/`;
    return api.update(`${baseUrl}`, params);
}

function deletePaymentTerm(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${assetId}/`;
    return api.delete(`${baseUrl}`);
}

function archivePaymentTerm(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${assetId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restorePaymentTerm(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/payment-terms/${assetId}/restore/`;
    return api.create(`${baseUrl}`, params);
}

/*
Bank
*/
function getBank(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/bank/`;
    return api.get(`${baseUrl}`, params);
}

function createBank(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/bank/`;
    return api.create(`${baseUrl}`, params);
}

function updateBank(companyId: number, bankId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/bank/${bankId}/`;
    return api.update(`${baseUrl}`, params);
}

function deleteBank(companyId: number, bankId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/bank/${bankId}/`;
    return api.delete(`${baseUrl}`);
}

function archiveBank(companyId: number, bankId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/bank/${bankId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restoreBank(companyId: number, bankId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/bank/${bankId}/restore/`;
    return api.create(`${baseUrl}`, params);
}

/*
Location
*/
function getLocation(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/location/`;
    return api.get(`${baseUrl}`, params);
}

function createLocation(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/location/`;
    return api.create(`${baseUrl}`, params);
}

function updateLocation(companyId: number, locationId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/location/${locationId}/`;
    return api.update(`${baseUrl}`, params);
}

function deleteLocation(companyId: number, locationId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/location/${locationId}/`;
    return api.delete(`${baseUrl}`);
}

function archiveLocation(companyId: number, locationId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/location/${locationId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restoreLocation(companyId: number, locationId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/location/${locationId}/restore/`;
    return api.create(`${baseUrl}`, params);
}
/*
Hs Code
*/
function getHscode(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/hscode/`;
    return api.get(`${baseUrl}`, params);
}

function createHscode(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/hscode/`;
    return api.create(`${baseUrl}`, params);
}

function updateHscode(companyId: number, hscodeId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/hscode/${hscodeId}/`;
    return api.update(`${baseUrl}`, params);
}

function deleteHscode(companyId: number, hscodeId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/hscode/${hscodeId}/`;
    return api.delete(`${baseUrl}`);
}

function archiveHscode(companyId: number, hscodeId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/hscode/${hscodeId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restoreHscode(companyId: number, hscodeId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/hscode/${hscodeId}/restore/`;
    return api.create(`${baseUrl}`, params);
}
/*
Tax
*/
function getTax(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/tax/`;
    return api.get(`${baseUrl}`, params);
}

function createTax(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/tax/`;
    return api.create(`${baseUrl}`, params);
}

function updateTax(companyId: number, taxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/tax/${taxId}/`;
    return api.update(`${baseUrl}`, params);
}

function deleteTax(companyId: number, taxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/tax/${taxId}/`;
    return api.delete(`${baseUrl}`);
}

function archiveTax(companyId: number, taxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/tax/${taxId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restoreTax(companyId: number, taxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/tax/${taxId}/restore/`;
    return api.create(`${baseUrl}`, params);
}

/*
Packing Box
*/
function getPackingBox(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/packing-box/`;
    return api.get(`${baseUrl}`, params);
}

function createPackingBox(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/packing-box/`;
    return api.create(`${baseUrl}`, params);
}

function updatePackingBox(companyId: number, packingBoxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/packing-box/${packingBoxId}/`;
    return api.update(`${baseUrl}`, params);
}

function deletePackingBox(companyId: number, packingBoxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/packing-box/${packingBoxId}/`;
    return api.delete(`${baseUrl}`);
}

function archivePackingBox(companyId: number, packingBoxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/packing-box/${packingBoxId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restorePackingBox(companyId: number, packingBoxId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/packing-box/${packingBoxId}/restore/`;
    return api.create(`${baseUrl}`, params);
}

/*
Get delivery terms
*/
function getDeliveryTerms(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/delivery-terms/`;
    return api.get(`${baseUrl}`, params);
}

/*
Get Membership Plan
*/
function getMembershipPlan(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/subscription`;
    return api.get(`${baseUrl}`, params);
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

function getCompanyPartners(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/partners/`;
    return api.get(`${baseUrl}`, params);
}

function archiveCompanyPartner(companyId: number, partnerId: number) {
    const baseUrl = `/companies/${companyId}/partners/${partnerId}/archive/`;
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

function getVendorMembers(companyId: number, vendorId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/vendors/${vendorId}/members/`;
    return api.get(`${baseUrl}`, params);
}

/* sales channels */
function getSalesChannels(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/sales-channels/`;
    return api.get(`${baseUrl}`, params);
}

function getSalesChannel(companyId: number, channelId: number,) {
    const baseUrl = `/companies/${companyId}/sales-channels/${channelId}/`;
    return api.get(`${baseUrl}`);
}


/* clients */
function getClients(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/clients/`;
    return api.get(`${baseUrl}`, params);
}

function getClient(companyId: number, clientId: number,) {
    const baseUrl = `/companies/${companyId}/clients/${clientId}/`;
    return api.get(`${baseUrl}`);
}

function archiveClient(companyId: number, clientId: number,) {
    const baseUrl = `/companies/${companyId}/clients/${clientId}/archive/`;
    return api.create(`${baseUrl}`, {});
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

function restoreComponent(companyId: number, componentId: number | string) {
    return api.create(`${componentUrl(companyId)}${componentId}/restore/`, {});
}

function discontinueComponent(companyId: number, componentId: number | string, data: any) {
    return api.create(`${componentUrl(companyId)}${componentId}/discontinued/`, data);
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

function getTagsAndTypes(companyId: number) {
    return api.get(`${componentUrl(companyId)}tags-types/`);
}

function exportCSVFile(companyId: number, filters?: any) {
    return api.get(`${componentUrl(companyId)}csvexport/`, filters);
}

function exportXLSFile(companyId: number, filters?: any) {
    return api.getFile(`${componentUrl(companyId)}xlsxeport/`, filters);
}

// Component Packing Box
function createComponentPackingBox(companyId: number, componentId, data: any) {
    return api.create(`${componentUrl(companyId)}${componentId}/packingboxes/`, data);
}

function getComponentpackingboxes(companyId: number, componentId: number | string, filters?: any) {
    return api.get(`${componentUrl(companyId)}${componentId}/packingboxes/`, filters);
}

function deleteComponentPackingBox(companyId: number, componentId: number | string, id: any) {
    return api.delete(`${componentUrl(companyId)}${componentId}/packingboxes/${id}/`);
}

function archiveComponentPackingBox(companyId: number, componentId: number | string, id: any, data: any) {
    return api.create(`${componentUrl(companyId)}${componentId}/packingboxes/${id}/archive/`, data);
}

function restoreComponentPackingBox(companyId: number, componentId: number | string, id: any, data) {
    return api.create(`${componentUrl(companyId)}${componentId}/packingboxes/${id}/restore/`, data);
}

function editComponentPackingBox(companyId: number, componentId: number | string, id: any, data: any) {
    return api.updatePatch(`${componentUrl(companyId)}${componentId}/packingboxes/${id}/`, data);
}

// Component ME
function createComponentME(companyId: number, componentId: any, data: any) {
    return api.create(`${componentUrl(companyId)}${componentId}/component-me/`, data);
}

function getComponentME(companyId: number, componentId: any, filters?: any) {
    return api.get(`${componentUrl(companyId)}${componentId}/component-me/`, filters);
}

function deleteComponentME(companyId: number, componentId: number | string, id: any) {
    return api.delete(`${componentUrl(companyId)}${componentId}/component-me/${id}/`);
}

function archiveComponentME(companyId: number, componentId: number | string, id: any, data: any) {
    return api.create(`${componentUrl(companyId)}${componentId}/component-me/${id}/archive/`, data);
}

function restoreComponentME(companyId: number, componentId: number | string, id: any, data) {
    return api.create(`${componentUrl(companyId)}${componentId}/component-me/${id}/restore/`, data);
}

function editComponentME(companyId: number, componentId: number | string, id: any, data: any) {
    return api.updatePatch(`${componentUrl(companyId)}${componentId}/component-me/${id}/`, data);
}

function uploadComponentMEFile(companyId: number, meId: number | string, data: any) {
    return api.createWithFile(`/companies/${companyId}/component-me/${meId}/files/`, data);
}

function deleteComponentMEFile(companyId: number, meId: number | string, fileId: any) {
    return api.delete(`companies/${companyId}/component-me/${meId}/files/${fileId}/`);
}

/*variations*/
const variationUrl = (companyId) => `/companies/${companyId}/product-variations/`;

function getVariation(companyId: number, variationId: number | string) {
    return api.get(`${variationUrl(companyId)}${variationId}/`);
}

function editVariation(companyId: number, variationId: number | string, data: any) {
    return api.updatePatch(`${variationUrl(companyId)}${variationId}/`, data);
}

function deleteVariationImages(companyId: number, variationId: number | string, ids: any) {
    return api.delete(`${variationUrl(companyId)}${variationId}/images/destroy_bulk/?ids=${ids}`);
}


/*
Assets
*/
function getAssets(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/asset/`;
    return api.get(`${baseUrl}`, params);
}

function getLocations(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/location/`;
    return api.get(`${baseUrl}`, params);
}

function getAssetType(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/asset/types/`;
    return api.get(`${baseUrl}`, params);
}

function createAsset(companyId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/asset/`;
    return api.createWithFile(`${baseUrl}`, params);
}

function updateAsset(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/asset/${assetId}/`;
    return api.updateWithFile(`${baseUrl}`, params);
}

function deleteAsset(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/asset/${assetId}/`;
    return api.delete(`${baseUrl}`);
}

function archiveAsset(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/asset/${assetId}/archive/`;
    return api.create(`${baseUrl}`, params);
}

function restoreAsset(companyId: number, assetId: number, params?: any) {
    const baseUrl = `/companies/${companyId}/asset/${assetId}/restore/`;
    return api.create(`${baseUrl}`, params);
}

export {
    getRoles, getCompanyCategories,
    login, logout, signup, forgotPassword, forgotPasswordConfirm, changePassword,
    updateProfile, updateProfilePicture,
    getInvitataions, acceptInvite, rejectInvite,
    getCompaniesList, createCompany, editCompany, getCompany,
    getPaymentTerms, createPaymentTerm, updatePaymentTerm, deletePaymentTerm, archivePaymentTerm, restorePaymentTerm,
    getMembers, getMember, createMember, deleteMember, editMember, getCompanyInvitataions, resendCompanyInvite, getCompanyPartners,
    getVendors, getVendor, createVendor, updateVendor, archiveCompanyPartner, getVendorMembers,
    getBank, createBank, updateBank, deleteBank, archiveBank, restoreBank,
    getLocation, createLocation, updateLocation, deleteLocation, archiveLocation, restoreLocation,
    getPackingBox, createPackingBox, updatePackingBox, deletePackingBox, archivePackingBox, restorePackingBox,
    getHscode, createHscode, updateHscode, deleteHscode, archiveHscode, restoreHscode,
    getTax, createTax, updateTax, deleteTax, archiveTax, restoreTax,
    getDeliveryTerms,
    getComponents, createComponent, editComponent, deleteComponent, getComponent, archiveComponent, restoreComponent,
    uploadComponentImages, uploadVariationImages, getTagsAndTypes, exportCSVFile, exportXLSFile,
    getVariation, editVariation, deleteVariationImages, discontinueComponent,
    getClients, getClient, archiveClient,
    getSalesChannels, getSalesChannel,
    getAssets, createAsset, updateAsset, deleteAsset, archiveAsset, restoreAsset, getLocations, getAssetType,
    getMembershipPlan,
    createComponentPackingBox, getComponentpackingboxes, deleteComponentPackingBox, archiveComponentPackingBox, restoreComponentPackingBox, editComponentPackingBox,
    createComponentME, getComponentME, deleteComponentME, archiveComponentME, restoreComponentME, editComponentME, uploadComponentMEFile, deleteComponentMEFile
}
