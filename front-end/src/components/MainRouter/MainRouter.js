import AddUserForm from "components/AddUserForm";
import PrivateRoute from "components/HOC/PrivateRoute";
import {
  AddUser,
  Deposits,
  Details,
  Payments,
  Reports,
  Settings,
  UserOrders,
} from "containers/AdminDashboard";
import DepositReport from "containers/AdminDashboard/Reports/DepositReport";
import OrderReport from "containers/AdminDashboard/Reports/OrderReport";
import MicroorganismReport from "containers/AdminDashboard/Reports/MicroorganismReport";
import PaymentReport from "containers/AdminDashboard/Reports/PaymentReport";
import UserReport from "containers/AdminDashboard/Reports/UserReport";
import AdminDashboardOrders from "containers/AdminDashboardOrders";
import AdminDashboardUsers from "containers/AdminDashboardUsers";
import UserDashboardOrderDetails from "containers/UserDashboard/UserOrderDetails";
import UserDashboardDepositDetails from "containers/UserDashboard/UserDepositDetails";
import Cart from "containers/Cart";
import Catalogue from "containers/Catalogue";
import Dashboard from "containers/Dashboard";
import DashboardCatalogue from "containers/DashboardCatalogue";
import DashboardCatalogueDetail from "containers/DashboardCatalogueDetail";
import DepositHomepage from "containers/DepositHomepage";
import DepositRequestForm from "containers/DepositRequestForm";
import ItemDetails from "containers/Details";
import EmailVerified from "containers/EmailVerified";
import ForgetPassword from "containers/ForgetPassword";
import HomePage from "containers/HomePage";
import Microorganism from "containers/Microorganism";
import ResetPassword from "containers/ResetPassword";
import Signin from "containers/SignIn";
import Signup from "containers/Signup";
import User from "containers/User";
import UserDashboard from "containers/UserDashboard/UserDashboard";
import UserDepositsDashboard from "containers/UserDashboard/UserDepositsDashboard";
import UserOrdersDashboard from "containers/UserDashboard/UserOrders/UserOrdersDashboard";
import UserPaymentDashboard from "containers/UserDashboard/UserPaymentDashboard";
import UserSettings from "containers/UserDashboard/UserSettings/UserSettings";
import UserOrderDetails from "containers/UserOrderDetails";
import React from "react";
import { Route, Switch } from "react-router-dom";
import OrderPayment from "components/OrderPayment";
import InternalUserLog from "containers/Logs/InternalUserLog";
import AdminLog from "containers/Logs/AdminLog";
import ActivityLog from "containers/Logs/ActivityLog";
import adminDashboardMicroorganisms from "containers/AdminDashboard/Microorganisms";
import AdminDashboardMicroorganisms from "containers/AdminDashboard/Microorganisms";
import DepositInfo from "containers/InformationPages/Deposit";
import CreateDeposit from "containers/createDeposit";
import UserDeposits from "containers/UserDashboard/UserDeposits";
import AdminDashboardUserDepositDetails from "containers/AdminDashboard/DepositDetails";
import AddMicroorganism from "containers/AdminDashboard/MicroorganismAdd";
import MicroorganismDetails from "containers/AdminDashboard/MicroorganismsDetails";
import Logs from "containers/AdminDashboard/Others";
import LogDetails from "containers/AdminDashboard/LogDetails";
import ReportsAndLogs from "containers/AdminDashboard/ReportsAndLogs";
import Others from "containers/AdminDashboard/Others";
function MainRouter() {
  return (
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
      <Route path="/depositHomepage" component={DepositHomepage} />
      <Route path="/dashboard/microorgansims" component={Microorganism} />
      <Route path="/dashboard/catalogue" component={DashboardCatalogue} />
      <Route path="/dashboard/user" component={User} />
      <Route path="/deposits" component={DepositInfo} />
      <Route path="/createDeposit" component={CreateDeposit} />

      {/* PRIVATE ROUTES*/}

      {/* User Dashboard routes */}
      <PrivateRoute path="/userDashboard" exact component={UserDashboard} />
      <PrivateRoute
        path="/userDashboard/userSettings"
        exact
        component={UserSettings}
      />

      <PrivateRoute
        path="/userDashboard/userPaymentDashboard"
        exact
        component={UserPaymentDashboard}
      />
      <PrivateRoute
        path="/userDashboard/userOrdersDashboard"
        exact
        component={UserOrdersDashboard}
      />
      <PrivateRoute
        path="/userDashboard/userDepositDashboard"
        exact
        component={UserDeposits}
      />
      <PrivateRoute
        path="/userDashboard/userOrderDetails"
        exact
        component={UserDashboardOrderDetails}
      />
      <PrivateRoute
        path="/userDashboard/userDepositDetails"
        exact
        component={UserDashboardDepositDetails}
      />

      {/* Admin Dashboard Routes */}
      <PrivateRoute path="/adminDashboard" exact component={Details} />
      <PrivateRoute path="/adminDashboard/settings" component={Settings} />
      <PrivateRoute path="/adminDashboard/deposits" component={Deposits} />
      <PrivateRoute path="/adminDashboard/ordersub" component={UserOrders} />
      <PrivateRoute
        path="/adminDashboard/users"
        component={AdminDashboardUsers}
      />
      <PrivateRoute path="/adminDashboard/user/details" component={User} />
      <PrivateRoute path="/adminDashboard/addUser" component={AddUser} />
      <PrivateRoute path="/adminDashboard/payments" component={Payments} />
      <PrivateRoute path="/adminDashboard/reports" component={Reports} />
      <PrivateRoute
        path="/adminDashboard/paymentReport"
        component={PaymentReport}
      />
      <PrivateRoute
        path="/adminDashboard/orderReport"
        component={OrderReport}
      />
      <PrivateRoute
        path="/adminDashboard/Microorganisms"
        component={AdminDashboardMicroorganisms}
      />
      <PrivateRoute
        path="/adminDashboard/MicroorganismDetails"
        component={MicroorganismDetails}
      />
      <PrivateRoute path="/adminDashboard/userReport" component={UserReport} />
      <PrivateRoute
        path="/adminDashboard/depositReport"
        component={DepositReport}
      />
      <PrivateRoute
        path="/adminDashboard/microorganismReport"
        component={MicroorganismReport}
      />

      <PrivateRoute
        path="/adminDashboard/internalUserLog"
        component={InternalUserLog}
      />
      <PrivateRoute path="/adminDashboard/adminLog" component={AdminLog} />
      <PrivateRoute
        path="/adminDashboard/activityLog"
        component={ActivityLog}
      />

      <PrivateRoute
        path="/adminDashboard/depositRequestForm"
        component={DepositRequestForm}
      />
      <PrivateRoute
        path="/adminDashboard/userOrderDetails"
        component={UserOrderDetails}
      />
      <PrivateRoute path="/dashboard/addUser" component={AddUserForm} />
      {/* <PrivateRoute path="/dashboard/orderPayment" component={OrderPayment} /> */}
      <PrivateRoute
        path="/dashboard/details"
        component={DashboardCatalogueDetail}
      />
      {/* <PrivateRoute
        path="/dashboard/addMicroorganism"
        component={AddMicroorganism}
      /> */}
      <PrivateRoute
        path="/adminDashboard/addMicroorganism"
        component={AddMicroorganism}
      />
      <PrivateRoute
        path="/adminDashboard/orders"
        component={AdminDashboardOrders}
      />
      <PrivateRoute
        path="/adminDashboard/userOrderDetails"
        component={UserOrderDetails}
      />
      <PrivateRoute
        path="/adminDashboard/depositDetails"
        component={AdminDashboardUserDepositDetails}
      />
      <PrivateRoute path="/adminDashboard/others" component={Others} />
      <PrivateRoute path="/adminDashboard/logDetails" component={LogDetails} />
      <PrivateRoute
        path="/adminDashboard/ReportsAndLogs"
        component={ReportsAndLogs}
      />

      <Route path="/cart" component={Cart} />
    </Switch>
  );
}

export { MainRouter };
