import * as types from '../types';
import * as api from '../api';
import {call, put, takeLatest} from 'redux-saga/effects';


function* getBookListDBSaga() {
    // // api 호출 -> 결과를 리덕스에 데이터 추가

    try {
        // 인자로 받은 api.getBooklistDB를 실행함
        // api.getBooklistDB가 프로미스를 반환해 성공 시 북리스트 books에 전달
        const response:[]= yield call(api.getBooks);
        // 전달받은 books를 스토어에 전달하기 위해 success 액션 디스패치
        yield put({ type: types.GET_LIST_DB_SUCCESS, payload: response}); 
        
        
    } catch (error) {
        yield put({ type: types.GET_LIST_DB_FAIL, payload: '실패함'});
    }
};

export default function* watchBookSaga() {
    yield takeLatest(types.GET_LIST_DB_REQUEST, getBookListDBSaga);
    // yield takeEvery(types.SET_TEXT_REQUEST, )
    
};