import { combineReducers } from 'redux';
import {bookReducer} from './book_reducer';
import {userReducer} from './user_reducer';
import {searchReducer} from './search_reducer';

export const rootReducer = combineReducers({
    bookReducer,
    userReducer,
    searchReducer
});

