import { BookActionsTypes} from '../actions/book_action';
import * as types from '../types';

// interface stateBookType {
//     authors: [],
//     title: string,
//     publisher: string,
//     id: string,
//     isEbook: boolean,
//     isRent: boolean,
//     borrower: string
// };

export const initialState = {
    books: []
};

    export const bookReducer = (state=initialState, action:BookActionsTypes) => {
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
