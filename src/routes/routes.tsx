//dasboard
import NonAuthLayout from "../layouts/NonAuth";

import Dashboard from "../pages/Dashboard/";

import Settings from "../pages/Settings/index";
import AddEditMember from "../pages/Settings/Members/AddEditMember";
import MemberDetails from "../pages/Settings/Members/MemberDetails";
import Invitations from "../pages/Invitations/";
import Profile from "../pages/Profile/";
import ChangePassword from "../pages/account/ChangePassword";
// import Companies from "../pages/Companies/";
// import AddNewCompany from "../pages/Companies/AddNew";
import EditCompany from "../pages/Companies/EditCompany";
import AddEditComponent from "../pages/ProductManagement/Components/AddEditComponent";
import Components from "../pages/ProductManagement/Components";
import ComponentDetails from "../pages/ProductManagement/Components/ComponentDetails";

import AddVendor from "../pages/Vendors/AddVendor";
import VendorDetails from "../pages/Vendors/Details";
import EditVendor from "../pages/Vendors/EditVendor";
import Vendors from "../pages/Vendors/";


// account
import Login from "../pages/account/Login";
import SignUp from "../pages/account/SignUp";
import Logout from "../pages/account/Logout";
import ForgotPassword from "../pages/account/ForgotPassword";
import ForgotPasswordReset from "../pages/account/ForgotPasswordReset";

// other
import PageNotFound from "../pages/other/PageNotFound";

import Root from "../pages/Root";

const authProtectedRoutes = [
  { path: "/product-management/:companyId/components/add", component: AddEditComponent },
  { path: "/product-management/:companyId/components/edit/:componentId", component: AddEditComponent },
  { path: "/product-management/:companyId/components/:componentId", component: ComponentDetails },
  { path: "/product-management/:companyId/components", component: Components },

  { path: "/settings/:companyId/members/add", component: AddEditMember },
  { path: "/settings/:companyId/members/:memberId", component: MemberDetails },
  { path: "/settings/:companyId/edit", component: EditCompany },

  { path: "/settings/:companyId/:view?", component: Settings },
  { path: "/invitations", component: Invitations },
  { path: "/dashboard/:companyId", component: Dashboard },

  { path: "/supply-chain/:companyId/vendors/:categoryId/add", component: AddVendor },
  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId/edit", component: EditVendor },
  { path: "/supply-chain/:companyId/vendors/:categoryId/:vendorId", component: VendorDetails },
  { path: "/supply-chain/:companyId/vendors/:categoryId", component: Vendors },

  { path: "/companies/:companyId/edit", component: EditCompany, layoutProps: { 'mainSidebar': true } },
  // { path: "/companies/add", component: AddNewCompany, layoutProps: { 'mainSidebar': true } },
  // { path: "/companies", component: Companies, layoutProps: { 'mainSidebar': true } },

  { path: "/profile/:companyId/general", component: Profile, layoutProps: { 'mainSidebar': true } },
  { path: "/profile/:companyId/change-password", component: ChangePassword, layoutProps: { 'mainSidebar': true } },
  { path: "/profile/:companyId", component: Profile, layoutProps: { 'mainSidebar': true } },
  { path: "/", component: Root, layout: NonAuthLayout },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/signup", component: SignUp },
  { path: "/forgot-password-confirm/:uid/:token", component: ForgotPasswordReset },
  { path: "/forgot-password", component: ForgotPassword },

  { path: "/not-found", component: PageNotFound },

];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };