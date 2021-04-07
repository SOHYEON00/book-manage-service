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

export const getBookListDB = ():GetBookListDBAction => ({
    type: types.GET_LIST_DB_REQUEST,
})

// //data 타입 확인
export const getBookListDBSuccess = (bookList:[]):GetBookListDBSuccessAction => ({
    type: types.GET_LIST_DB_SUCCESS,
    payload: bookList
});

export const getBookListDBFail = (payload:string):GetBookListDBActionFail => ({
    type: types.GET_LIST_DB_FAIL,
    payload: payload
})

export type BookActionsTypes =
    | ReturnType<typeof getBookListDB>
    | ReturnType<typeof getBookListDBSuccess>
    | ReturnType<typeof getBookListDBFail>;

