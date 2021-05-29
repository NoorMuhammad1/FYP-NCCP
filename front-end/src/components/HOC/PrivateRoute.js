import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      component={(props) => {
        // Todo: Remove hardcoded `true`
        const token = true; //window.localStorage.getItem('token');
        // const role = window.localStorage.getItem("role");
        // const state = JSON.parse(window.localStorage.getItem("state"));
        if (auth.token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/signin"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
