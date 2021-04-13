import { bookRentType } from 'propsTypes';
import * as types from '../types';

// ADD 
interface addBookActionType {
    type: typeof types.ADD_BOOK_REQUEST;
    payload: [];
};

interface addBookFailActionType {
    type: typeof types.ADD_BOOK_FAIL;
    payload: string;
};

export const addBookRequestAction = (newBook:[]):addBookActionType => ({
    type: types.ADD_BOOK_REQUEST,
    payload: newBook
});

export const addBookFailAction = (payload:string):addBookFailActionType => ({
    type: types.ADD_BOOK_FAIL,
    payload: payload
});

// GET
interface GetBookListDBAction {
    type: typeof types.GET_LIST_DB_REQUEST;
};

interface GetBookListDBSuccessAction {
    type: typeof types.GET_LIST_DB_SUCCESS;
    payload: [];
};

interface GetBookListDBActionFail {
    type: typeof types.GET_LIST_DB_FAIL;
    payload: string;
};

export const getBookListDB = ():GetBookListDBAction => ({
    type: types.GET_LIST_DB_REQUEST,
});

export const getBookListDBSuccess = (bookList:[]):GetBookListDBSuccessAction => ({
    type: types.GET_LIST_DB_SUCCESS,
    payload: bookList
});

export const getBookListDBFail = (payload:string):GetBookListDBActionFail => ({
    type: types.GET_LIST_DB_FAIL,
    payload: payload
});

// UPDATE
interface UpdateBookActionType {
    type: typeof types.UPDATE_BOOK_RENT_REQUEST;
    payload: bookRentType;
};

interface UpdateBookFailActionType {
    type: typeof types.UPDATE_BOOK_RENT_FAIL;
    payload: string;
};

export const updateBookRentAction = (payload:bookRentType):UpdateBookActionType => ({
    type: types.UPDATE_BOOK_RENT_REQUEST,
    payload: payload 
});

export const updateBookRentFailAction = (payload:''):UpdateBookFailActionType => ({
    type: types.UPDATE_BOOK_RENT_FAIL,
    payload: payload
});


export type BookActionsTypes =
    | ReturnType<typeof getBookListDB>
    | ReturnType<typeof getBookListDBSuccess>
    | ReturnType<typeof getBookListDBFail>
    | ReturnType<typeof addBookRequestAction>
    | ReturnType<typeof addBookFailAction>
    | ReturnType<typeof updateBookRentAction>
    | ReturnType<typeof updateBookRentFailAction>;

