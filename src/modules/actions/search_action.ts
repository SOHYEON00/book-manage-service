import * as types from '../types';


interface SetTextActionType {
    type: typeof types.SET_TEXT_REQUEST;
    payload: string;
};

interface SetTextFailActionType {
    type: typeof types.SET_TEXT_FAIL;
    payload: string;
};

export const setTextAction = (text:string):SetTextActionType => ({
    type: types.SET_TEXT_REQUEST,
    payload: text
});
export const setTextFailAction = (payload:string):SetTextFailActionType => ({
    type: types.SET_TEXT_FAIL,
    payload: payload
});


export type SearchActionTypes =
    | ReturnType<typeof setTextAction>
    | ReturnType<typeof setTextFailAction>;

