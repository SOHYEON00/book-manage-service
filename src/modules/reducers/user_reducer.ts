import {UserActionTypes} from '../actions/user_action';
import * as types from '../types';

export const initialState = {
    userObj: {},
    isLoggin: false,
    error: ''
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
                error: action.payload
            };
        default: 
            return {
                ...state
            };
    }
};