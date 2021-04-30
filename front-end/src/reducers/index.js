import { combineReducers } from 'redux';
import { authConstants }   from '../actions/constants';
import authReducer         from './auth.reducers';
import cartReducer         from './cart.reducer';
import catalogueReducers   from './catalogue.reducers';
import dashboardReducers   from './dashboard.reducers';
import itemInfoReducer     from './itemInfo.reducer';
import sidebarReducer      from './sidebar.reducer';
import signupReducers      from './signup.reducers';
import updatingUserReducer from './updatingUser.reducer';
import userReducer         from './user.reducer';

const rootReducer = combineReducers({
                                      auth      : authReducer,
                                      sign      : signupReducers,
                                      catalogue : catalogueReducers,
                                      details   : itemInfoReducer,
                                      dashboard : dashboardReducers,
                                      user      : userReducer,
                                      userUpdate: updatingUserReducer,
                                      cart      : cartReducer,
                                      sidebar   : sidebarReducer,
                                    });

export default (state, action) =>
  rootReducer(action.type === authConstants.LOGOUT ? undefined : state, action);
