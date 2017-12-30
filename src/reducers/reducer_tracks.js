import {
    FETCH_TRACKS, 
    FETCH_TRACKS_FULFILLED
} from '../constants/ActionTypes';

const TracksReducer = function(state = {}, action) {
    // console.log('action received', action);
    switch (action.type) {
        case FETCH_TRACKS_FULFILLED:
            return action.payload;
        default:
            return state;
    }
    
}

export default TracksReducer