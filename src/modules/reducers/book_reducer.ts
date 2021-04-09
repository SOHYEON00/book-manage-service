import { bookListItemType } from 'propsTypes';
import { BookActionsTypes} from '../actions/book_action';
import * as types from '../types';

interface initialStateType {
    books: Array<bookListItemType>
}
export const initialState:initialStateType = {
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
        case types.GET_LIST_DB_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
    
}
