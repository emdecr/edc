import {
    FETCH_SHELF_ITEMS, 
    FETCH_SHELF_ITEMS_FULFILLED
} from '../constants/ActionTypes';

const ShelfReducer = function(state = [], action) {
    // console.log('action received', action);
    switch (action.type) {
        case FETCH_SHELF_ITEMS_FULFILLED:
            return action.payload;
        default:
            return state;
    }
    
}

export default ShelfReducer