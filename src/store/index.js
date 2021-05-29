import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth.reducer";
import catalogueReducer from "../reducers/catalogue.reducers";
import depositReducer from "../reducers/deposit.reducer";
import logReducer from "../reducers/log.reducer";
import orderReducer from "../reducers/order.reducer";
import OtherReducer from "../reducers/other.reducer";
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
  catalogue: catalogueReducer,
  other: OtherReducer,
});
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
