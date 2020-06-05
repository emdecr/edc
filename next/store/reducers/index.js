import { combineReducers } from "redux";
import pages from "./PagesReducer";
import github from "./GithubReducer";

export default combineReducers({
  pages,
  github
});
