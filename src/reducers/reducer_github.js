import {
    FETCH_GITHUB_EVENTS, 
    FETCH_GITHUB_EVENTS_FULFILLED
} from '../constants/ActionTypes';

const GithubReducer = function(state = [], action) {
    // console.log('action received', action);
    switch (action.type) {
        case FETCH_GITHUB_EVENTS_FULFILLED:
            return action.payload;
        default:
            return state;
    }
    
}

export default GithubReducer