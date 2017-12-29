import { combineReducers } from 'redux';
import PageReducer from './reducer_pages';
import ShelfReducer from './reducer_shelf';

const rootReducer = combineReducers({
  pages: PageReducer,
  shelf: ShelfReducer
});

export default rootReducer;
