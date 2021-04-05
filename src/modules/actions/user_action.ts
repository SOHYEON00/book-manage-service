import * as types from '../types';

interface LoginActionType {
    type: typeof types.LOGIN_REQUEST,
};

interface LoginSuccessActionType {
    type: typeof types.LOGIN_SUCCESS,
    payload: object
};

interface LoginFailActionType {
    type: typeof types.LOGIN_FAIL,
    payload: string
};

export interface userObjType {
    name: string,
    email: string,
    uid: string,
    isNewUser: boolean
};


// actions
export const loginAction = ():LoginActionType => ({
    type: types.LOGIN_REQUEST
});
export const loginSuccessAction = (userObj:userObjType):LoginSuccessActionType => ({
    type: types.LOGIN_SUCCESS,
    payload: userObj
});
export const loginFailAction = (payload:any):LoginFailActionType => ({
    type: types.LOGIN_FAIL,
    payload: payload.message
});

export type UserActionTypes = 
    | ReturnType<typeof loginAction>
    | ReturnType<typeof loginSuccessAction>
    | ReturnType<typeof loginFailAction>
;
