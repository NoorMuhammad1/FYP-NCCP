import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/index";
import Signup from "./containers/Signup/index";
import Signin from "./containers/SignIn/index";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import Catalogue from "../src/containers/Catalogue/index";
import Dashboard from "./containers/Dashboard/index";
import { isUserLoggedIn } from "./actions";
import ItemDetails from "./containers/Details";
import Orders from "./containers/Orders";
import Deposits from "./containers/Deposits";
import Microorganism from "./containers/Microorganism";
import Users from "./containers/Users";
import User from "./containers/User";
import DashboardCatalogue from "./containers/DashboardCatalogue";
import DashboardCatalogueDetail from "./containers/DashboardCatalogueDetail";
import AddMicroorganism from "./containers/AddMicroorganism";
import AddUserForm from "./components/AddUserForm";
import Cart from "./containers/Cart";
import ForgetPassword from "./containers/ForgetPassword";
import ResetPassword from "./containers/ResetPassword";
import EmailVerified from "./containers/EmailVerified";
import AdminDashboardDetails from "./containers/AdminDashboardDetails";
import DashboardDeposits from "./containers/AdminDashboardDeposits";
import DashboardOrders from "./containers/AdminDashboardOrders";
import DashboardUsers from "./containers/AdminDashboardUsers";
import DashboardPayments from "./containers/AdminDashboardPayments";
import DashboardReports from "./containers/AdminDashboardReports";
import DashboardAddUser from "./containers/AdminDashboardAddUser";
import AdminDashboardSettings from "./containers/AdminDashboardSettings";
import AdminDashboardOrders from "./containers/AdminDashboardOrders";
import AdminDashboardUsers from "./containers/AdminDashboardUsers";
import AdminDashboardPayments from "./containers/AdminDashboardPayments";
import AdminDashboardReports from "./containers/AdminDashboardReports";
import AdminDashboardDeposits from "./containers/AdminDashboardDeposits";
import AdminDashboardAddUser from "./containers/AdminDashboardAddUser";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth]);
  return (
    <div className="App">
      <Switch>
        {/* <PrivateRoute path="/" exact component={HomePage} /> */}
        <Route path="/" exact component={HomePage} />
        <Route path="/catalogue" component={Catalogue} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/signin" component={Signin} />
        <Route path="/forgetPassword" component={ForgetPassword} />
        <Route path="/authentication/activate" component={EmailVerified} />
        <Route path="/resetPassword" component={ResetPassword} />
        <Route path="/signup" component={Signup} />
        <Route path="/itemDetails" component={ItemDetails} />
        <PrivateRoute
          path="/adminDashboard"
          exact
          component={AdminDashboardDetails}
        />
        <PrivateRoute
          path="/adminDashboard/settings"
          component={AdminDashboardSettings}
        />
        {/* <PrivateRoute path="/dashboard/orders" component={Orders} /> */}
        <PrivateRoute
          path="/adminDashboard/deposits"
          component={AdminDashboardDeposits}
        />
        <PrivateRoute
          path="/adminDashboard/orders"
          component={AdminDashboardOrders}
        />
        <PrivateRoute
          path="/adminDashboard/users"
          component={AdminDashboardUsers}
        />
        <PrivateRoute
          path="/adminDashboard/addUser"
          component={AdminDashboardAddUser}
        />
        <PrivateRoute
          path="/adminDashboard/payments"
          component={AdminDashboardPayments}
        />
        <PrivateRoute
          path="/adminDashboard/reports"
          component={AdminDashboardReports}
        />
        {/* <PrivateRoute path="dashboard/reports" component={DashboardReports}/> */}

        <Route path="/dashboard/microorgansims" component={Microorganism} />
        {/* <PrivateRoute path="/dashboard/users" component={Users} /> */}
        <Route path="/dashboard/catalogue" component={DashboardCatalogue} />
        <Route path="/dashboard/user" component={User} />
        <PrivateRoute path="/dashboard/addUser" component={AddUserForm} />
        <PrivateRoute
          path="/dashboard/details"
          component={DashboardCatalogueDetail}
        />
        <PrivateRoute
          path="/dashboard/addMicroorganism"
          component={AddMicroorganism}
        />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
