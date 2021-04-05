import * as types from '../types';

export interface TextDataType {
    text: string
};

export interface SetTextActionType {
    type: typeof types.SET_TEXT_REQUEST,
    payload: string
};

export interface SetTextFailActionType {
    type: typeof types.SET_TEXT_FAIL,
    payload: string
};

export interface SearchApiActionType {
    type: typeof types.SEARCH_API_REQUEST
};

export interface SearchApiSuccessActionType {
    type: typeof types.SEARCH_API_SUCCESS,
    payload: string
};

export interface SearchApiFailActionType {
    type: typeof types.SEARCH_API_FAIL,
    payload: string
};

export const setTextAction = (text:string):SetTextActionType => ({
    type: types.SET_TEXT_REQUEST,
    payload: text
});
export const setTextFailAction = (payload:string):SetTextFailActionType => ({
    type: types.SET_TEXT_FAIL,
    payload: payload
});

export const searchApiAction = ():SearchApiActionType => ({
    type: types.SEARCH_API_REQUEST
});

export const searchApiSuccessAction = (text:string):SearchApiSuccessActionType => ({
    type: types.SEARCH_API_SUCCESS,
    payload: text
});

export const searchApiFailAction = (payload:string):SearchApiFailActionType => ({
    type: types.SEARCH_API_FAIL,
    payload: payload
});

export type SearchActionTypes =
    | ReturnType<typeof setTextAction>
    | ReturnType<typeof setTextFailAction>
    | ReturnType<typeof searchApiAction>
    | ReturnType<typeof searchApiSuccessAction>
    | ReturnType<typeof searchApiFailAction>;

