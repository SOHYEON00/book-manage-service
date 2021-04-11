export const GET_LIST_DB_REQUEST = 'book/GET_LIST_DB_REQUEST' as const; // 요청
export const GET_LIST_DB_SUCCESS = 'book/GET_LIST_DB_SUCCESS' as const; // 성공
export const GET_LIST_DB_FAIL = 'book/GET_LIST_DB_FAIL' as const; // 실패

// export const GET_USER_REQUEST = 'user/GET_USER_REQUEST';
// export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
// export const GET_USER_FAIL = 'user/GET_USER_FAIL';

// export const SET_USER_DATA = 'user/SET_USER_DATA';
// export const SET_USER_SUCCESS = 'user/SET_USER_SUCCESS';
// export const SET_USER_FAIL = 'user/SET_USER_FAIL';

export const GET_GOOGLE_LIST = 'google/GET_GOOGLE_LIST' as const;

export const LOGIN_REQUEST = 'user/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const; 
export const LOGIN_FAIL = 'user/LOGIN_FAIL' as const;

// set search text into store
export const SET_TEXT_REQUEST = 'book/SET_TEXT_REQUEST' as const;
export const SET_TEXT_SUCCESS = 'book/SET_TEXT_SUCCESS' as const;
export const SET_TEXT_FAIL = 'book/SET_TEXT_FAIL' as const;

export const SEARCH_API_REQUEST = 'book/SEARCH_API_REQUEST';
export const SEARCH_API_SUCCESS = 'book/SEARCH_API_SUCCESS';
export const SEARCH_API_FAIL = 'book/SEARCH_API_FAIL';


// google spread sheed 관련 params 변수
export const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
// export const spreadsheetId='19PGyzWr2wRU4-ghmhbVnWLA6LTESip16mnOVfFe8ASM';
// export const CLIENT_ID = '385551841011-kipr196rpa6sdeemomfg8pemlmgkniiq.apps.googleusercontent.com';

export const ADD_BOOK_REQUEST = 'book/ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'book/ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAIL = 'book/ADD_BOOK_FAIL';