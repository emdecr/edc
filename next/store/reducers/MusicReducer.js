// import _ from "lodash";
import { GET_MUSIC } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_MUSIC:
      return action.payload;
    default:
      return state;
  }
};
