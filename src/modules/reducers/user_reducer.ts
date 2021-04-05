import {UserActionTypes} from '../actions/user_action';
import * as types from '../types';

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