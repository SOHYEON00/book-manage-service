import * as types from '../types';
import * as api from '../api';
import {call, put} from 'redux-saga/effects';
import { getBookListDBSuccess } from 'modules/actions/book_action';



export function* getBookListDBSaga() {
    // // api 호출 -> 결과를 리덕스에 데이터 추가

    try {
        // 인자로 받은 api.getBooklistDB를 실행함
        // api.getBooklistDB가 프로미스를 반환해 성공 시 북리스트 books에 전달
        const response:[]= yield call(api.getBooks);

        // 전달받은 books를 스토어에 전달하기 위해 success 액션 디스패치
        yield put(getBookListDBSuccess(response)); 
        
        
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_LIST_DB_FAIL, payload: '실패함'});
    }
}