// import _ from "lodash";
import { GET_GITHUB } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_GITHUB:
      return action.payload;
    default:
      return state;
  }
};
