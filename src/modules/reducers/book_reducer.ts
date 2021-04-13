import { bookListItemType } from 'propsTypes';
import { BookActionsTypes} from '../actions/book_action';
import * as types from '../types';

interface initialStateType {
    books: Array<bookListItemType>;
};

export const initialState:initialStateType = {
    books: []
};

export const bookReducer = (state=initialState, action:BookActionsTypes) => {
    
    switch(action.type) {
        case types.ADD_BOOK_FAIL:
            return {
                ...state,
            }
        case types.UPDATE_BOOK_RENT_FAIL:
            return {
                ...state
            }
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
