import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookList from './BookList';
import Nav from './Nav';
import * as types from 'modules/types';

const MainComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: types.GET_LIST_DB_REQUEST}); // 전체 도서리스트 Get요청
    }, []);

    return(
        <>
            <Nav />
            <BookList />
        </>
    );
};

export default MainComponent;