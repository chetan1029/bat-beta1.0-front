import React from "react";

//dasboard
import Dashboard from "../pages/Dashboard/";

// account
import Login from "../pages/account/Login";

const authProtectedRoutes = [
  { path: "/", component: Dashboard },
];

const publicRoutes = [
  { path: "/login", component: Login },
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };