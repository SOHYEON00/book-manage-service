import React, {useEffect} from 'react';
import BookList from './BookList';
import {useDispatch } from 'react-redux';

import * as types from 'modules/types';
import Searchbar from './Searchbar';

const MainComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: types.GET_LIST_DB_REQUEST}); // 전체 도서리스트 Get요청
    }, [dispatch]);


    return(
        <>
            <Searchbar />
            <BookList />
        </>
    );
};

export default MainComponent;