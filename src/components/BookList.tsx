import React, { useEffect, useState } from 'react';
import BookListItem from 'components/BookListItem';
import Table from 'react-bootstrap/Table';
import ApiBookList from 'components/ApiBookList';
import { useDispatch, useSelector } from 'react-redux';
import {tableStyle, theadStyle} from 'styleComponent';
import {bookListItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';
import * as types from 'modules/types';



const BookList = () => {
    const dispatch = useDispatch();
    const list = useSelector((state:RootState) => state.bookReducer.books);
    const text = useSelector((state:RootState) => state.searchReducer.text);
    const [bookList, setBookList] = useState(list);

    // const makeBookListData = (sheetsList:any) => {
    //     re
    // };

    // useEffect(() => {
    //     const bookList = makeBookListData(list);

    //     let filtered;

    //     if(text !== ''){ // 검색어 있는 경우
    //         filtered = bookList.filter((listItem:any) => listItem.title.includes(text));
    //         // console.log(text);
    //     } else { // 검색어 없는 경우
    //         filtered = bookList;
    //     }
       
    //     setBookList(filtered); 
    // }, [text, list]); 

    return (
        <>
        <section>
            {JSON.stringify(list)}
            <Table hover bordered style={tableStyle}>
                <thead style={theadStyle}>
                    <tr>
                        <th>도서 제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>도서 형태</th>
                        <th>대출 정보</th>
                    </tr>
                </thead>
                <tbody>
                    
                {/* {bookList && bookList.map((item:bookListItemType) => { 
                    item.isRent = false; // 대출/반납 기능 구현 시, 여기서 값 변경
                    return (
                        <BookListItem 
                            key={`${item.title}/${item.isbn}`}
                            bookItem={item}
                        />
                    )})} */}
                </tbody>  
            </Table>
        </section>
        <hr />
        <ApiBookList />
        </>
    );
};

export default React.memo(BookList);