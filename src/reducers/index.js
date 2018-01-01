import { combineReducers }  from 'redux';
import PageReducer          from './reducer_pages';
import ProjectsReducer      from './reducer_projects';
import ShelfReducer         from './reducer_shelf';
import TracksReducer        from './reducer_tracks';
import GithubReducer        from './reducer_github';

const rootReducer = combineReducers({
  pages: PageReducer,
  projects: ProjectsReducer,
  shelf: ShelfReducer,
  tracks: TracksReducer,
  github: GithubReducer,
});

export default rootReducer;
