import * as types from '../types';
import * as api from '../api';
import {call, put, takeLatest} from 'redux-saga/effects';
import {sheetsItemType, sheetsItemValueType} from 'propsTypes';

// // api 호출 -> 결과를 리덕스에 데이터 추가
function* getBookListDBSaga() {

     // 구글 시트의 유의미한 데이터 리스트 만드는 함수 (row별 입력한 string)
    const makeBookListData = (sheetsList:Array<sheetsItemType>) => {
        const filteredHasData = sheetsList.filter(e => e.values ); // 시트 값이 있는 경우만 filter

        // 시트 api 응답값 중, 유의미한 데이터만 추출
        const rowValueList = filteredHasData.map((item:sheetsItemType) => {
            let rowItem:Array<string> = [];
            
                item.values.forEach((tableItem:sheetsItemValueType) => {
                    if(tableItem.formattedValue) {
                        rowItem.push(tableItem.formattedValue);
                    }
                });
            return rowItem;
        });

        return rowValueList;
    };

    try {
        const response:[] = yield call(api.getGoogleSheetsData);
    
        let sheetsListData;
        response.forEach((item:any) => {
            if(item.data){ // data가 있는 경우만 출력
                sheetsListData = makeBookListData(item.data[0].rowData)
            } else {
                sheetsListData = []; // data가 없는 경우
            }
        });
        // 전달받은 books를 스토어에 전달하기 위해 success 액션 디스패치
        yield put({ type: types.GET_LIST_DB_SUCCESS, payload: sheetsListData}); 

    } catch (error) {
        yield put({ type: types.GET_LIST_DB_FAIL, payload: '실패함'});
    }
};

// 도서 추가 API 실행
function* addBookSaga(params:any) {
    console.log(params);
    try {
        const response:[] = yield call(api.addBookGoogleSheet, params);
        yield put({ type: types.GET_LIST_DB_REQUEST}); //추가 후, 변경된 시트 데이터 읽어오기
    }
    catch {
        yield put({ type: types.ADD_BOOK_FAIL, payload:'failed'});
    }
    

}

export default function* watchBookSaga() {
    // action 발생 시, saga 실행
    yield takeLatest(types.GET_LIST_DB_REQUEST, getBookListDBSaga); 
    yield takeLatest(types.ADD_BOOK_REQUEST, addBookSaga); 

};