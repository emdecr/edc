import _ from 'lodash';
// import { FETCH_PAGES, FETCH_PAGES_FULFILLED } from '../actions';

import {
    FETCH_PAGES, 
    FETCH_PAGES_FULFILLED
} from '../constants/ActionTypes';

const PageReducer = function(state = {}, action) {
    // console.log('action received', action);
    switch (action.type) {
        case FETCH_PAGES_FULFILLED:
            // console.log('reducer_pages ', action.payload.data);
            return _.mapKeys(action.payload.data, 'slug');
            // return action.payload.data;
        default:
            return state;
    }
    
}

export default PageReducer