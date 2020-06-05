// import _ from "lodash";
import { GET_PAGES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_PAGES:
      return action.payload;
    default:
      return state;
  }
};
