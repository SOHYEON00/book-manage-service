import {  takeLatest } from "@redux-saga/core/effects";
import { GET_LIST_DB_REQUEST, LOGIN_REQUEST } from "modules/types";
import { getBookListDBSaga } from "./BookSaga";
import { loginUserSaga } from "./UserModule";

// 액션 실행할 사가들을 봐주는 rootSaga
function* rootSaga() {

    yield takeLatest(LOGIN_REQUEST, loginUserSaga);
    yield takeLatest(GET_LIST_DB_REQUEST, getBookListDBSaga);
    // yield all([getBookListDBSaga()]);
}

export default rootSaga;
