import React               from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {

        // Todo: Remove hardcoded `true`
        const token = true;//window.localStorage.getItem('token');
        // const role = window.localStorage.getItem("role");
        // const state = JSON.parse(window.localStorage.getItem("state"));
        if (token) {
          return <Component {...props} />;
        }
        else {
          return <Redirect to={'/signin'} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
