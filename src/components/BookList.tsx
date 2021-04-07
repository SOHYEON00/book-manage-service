import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import BookListItem from 'components/BookListItem';
import Table from 'react-bootstrap/Table';
import ApiBookList from 'components/ApiBookList';
import {tableStyle, theadStyle} from 'styleComponent';
import {bookListItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';
import * as types from 'modules/types';
import PaginationComponent from './Pagination';

const BookList = () => {
    const dispatch = useDispatch();

    const text = useSelector((state:RootState) => state.searchReducer.text);
    const list = useSelector((state:RootState) => state.bookReducer.books);
    const [bookList, setBookList] = useState(list);
    const [endPage, setEndPage] = useState(1); // 마지막 페이지
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 넘버

    // 마지막 페이지 계산
    const calEndPage = (posts:number) => {
        const postPerPage = 5;
        return Math.ceil(posts / postPerPage) ;
    };

    const onClickPageBox = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const clickedElem = JSON.parse(id);

        // 클릭된 페이지박스 타입별 동작
        if(clickedElem.type === 'page') {
            setCurrentPage(clickedElem.pageNum);
        } else if(clickedElem.type === 'next') {
            setCurrentPage(currentPage + 3);
        } else if(clickedElem.type === 'prev') {
            setCurrentPage(currentPage - 3);
        } else { // 예외
            setCurrentPage(currentPage);
        }
        
    };

    useEffect(() => {
        dispatch({type: types.GET_LIST_DB_REQUEST}); // 전체 도서리스트 Get요청;
        // dispatch({type: types.GET_LIST_DB_REQUEST}); // 전체 도서리스트 Get요청;
        let filtered; 

        if(text !== ''){ // 검색어 있는 경우
            filtered = list.filter((listItem:any) => listItem.title.includes(text));
        } else { // 검색어 없는 경우
            filtered = list;
        }
        setBookList(filtered); 
    }, [text, list]); 

    return (
        <>
        <section>
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
                    
                {bookList.map((item:bookListItemType) => { 
                    item.isRent = false; // 대출/반납 기능 구현 시, 여기서 값 변경
                    return (
                        <BookListItem 
                            key={`${item.title}/${item.isbn}`}
                            bookItem={item}
                        />
                    )})}
                </tbody>  
            </Table>
            <PaginationComponent endPage={endPage} currentPage={currentPage} onClickEvent={onClickPageBox}/>
        </section>
        <hr />
        <ApiBookList />
        </>
    );
};

export default React.memo(BookList);