import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookListItem from './BookListItem';
import Table from 'react-bootstrap/Table';
import * as types from 'modules/types';

const tableStyle = {
    backgroundColor: '#fff',
};
const theadStyle = {
    backgroundColor: '#cbcbcc17',
};

const BookList = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.bookReducer.books);

    useEffect(() => {
        dispatch({type: types.GET_LIST_DB_REQUEST});
    }, []);

    return (
   
        <section>
            <Table hover bordered style={tableStyle}>
                <thead style={theadStyle}>
                    <tr>
                        <th>책 제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>책 형태</th>
                        <th>대출 상태</th>
                        <th>대출 날짜</th>
                    </tr>
                </thead>
                <tbody>
                {list.map((item:any) => { 
                    return (<BookListItem 
                        key={item.id}
                        authors={item.authors}
                        isbn={item.isbn}
                        publisher={item.publisher}
                        title={item.title}
                        isEbook={false}
                        possibleRent ={true}
                        rentDate={'yyyy-mm-dd'}
                    />)})}
                </tbody>  
            </Table>
        </section>
    );
};

export default React.memo(BookList);