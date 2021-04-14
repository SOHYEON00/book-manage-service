import {SearchActionTypes} from '../actions/search_action';
import * as types from '../types';

export const initialState = {
    text: ''
};

export const searchReducer = (state=initialState, action:SearchActionTypes) => {
    switch(action.type){
        case types.SET_TEXT_REQUEST: 
            return {
                ...state,
                text: action.payload
            };
        case types.SET_TEXT_FAIL:
            return {
                ...state,
            };

        default: return { ...state };
    }
}
