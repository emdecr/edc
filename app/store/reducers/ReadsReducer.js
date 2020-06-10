// import _ from "lodash";
import { GET_READS } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_READS:
      return action.payload;
    default:
      return state;
  }
};
