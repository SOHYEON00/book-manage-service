import {  takeLatest } from "@redux-saga/core/effects";
import { GET_LIST_DB_REQUEST } from "modules/types";
import { getBookListDBSaga } from "./BookSaga";


function* rootSaga() {
    yield takeLatest(GET_LIST_DB_REQUEST, getBookListDBSaga);
    // yield all([getBookListDBSaga()]);
}

export default rootSaga;
