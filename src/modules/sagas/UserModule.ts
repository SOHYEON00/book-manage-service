// import { call, put } from '@redux-saga/core/effects';
// import * as types from '../types';

// // get useractions types

// interface GetUserActionType {
//     type: typeof types.GET_USER_REQUEST,
// };

// interface GetUserSuccessActionType {
//     type: typeof types.GET_USER_SUCCESS,
//     payload: object
// };

// interface GetUserFailActionType {
//     type: typeof types.GET_USER_FAIL,
//     payload: string
// }

// // set user action types

// interface SetUserActionType {
//     type: typeof types.SET_USER_DATA,
// };

// interface SetUserSuccessActionType {
//     type: typeof types.SET_USER_SUCCESS,
//     payload: object
// };

// interface SetUserFailActionType {
//     type: typeof types.SET_USER_FAIL,
//     payload: string
// }

// // actions

// const getUserAction = ():GetUserActionType => ({
//     type: types.GET_USER_REQUEST
// });
// const getUserSuccessAction = (userObj:object):GetUserSuccessActionType => ({
//     type: types.GET_USER_SUCCESS,
//     payload: userObj
// });
// const getUserFailAction = (payload:string):GetUserFailActionType => ({
//     type: types.GET_USER_FAIL,
//     payload: payload
// });

// const setUserAction = ():SetUserActionType => ({
//     type: types.SET_USER_DATA,
// });
// const setUserSuccessAction = (userObj:object):SetUserSuccessActionType => ({
//     type: types.SET_USER_SUCCESS,
//     payload: userObj
// });
// const setUserFailAction = (payload:string):SetUserFailActionType => ({
//     type: types.SET_USER_FAIL,
//     payload: payload
// });

// type UserActionTypes = 
//     | ReturnType<typeof getUserAction>
//     | ReturnType<typeof getUserSuccessAction>
//     | ReturnType<typeof getUserFailAction>
//     | ReturnType<typeof setUserAction>
//     | ReturnType<typeof setUserSuccessAction>
//     | ReturnType<typeof setUserFailAction>;


// // reducer

// const initialState = {
//     userObj: {}
// }

// const userReducer = (state=initialState, action:UserActionTypes) => {
//     console.log(action);

//     switch(action.type) {
//         case types.GET_USER_SUCCESS:
//             return {}
//         case types.SET_USER_SUCCESS:
//             return {
//                 ...state,
//                 userObj: action.payload
//             };
//         case types.SET_USER_FAIL:
//             return {
//                 ...state
//             }
//         default: 
//             return {
//                 ...state
//             };
//     }
// };

// // get user saga
// export function* userSaga() {
//     try {
//         // const response:any = yield call(api.getUsers);
//         // api call 해서 유저 정보 get
//         // 가져온게 있으면 put set user action
//         // 없으면 catch error -> put set user fail action

//     } catch(error) {
//         yield put({ type: types.GET_LIST_DB_FAIL, payload: 'failed to set user state'});
//     }
// }

// // set user saga

// /*

// */

import { call, put } from '@redux-saga/core/effects';
import * as types from '../types';
import * as apis from '../api';
import { authService } from 'fBase';

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
interface userObjType {
    name: string,
    email: string,
    uid: string,
    isNewUser: boolean
};


// actions
const loginAction = ():LoginActionType => ({
    type: types.LOGIN_REQUEST
});
const loginSuccessAction = (userObj:userObjType):LoginSuccessActionType => ({
    type: types.LOGIN_SUCCESS,
    payload: userObj
});
const loginFailAction = (payload:any):LoginFailActionType => ({
    type: types.LOGIN_FAIL,
    payload: payload
});

type UserActionTypes = 
    | ReturnType<typeof loginAction>
    | ReturnType<typeof loginSuccessAction>
    | ReturnType<typeof loginFailAction>
;

// reducers

const initialState = {
    userObj: {},
    isLoggin: false
};


export const userReducer = (state=initialState, action:UserActionTypes) => {
    console.log(action);

    switch(action.type) {
        case types.LOGIN_SUCCESS:
            return {
                userObj: action.payload,
                isLoggin: true
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
            };
        default: 
            return {
                ...state
            };
    }
};

export function* loginUserSaga() {
    try {
        const response:userObjType = yield call(apis.googleLogin); // firebase google 로그인 시작
        yield put({type: types.LOGIN_SUCCESS, payload: response}); 
        
    } catch(error) {
        yield put({type: types.LOGIN_FAIL, payload: error});
    }
}

