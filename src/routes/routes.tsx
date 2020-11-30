//dasboard
import Dashboard from "../pages/Dashboard/";

import Settings from "../pages/Settings/index";

// account
import Login from "../pages/account/Login";
import SignUp from "../pages/account/SignUp";
import Logout from "../pages/account/Logout";

const authProtectedRoutes = [
  { path: "/settings/:companyId/:view?", component: Settings },
  { path: "/", component: Dashboard },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/signup", component: SignUp },
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };