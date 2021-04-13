import React, { useEffect, useState } from 'react';
import BookListItem from 'components/BookListItem';
import Table from 'react-bootstrap/Table';
import ApiBookList from 'components/ApiBookList';
import { useSelector } from 'react-redux';
import {bookListItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';
import PaginationComponent from './Pagination';
import {PAGE_NUMBER_ONE, PREVIEW_COUNT, POSTS_PER_PAGE} from 'modules/types';


const BookList = () => {
    const text = useSelector((state:RootState) => state.searchReducer.text);
    const list = useSelector((state:RootState) => state.bookReducer.books);

    const [bookList, setBookList] = useState(list);
    const [endPage, setEndPage] = useState(PAGE_NUMBER_ONE); // 마지막 페이지
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 넘버

    const onClickPageBox = (e:React.MouseEvent<HTMLInputElement>) => {
        const { id } = e.currentTarget;
        const clickedElem = JSON.parse(id); // 페이지네이션 > 페이지박스 타입

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

    // 페이지 당 출력할 도서 리스트
    const printPostByPage = (page:number, list:any) => {
        return list.slice(POSTS_PER_PAGE*(page-1), POSTS_PER_PAGE*page);
    };

    // 마지막 페이지 넘버 계산
    const calEndPage = (posts:number) => {
        return Math.ceil(posts / POSTS_PER_PAGE);
    };

    // 프로퍼티: 도서 데이터 형식의 도서 object 반환
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

    useEffect(() => {
        // 실제 출력에 사용될 도서 object 배열 반환
        const makeBookListData = (sheetsList:any) => {
            let bookObjectList = []; 
        
                for(let i=1; i<sheetsList.length; i++){
                    const properties = sheetsList[0]; // 도서 프로퍼티 리스트
                    
                    // 모든 '열'에 값이 들어있는 경우만 처리
                    if(sheetsList[i].length === properties.length) {
                        let object = arrToJson(sheetsList[i], properties); 

                        object.rowNumber = i+1; // update를 위해 rowNumber 프로퍼티 추가
                        bookObjectList.push(object); 
                    }
                };
            return bookObjectList;
        };

        const jsonBookList = makeBookListData(list); // array -> object로 변환한 도서 리스트
 
        let filtered;
        if(text !== ''){ // 검색어 있는 경우, 검색어가 title로 포함된 도서만 반환

            // 검색어가 변했을 때, 1페이지로 currentPage 변경
            if(currentPage > endPage) {
                setCurrentPage(PAGE_NUMBER_ONE);
            }
            // 검색어가 포함된 책 제목을 가지는 도서 필터
            filtered = jsonBookList.filter((bookItem:any) => {
                return bookItem.title.includes(text);
            });

        } else { // 검색어 없는 경우, 모든 도서 출력
            filtered = jsonBookList;
        }

        setEndPage(calEndPage(filtered.length)); // 마지막 페이지 계산
        setBookList(printPostByPage(currentPage, filtered)); //페이지 별, 도서 리스트 출력
    }, [text, list, currentPage, endPage]); 

    return (
        <>
        <section>
            <h5>HNINE 도서 리스트</h5>
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
                    return (
                        <BookListItem 
                            key={`${item.title}/${item.isbn}`}
                            bookItem={item}
                        />
                    )
                })}
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