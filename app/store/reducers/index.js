import { combineReducers } from "redux";
import github from "./GithubReducer";
import music from "./MusicReducer";
import pages from "./PagesReducer";
import posts from "./PostsReducer";
import reads from "./ReadsReducer";
import shelf from "./ShelfReducer";

export default combineReducers({
  github,
  music,
  pages,
  posts,
  reads,
  shelf
});
