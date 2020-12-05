import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { APICore } from '../api/apiCore';
//import layouts
import DefaultLayout from "../layouts/Default"
import NonAuthLayout from "../layouts/NonAuth";


//import routes
import { authProtectedRoutes, publicRoutes } from "./routes";

// handle auth and authorization
const AppRoute = ({ component: Component, layout: Layout, layoutProps, roles, isAuthProtected, ...rest }) => {

  const api = new APICore();
  return <Route {...rest} render={props => {

    if (!api.isUserAuthenticated() && isAuthProtected) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login', search: "?next=" + props.location.pathname + props.location.search, state: { from: props.location } }} />;
    }

    const loggedInUser = api.getLoggedInUser();
    // check if route is restricted by role
    if (roles && roles.indexOf(loggedInUser.role) === -1) {
      // role not authorised so redirect to home page
      return <Redirect to={{ pathname: '/' }} />;
    }

    // authorised so return component
    return <Layout {...(layoutProps || {})}>
      <Component {...props} />
    </Layout>
  }} />
}


/**
 * Main Route component
 */
const Routes = (props: any) => {

  return (
    <React.Fragment>

      <BrowserRouter>
        <Switch>
          {publicRoutes.map((route: any, idx: number) => (
            <AppRoute
              path={route.path}
              layout={NonAuthLayout}
              layoutProps={route.layoutProps}
              component={route.component}
              key={idx}
              roles={route['roles']}
              isAuthProtected={false}
            />
          ))}


          {/* private/auth protected routes */}
          {authProtectedRoutes.map((route: any, idx: number) => (
            <AppRoute
              path={route.path}
              layout={route.layout ? route.layout : DefaultLayout}
              layoutProps={route.layoutProps}
              component={route.component}
              key={idx}
              roles={route['roles']}
              isAuthProtected={true}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </React.Fragment >
  );
};

export default Routes;

