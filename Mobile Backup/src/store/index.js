import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth.reducer";
import depositReducer from "../reducers/deposit.reducer";
import logReducer from "../reducers/log.reducer";
import orderReducer from "../reducers/order.reducer";
import paymentReducer from "../reducers/payment.reducer";
import toastReducer from "../reducers/toast.reducer";
import userReducer from "../reducers/user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  user: userReducer,
  order: orderReducer,
  deposit: depositReducer,
  payment: paymentReducer,
  log: logReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
