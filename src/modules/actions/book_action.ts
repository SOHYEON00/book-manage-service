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

export const getBookListDB = ():GetBookListDBAction => ({
    type: types.GET_LIST_DB_REQUEST,
})

// //data 타입 확인
export const getBookListDBSuccess = (payload:[]):GetBookListDBSuccessAction => ({
    type: types.GET_LIST_DB_SUCCESS,
    payload: payload
});

export const getBookListDBFail = (payload:string):GetBookListDBActionFail => ({
    type: types.GET_LIST_DB_FAIL,
    payload: payload
})

export type BookActionsTypes =
    | ReturnType<typeof getBookListDB>
    | ReturnType<typeof getBookListDBSuccess>
    | ReturnType<typeof getBookListDBFail>;

