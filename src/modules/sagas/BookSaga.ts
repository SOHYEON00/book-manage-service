import * as types from '../types';
import * as api from '../api';
import {call, all, put, fork, takeLatest, take, takeEvery} from 'redux-saga/effects';
import { getGoogleAction } from 'modules/actions/book_action';


function* getBookListDBSaga() {
    // // api 호출 -> 결과를 리덕스에 데이터 추가

    try {
        const response:[] = yield call(api.getGoogleSheetsData);

        let bookListData;
        response.forEach((item:any) => {
            if(item.data){
                bookListData = item.data[0].rowData;
            }
        });
        
        // 전달받은 books를 스토어에 전달하기 위해 success 액션 디스패치
        yield put({ type: types.GET_LIST_DB_SUCCESS, payload: bookListData}); 

    } catch (error) {
        yield put({ type: types.GET_LIST_DB_FAIL, payload: '실패함'});
    }
};


export default function* watchBookSaga() {
    // action 발생 시, saga 실행
    yield takeLatest(types.GET_LIST_DB_REQUEST, getBookListDBSaga);  

};