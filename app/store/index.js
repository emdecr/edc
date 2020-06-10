import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = reducers;

const reducerWrapper = (state, action) => {
  if (action.type === HYDRATE) {
    console.log("HYDRATE - store index.js", state);
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
    // preserve prev state values on client side navigation
    // if (state.pages) nextState.pages = state.pages;
    // Attention! This will overwrite client state! Use proper reconciliation.
    return nextState;
  } else {
    console.log("NOT HYDRATE - store index.js", state);
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducerWrapper, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
