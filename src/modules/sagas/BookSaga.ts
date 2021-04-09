import * as types from '../types';
import * as api from '../api';
import {call, all, put, fork, takeLatest, take, takeEvery} from 'redux-saga/effects';
import { getGoogleAction } from 'modules/actions/book_action';
import {sheetsItemType, sheetsItemValueType} from 'propsTypes';


function* getBookListDBSaga() {
    // // api 호출 -> 결과를 리덕스에 데이터 추가

    const makeBookListData = (sheetsList:Array<sheetsItemType>) => {

        // 구글 시트의 유의미한 데이터 리스트 (row별 입력한 string)
        const rowValueList = sheetsList.map((item:sheetsItemType) => {
            let rowItem:Array<string> = [];
            item.values.forEach((tableItem:sheetsItemValueType) => {
                rowItem.push(tableItem.formattedValue);
            })
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


export default function* watchBookSaga() {
    // action 발생 시, saga 실행
    yield takeLatest(types.GET_LIST_DB_REQUEST, getBookListDBSaga);  

};