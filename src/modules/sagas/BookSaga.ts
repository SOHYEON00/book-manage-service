import * as types from '../types';
import * as api from '../api';
import {call, put, takeLatest} from 'redux-saga/effects';
import {sheetsItemType, sheetsItemValueType} from 'propsTypes';

// 구글 시트의 도서 리스트 GET api 호출하는 사가
function* getBookListDBSaga() {

    // 인자로 받은 구글 시트 데이터 중, 도서 정보가 제대로 입력된 행만 리턴
    const makeBookListData = (sheetsList:Array<sheetsItemType>) => {
        const filteredHasData = sheetsList.filter(e => e.values ); // 시트 값이 있는 경우만 filter

        // 시트 api 응답값 중, 유의미한 데이터만 추출
        const rowValueList = filteredHasData.map((item:sheetsItemType) => {
            let rowItem:Array<string> = [];

                item.values.forEach((tableItem:sheetsItemValueType) => {
                    if(tableItem.formattedValue) { //실제 셀에 값이 있는 경우만 처리
                        rowItem.push(tableItem.formattedValue);
                    }
                });
            return rowItem;
        });
        return rowValueList;
    };

    try {
        const response:[] = yield call(api.getGoogleSheetsData);
        
        // 구글 시트 중, 데이터가 있는 경우 이 변수에 담기게 된다.
        // 배열: [[title, authors, ... ], [], ...]
        let sheetsDataList; 

        response.forEach((item:any) => {
            if(item.data){ // data가 있는 경우만 출력
                sheetsDataList = makeBookListData(item.data[0].rowData)
            } else {
                sheetsDataList = []; // data가 없는 경우
            }
        });

        // 데이터가 있는 행으로 이뤄진 리스트 변수를 스토어에 전달
        yield put({ type: types.GET_LIST_DB_SUCCESS, payload: sheetsDataList}); 

    } catch (error) {
        yield put({ type: types.GET_LIST_DB_FAIL, payload: '실패함'});
    }
};

// 도서 추가 API 실행
function* addBookSaga(params:any) {
    try {
        yield call(api.addBookSheet, params );
        yield put({ type: types.GET_LIST_DB_REQUEST}); //추가 후, 변경된 시트 데이터 읽어오기
    }
    catch {
        yield put({ type: types.ADD_BOOK_FAIL, payload:'failed'});
    }
}

// 도서 대출/반납 시, 시트 내용 업데이트
function* updateBookRentSaga(params:any) {
    try {
        yield call(api.updateBookRentInfo, params.payload);
        yield put({ type: types.GET_LIST_DB_REQUEST});
    } catch(err) {
        yield put({ type: types.UPDATE_BOOK_RENT_FAIL, payload: err.message});
    }
    
    
}

export default function* watchBookSaga() {
    // action 발생 시, saga 실행
    yield takeLatest(types.GET_LIST_DB_REQUEST, getBookListDBSaga); 
    yield takeLatest(types.ADD_BOOK_REQUEST, addBookSaga); 
    yield takeLatest(types.UPDATE_BOOK_RENT_REQUEST, updateBookRentSaga);

};