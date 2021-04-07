import { combineReducers } from 'redux';
import {bookReducer} from './book_reducer';
import {userReducer} from './user_reducer';
import {searchReducer} from './search_reducer';

const rootReducer = combineReducers({
    bookReducer,
    userReducer,
    searchReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
