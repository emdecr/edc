// import _ from "lodash";
import { GET_PAGES } from "../actions/types";
import { HYDRATE } from "next-redux-wrapper";

export default (state = null, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE IN REDUCER");
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case GET_PAGES:
      console.log("GET_PAGES IN REDUCER");
      return action.payload;
    default:
      console.log("DEFAULT IN REDUCER");
      return state;
  }
};
