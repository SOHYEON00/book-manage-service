import { BookActionsTypes} from '../actions/book_action';
import * as types from '../types';

export const initialState = {
    books: []
};

export const bookReducer = (state=initialState, action:BookActionsTypes) => {
    console.log(action);
    switch(action.type) {
        case types.GET_LIST_DB_REQUEST:
            return {
                 ...state
            };
        case types.GET_LIST_DB_SUCCESS:
            return {
                ...state,
                books: action.payload
            };
        default:
            return state;
    }
}
