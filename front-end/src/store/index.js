import { applyMiddleware, compose, createStore } from 'redux';
import thunk                                     from 'redux-thunk';
import rootReducer                               from '../reducers';

const saveToLocalStorage = (state) => {
  //console.log("saving state to store");
  //   console.log(state);
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    //console.log(localStorage.getItem("state"));
  }
  catch (e) {
    // console.log(e);
  }
};

const loadFromLocalStorage = () => {
  //console.log("loading state from localstorage");
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    //console.log("The state being returned is: ");
    //console.log(JSON.parse(serializedState));
    return JSON.parse(serializedState);
  }
  catch (e) {
    //console.log(e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
