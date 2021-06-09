//dasboard
import NonAuthLayout from "../layouts/NonAuth";

import Dashboard from "../pages/Dashboard/";

// Get started
import GetStarted from "../pages/GetStarted/index"

// Settings
import Settings from "../pages/Settings/index";
import AddEditMember from "../pages/Settings/Members/AddEditMember";
import MemberDetails from "../pages/Settings/Members/MemberDetails";
import Invitations from "../pages/Invitations/";
import Profile from "../pages/Profile/";
import ChangePassword from "../pages/account/ChangePassword";
import MarketplacePermissions from "../pages/Settings/MarketplacePermissions";
// import Companies from "../pages/Companies/";
// import AddNewCompany from "../pages/Companies/AddNew";
import EditCompany from "../pages/Companies/EditCompany";
import AddEditComponent from "../pages/ProductManagement/Components/AddEditComponent";
import Components from "../pages/ProductManagement/Components";
import ComponentDetails from "../pages/ProductManagement/Components/ComponentDetails";
import EditProductVariation from "../pages/ProductManagement/Components/EditProductVariation";

// Vendor

// Vendor - Members
import VendorMembers from "../pages/Vendors/Members";

// Vendor - RFQ's
import VendorRfqs from "../pages/Vendors/Rfqs/";

// Vendor - Golden Samples
import VendorGoldenSamples from "../pages/Vendors/GoldenSamples/";

// Vendor - Contracts
import VendorContracts from "../pages/Vendors/Contracts/";

// Vendor - Inspections
import VendorInspections from "../pages/Vendors/Inspections/";

import InviteVendor from "../pages/Vendors/InviteVendor";
import VendorDetails from "../pages/Vendors/Details";
import EditVendor from "../pages/Vendors/EditVendor";
import Vendors from "../pages/Vendors/";


// sales channels
import SalesChannels from "../pages/SalesChannels/";
import SalesChannelsDetails from "../pages/SalesChannels/Details";
import InviteChannel from "../pages/SalesChannels/InviteChannel";

// clients
import Clients from "../pages/Clients/";

// auto emails
import AutoEmailsDashboard from "../pages/AutoEmails/Dashboard/";
import Campaigns from "../pages/AutoEmails/Campaigns/";
import CampaignDetails from "../pages/AutoEmails/Campaigns/Details";
import AddCampaign from "../pages/AutoEmails/Campaigns/AddCampaign";
import EmailQueue from "../pages/AutoEmails/Emails/EmailQueue";
import Templates from "../pages/AutoEmails/Templates/";
import AddEditTemplates from "../pages/AutoEmails/Templates/AddEditTemplate";

// Keyword tracking
import KeywordTracking from "../pages/KeywordTracking/"
import KeywordTrackingProduct from "../pages/KeywordTracking/Product"

// account
import Login from "../pages/account/Login";
import SignUp from "../pages/account/SignUp";
import Logout from "../pages/account/Logout";
import ForgotPassword from "../pages/account/ForgotPassword";
import ForgotPasswordReset from "../pages/account/ForgotPasswordReset";

// other
import PageNotFound from "../pages/other/PageNotFound";
import AccessDenied from "../pages/other/AccessDenied";

import Root from "../pages/Root";

const authProtectedRoutes = [
  { path: "/product-management/:companyId/components/add", component: AddEditComponent },
  { path: "/product-management/:companyId/components/:componentId/variation/edit/:variationId", component: EditProductVariation },
  { path: "/product-management/:companyId/components/:componentId/:tabName", component: ComponentDetails },
  { path: "/product-management/:companyId/components/:componentId", component: ComponentDetails },
  { path: "/product-management/:companyId/components/:componentId/variation/:variationId", component: ComponentDetails },
  { path: "/product-management/:companyId/components", component: Components },

  { path: "/settings/:companyId/members/add", component: AddEditMember },
  { path: "/settings/:companyId/members/:memberId", component: MemberDetails },
  { path: "/settings/:companyId/edit", component: EditCompany },

  { path: "/settings/:companyId/marketplace-permissions", component: MarketplacePermissions },

  { path: "/clients/:companyId", component: Clients, layoutProps: { 'mainSidebar': true } },

  { path: "/auto-emails/dashboard/:companyId", component: AutoEmailsDashboard },
  { path: "/auto-emails/:companyId/campaigns/:campaignId/email-queue/:status", component: EmailQueue },
  { path: "/auto-emails/:companyId/email-queue", component: EmailQueue },
  { path: "/auto-emails/:companyId/campaigns/add", component: AddCampaign },
  { path: "/auto-emails/:companyId/campaigns/:marketId/:campaignId/", component: CampaignDetails },
  { path: "/auto-emails/:companyId/campaigns", component: Campaigns },
  { path: "/auto-emails/:companyId/templates/add", component: AddEditTemplates },
  { path: "/auto-emails/:companyId/templates/edit/:templateId", component: AddEditTemplates },
  { path: "/auto-emails/:companyId/templates", component: Templates },

  { path: "/auto-emails/:companyId/templates/:templateId/", component: CampaignDetails },


  { path: "/settings/:companyId/:view?", component: Settings },
  { path: "/invitations", component: Invitations },
  { path: "/dashboard/:companyId", component: Dashboard },
  { path: "/get-started/:companyId", component: GetStarted },

  { path: "/keyword-tracking/dashboard/:companyId", component: KeywordTracking },
  { path: "/keyword-tracking/:companyId/product/:productId", component: KeywordTrackingProduct },

  { path: "/supply-chain/:companyId/vendors/:categoryId/add", component: InviteVendor },
  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId/edit", component: EditVendor },
  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId/members", component: VendorMembers },

  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId/rfqs", component: VendorRfqs },

  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId/golden-samples", component: VendorGoldenSamples },

  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId/contracts", component: VendorContracts },

  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId/inspections", component: VendorInspections },

  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId", component: VendorDetails },
  { path: "/supply-chain/:companyId/vendors/:categoryId", component: Vendors },

  { path: "/sales/:companyId/channels/:categoryId/add", component: InviteChannel },
  { path: "/sales/:companyId/channels/:categoryId/:channelId", component: SalesChannelsDetails },
  { path: "/sales/:companyId/channels/:categoryId", component: SalesChannels },

  { path: "/companies/:companyId/edit", component: EditCompany, layoutProps: { 'mainSidebar': true } },
  // { path: "/companies/add", component: AddNewCompany, layoutProps: { 'mainSidebar': true } },
  // { path: "/companies", component: Companies, layoutProps: { 'mainSidebar': true } },

  // If you wanna show second sidebar menu with my cleint, setting, my profile. it must do mainSidebar: true;
  // { path: "/profile/:companyId/general", component: Profile, layoutProps: { 'mainSidebar': true } },
  // { path: "/profile/:companyId/change-password", component: ChangePassword, layoutProps: { 'mainSidebar': true } },
  // { path: "/profile/:companyId", component: Profile, layoutProps: { 'mainSidebar': true } },
  { path: "/profile/:companyId/general", component: Profile, layoutProps: { 'mainSidebar': false } },
  { path: "/profile/:companyId/change-password", component: ChangePassword, layoutProps: { 'mainSidebar': false } },
  { path: "/profile/:companyId", component: Profile, layoutProps: { 'mainSidebar': false } },
  { path: "/", component: Root, layout: NonAuthLayout },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/signup", component: SignUp },
  { path: "/forgot-password-confirm/:uid/:token", component: ForgotPasswordReset },
  { path: "/forgot-password", component: ForgotPassword },

  { path: "/not-found", component: PageNotFound },
  { path: "/access-denied", component: AccessDenied },

];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };
