import {UserActionTypes} from '../actions/user_action';
import * as types from '../types';


const initialState = {
    userObj: {},
    essage: ''
};

export const userReducer = (state=initialState, action:UserActionTypes) => {
    switch(action.type) {
        case types.LOGIN_SUCCESS:
            return {
                userObj: action.payload
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default: 
            return state;
    }
};