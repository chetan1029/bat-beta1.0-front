import React from "react";

//dasboard
import Dashboard from "../pages/Dashboard/";

// account
import Login from "../pages/account/Login";
import Settings from "../pages/Settings/index";

const authProtectedRoutes = [
  { path: "/settings", component: Settings },
  { path: "/", component: Dashboard },
];

const publicRoutes = [
  { path: "/login", component: Login },
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };