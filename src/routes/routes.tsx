import React from "react";

//dasboard
import Dashboard from "../pages/Dashboard/";

// account
import Login from "../pages/account/Login";
import Logout from "../pages/account/Logout";

const authProtectedRoutes = [
  { path: "/", component: Dashboard },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };