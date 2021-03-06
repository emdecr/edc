// import _ from "lodash";
import { GET_SHELF } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_SHELF:
      return action.payload;
    default:
      return state;
  }
};
