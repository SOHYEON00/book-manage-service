import React, { useEffect, useState } from 'react';
import BookListItem from 'components/BookListItem';
import Table from 'react-bootstrap/Table';
import ApiBookList from 'components/ApiBookList';
import { useSelector } from 'react-redux';
import {bookListItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';

import {titleStyle} from 'styleComponent';
import PaginationComponent from './Pagination';
import {LAST_PAGE, PREVIEW_COUNT, POSTS_PER_PAGE} from 'modules/types';


const BookList = () => {
    const text = useSelector((state:RootState) => state.searchReducer.text);
    const list = useSelector((state:RootState) => state.bookReducer.books);
    const [bookList, setBookList] = useState(list);
    const [endPage, setEndPage] = useState(LAST_PAGE); // 마지막 페이지
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 넘버

    const onClickPageBox = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const clickedElem = JSON.parse(id);

        // 클릭된 페이지박스 타입별 동작
        if(clickedElem.type === 'page') {
            setCurrentPage(clickedElem.pageNum);
        } else if(clickedElem.type === 'next') {

            setCurrentPage(currentPage + PREVIEW_COUNT);
        } else if(clickedElem.type === 'prev') {
            setCurrentPage(currentPage - PREVIEW_COUNT);
        } else { // 예외
            setCurrentPage(currentPage);
        }
    };

    // 한 페이지 당, POSTS_PER_PAGE개씩 출력
    const printPostByPage = (page:number, list:any) => {
        return list.slice(POSTS_PER_PAGE*(page-1), POSTS_PER_PAGE*page);
    };

    const calEndPage = (posts:number) => {
        // 최대 요청 페이지 수를 넘을 경우
        return Math.ceil(posts / POSTS_PER_PAGE);
    };

    // ---- book list 관련 ---

    // array to JSON
    const arrToJson = (arr:Array<string>, properties:Array<string>) => {
        let object:any = {};
        
        for(let i=0; i<properties.length; i++) {
            let paramData;
    
            if(arr[i] === 'TRUE') {
                paramData = true;
            } else if(arr[i] === 'FALSE') {
                paramData = false;
            } else {
                paramData = arr[i];
            }
            object[properties[i]] = paramData;
        } 
        return object;
    };

    // 배열로 받은 구글 시트 데이터를 JSON형태로 바꾼다.
    const makeBookListData = (sheetsList:any) => {
        let objectsList = [];

            for(let i=1; i<sheetsList.length; i++){
                const properties = sheetsList[0]; // title, authors ... 등 객체의 프로퍼티 리스트
                
                // 모든 값이 제대로 들어온 경우만 출력하도록 처리
                if(sheetsList[i].length === properties.length) {
                    const object = arrToJson(sheetsList[i], properties); 
                    objectsList.push(object); 
                }
            };
        return objectsList;
    };

    useEffect(() => {
        const jsonBookList = makeBookListData(list); // array -> json으로 변환한 도서 리스트

        let filtered;

        if(text !== ''){ // 검색어 있는 경우, 검색어가 title로 포함된 책만 반환
            filtered = jsonBookList.filter((listItem:any) => {
                // 시트에 값이 없는 경우 처리
                return listItem.title.includes(text);

            });

        } else { // 검색어 없는 경우
            filtered = jsonBookList;
        }

        setEndPage(calEndPage(filtered.length));
        setBookList(printPostByPage(currentPage, filtered)); 
    }, [text, list, currentPage]); 

    return (
        <>
        <section>
            <p style={titleStyle}>HNINE 도서 리스트</p>
            <Table hover bordered className="table">
                <thead>
                    <tr>
                        <th>도서 표지</th>
                        <th>도서 제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>도서 형태</th>
                        <th>대출 현황</th>
                    </tr>
                </thead>
                <tbody>
                    
                {bookList && bookList.map((item:bookListItemType) => { 
                    // 대출/반납 기능 구현 시, 여기서 값 변경
                    
                    return (
                        <BookListItem 
                            key={`${item.title}/${item.isbn}`}
                            bookItem={item}
                        />
                    )})}
                </tbody>  
            </Table>

            <PaginationComponent endPage={endPage} currentPage={currentPage} onClickEvent={onClickPageBox} />

        </section>
        <hr />
        <ApiBookList />
        </>
    );
};

export default React.memo(BookList);