

import { call, put, takeLatest } from '@redux-saga/core/effects';
import * as types from '../types';
import * as apis from '../api';
import {userObjType} from 'propsTypes';

function* loginUserSaga() {
    try {
        const response:userObjType = yield call(apis.googleLogin); // firebase google 로그인 시작
        yield put({ type: types.LOGIN_SUCCESS, payload:response});
        
    } catch(error) {
        yield put({type: types.LOGIN_FAIL, payload: error});
    }
}

export default function* watchLoginUser() {
    yield takeLatest(types.LOGIN_REQUEST, loginUserSaga);
}