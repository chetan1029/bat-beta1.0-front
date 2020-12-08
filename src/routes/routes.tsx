//dasboard
import NonAuthLayout from "../layouts/NonAuth";

import Dashboard from "../pages/Dashboard/";

import Settings from "../pages/Settings/index";
import AddEditMember from "../pages/Settings/Members/AddEditMember";
import MemberDetails from "../pages/Settings/Members/MemberDetails";
import Invitations from "../pages/Invitations/";
import Profile from "../pages/Profile/";
import ChangePassword from "../pages/account/ChangePassword";
import Companies from "../pages/Companies/";
import AddNewCompany from "../pages/Companies/AddNew";

import AddEditVendor from "../pages/Vendors/AddEditVendor";
import Vendors from "../pages/Vendors/";


// account
import Login from "../pages/account/Login";
import SignUp from "../pages/account/SignUp";
import Logout from "../pages/account/Logout";
import ForgotPassword from "../pages/account/ForgotPassword";
import ForgotPasswordReset from "../pages/account/ForgotPasswordReset";

import Root from "../pages/Root";

const authProtectedRoutes = [
  { path: "/settings/:companyId/members/add", component: AddEditMember },
  { path: "/settings/:companyId/members/:memberId", component: MemberDetails },
  { path: "/settings/:companyId/:view?", component: Settings },
  { path: "/invitations", component: Invitations },
  { path: "/dashboard/:companyId", component: Dashboard },

  { path: "/supply-chain/:companyId/vendors/:categoryId/add", component: AddEditVendor },
  { path: "/supply-chain/:companyId/vendors/:categoryId", component: Vendors },

  { path: "/companies/add", component: AddNewCompany, layoutProps: { 'mainSidebar': true } },
  { path: "/companies", component: Companies, layoutProps: { 'mainSidebar': true } },

  { path: "/profile/general", component: Profile, layoutProps: { 'mainSidebar': true } },
  { path: "/profile/change-password", component: ChangePassword, layoutProps: { 'mainSidebar': true } },
  { path: "/profile", component: Profile, layoutProps: { 'mainSidebar': true } },
  { path: "/", component: Root, layout: NonAuthLayout },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/signup", component: SignUp },
  { path: "/forgot-password-confirm/:uid/:token", component: ForgotPasswordReset },
  { path: "/forgot-password", component: ForgotPassword },

];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };