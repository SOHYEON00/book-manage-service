import { combineReducers } from 'redux';
import {bookReducer} from './book_reducer';
import {userReducer} from '../sagas/UserModule';

export const rootReducer = combineReducers({
    bookReducer,
    userReducer
});

