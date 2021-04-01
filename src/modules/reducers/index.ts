import { combineReducers } from 'redux';
import {bookReducer} from './book_reducer';

export const rootReducer = combineReducers({
    bookReducer,
});

