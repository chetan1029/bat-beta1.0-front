import React from "react";

//dasboard
import Dashboard from "../pages/Dashboard/";

// account
import Login from "../pages/account/Login";
import Settings from "../pages/Settings/index";
import Logout from "../pages/account/Logout";

const authProtectedRoutes = [
  { path: "/settings", component: Settings },
  { path: "/", component: Dashboard },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };