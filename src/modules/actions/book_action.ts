import * as types from '../types';


interface GetBookListDBAction {
    type: typeof types.GET_LIST_DB_REQUEST
}

interface GetBookListDBSuccessAction {
    type: typeof types.GET_LIST_DB_SUCCESS,
    payload: []
}

interface GetBookListDBActionFail {
    type: typeof types.GET_LIST_DB_FAIL,
    payload: string
}

interface GetGoogleActionType {
    type: typeof types.GET_GOOGLE_LIST
}

interface addBookActionType {
    type: typeof types.ADD_BOOK_REQUEST,
    payload: []
}

interface addBookFailActionType {
    type: typeof types.ADD_BOOK_FAIL,
    payload: string
}

export const addBookRequestAction = (newBook:[]):addBookActionType => ({
    type: types.ADD_BOOK_REQUEST,
    payload: newBook
});

export const addBookFailAction = (payload:string):addBookFailActionType => ({
    type: types.ADD_BOOK_FAIL,
    payload: payload
});

export const getGoogleAction = ():GetGoogleActionType => ({
    type: types.GET_GOOGLE_LIST,
});

export const getBookListDB = ():GetBookListDBAction => ({
    type: types.GET_LIST_DB_REQUEST,
});

// //data 타입 확인
export const getBookListDBSuccess = (bookList:[]):GetBookListDBSuccessAction => ({
    type: types.GET_LIST_DB_SUCCESS,
    payload: bookList
});

export const getBookListDBFail = (payload:string):GetBookListDBActionFail => ({
    type: types.GET_LIST_DB_FAIL,
    payload: payload
});

export type BookActionsTypes =
    | ReturnType<typeof getBookListDB>
    | ReturnType<typeof getBookListDBSuccess>
    | ReturnType<typeof getBookListDBFail>
    | ReturnType<typeof getGoogleAction>
    | ReturnType<typeof addBookRequestAction>
    | ReturnType<typeof addBookFailAction>;

