import {  all, fork, call } from "@redux-saga/core/effects";
import bookSaga from "./BookSaga";
import userSaga from './UserSaga';

// 액션 실행할 사가들을 봐주는 rootSaga
function* rootSaga() {
    yield all([call(userSaga), fork(bookSaga)]);
}

export default rootSaga;
