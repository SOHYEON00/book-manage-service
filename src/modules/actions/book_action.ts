import * as types from '../types';

export interface BookDataParams {
    authors: Array<string>,
    isbn: string,
    price: number,
    publisher: string,
    sale_price: number,
    status: string,
    title: string,
    thumbnail: string,
    translators_url: string
};

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

export const getBookListDB = () => ({
    type: types.GET_LIST_DB_REQUEST,
})

// //data 타입 확인
export const getBooklistDBSuccess = (payload:[]) => ({
    type: types.GET_LIST_DB_SUCCESS,
    payload: payload
   
});

export type BookActionsTypes =
    | GetBookListDBAction
    | GetBookListDBSuccessAction
    | GetBookListDBActionFail;

