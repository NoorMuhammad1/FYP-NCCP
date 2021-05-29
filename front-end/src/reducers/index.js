import authReducer from "./auth.reducers";
import { combineReducers } from "redux";
import signupReducers from "./signup.reducers";
import catalogueReducers from "./catalogue.reducers";
import itemInfoReducer from "./itemInfo.reducer";
import dashboardReducers from "./dashboard.reducers";
import userReducer from "./user.reducer";
import updatingUserReducer from "./updatingUser.reducer";
import { authConstants } from "../actions/constants";
import cartReducer from "./cart.reducer";
import sidebarReducer from "./sidebar.reducer";
import paymentReducer from "./payment.reducer";
import orderReducer from "./orders.reducer";
import depositReducer from "./deposit.reducers";
import logsReducer from "./logs.reducer";
import reportReducer from "./report.reducer";
import OtherReducer from "./other.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  sign: signupReducers,
  catalogue: catalogueReducers,
  details: itemInfoReducer,
  dashboard: dashboardReducers,
  user: userReducer,
  userUpdate: updatingUserReducer,
  cart: cartReducer,
  sidebar: sidebarReducer,
  payment: paymentReducer,
  order: orderReducer,
  deposit: depositReducer,
  logs: logsReducer,
  report: reportReducer,
  other: OtherReducer,
});
// import { combineReducers } from 'redux';
// import { authConstants }   from '../actions/constants';
// import authReducer         from './auth.reducers';
// import cartReducer         from './cart.reducer';
// import catalogueReducers   from './catalogue.reducers';
// import dashboardReducers   from './dashboard.reducers';
// import itemInfoReducer     from './itemInfo.reducer';
// import sidebarReducer      from './sidebar.reducer';
// import signupReducers      from './signup.reducers';
// import updatingUserReducer from './updatingUser.reducer';
// import userReducer         from './user.reducer';

// const rootReducer = combineReducers({
//                                       auth      : authReducer,
//                                       sign      : signupReducers,
//                                       catalogue : catalogueReducers,
//                                       details   : itemInfoReducer,
//                                       dashboard : dashboardReducers,
//                                       user      : userReducer,
//                                       userUpdate: updatingUserReducer,
//                                       cart      : cartReducer,
//                                       sidebar   : sidebarReducer,
//                                     });

const rootreducer = (state, action) =>
  rootReducer(action.type === authConstants.LOGOUT ? undefined : state, action);
export default rootreducer;
