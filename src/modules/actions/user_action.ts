import * as types from '../types';
import {userObjType} from 'propsTypes';

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

interface AuthToHnineActionType {
    type: typeof types.AUTH_TO_HNINE,
    payload: object
};

interface AuthToHnineSuccessActionType {
    type: typeof types.AUTH_TO_HNINE_SUCCESS
};

interface AuthToHnineFailActionType {
    type: typeof types.AUTH_TO_HNINE_FAIL,
    payload: string
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

export const authToHnineAction = (payload:userObjType):AuthToHnineActionType => ({
    type: types.AUTH_TO_HNINE,
    payload: payload
});

export const authToHnineSuccessAction = ():AuthToHnineSuccessActionType => ({
    type: types.AUTH_TO_HNINE_SUCCESS
});

export const authToHnineFailAction = (payload:string):AuthToHnineFailActionType => ({
    type: types.AUTH_TO_HNINE_FAIL,
    payload: payload
});

export type UserActionTypes = 
    | ReturnType<typeof loginAction>
    | ReturnType<typeof loginSuccessAction>
    | ReturnType<typeof loginFailAction>
    | ReturnType<typeof authToHnineAction>
    | ReturnType<typeof authToHnineSuccessAction>
    | ReturnType<typeof authToHnineFailAction>
;
