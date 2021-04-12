import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import ApiBookListItem from 'components/ApiBookListItem';
import {apiBookItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';
import {getApiBookList} from 'modules/api';
import PaginationComponent from './Pagination';
import {LAST_PAGE, MAX_PAGE, PREVIEW_COUNT} from 'modules/types';
import { titleStyle } from 'styleComponent';



const ApiBookList = () => {
    const text = useSelector((state:RootState) => state.searchReducer.text);
    const [apiBookList, setApiBookList] = useState([]);
    const [endPage, setEndPage] = useState(LAST_PAGE); // 마지막 페이지
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 넘버

    // 카카오 api 요청 -> api로 받은 도서 리스트, 마지막 페이지 set
    const requestApiBookList = () => {
        const apiResponse = getApiBookList(text, currentPage); // promise 반환
        apiResponse
            .then((result) => { // { documents: 도서리스트, meta }
                setApiBookList(result.documents);
                setEndPage(calEndPage(result.meta.pageable_count));
            })
            .catch((err) => console.log(err));
    };

    // 마지막 페이지 계산
    const calEndPage = (posts:number) => {
        const postPerPage = 5;

        // 최대 요청 페이지 수를 넘을 경우
        return Math.ceil(posts / postPerPage) > MAX_PAGE ? MAX_PAGE : Math.ceil(posts/postPerPage) ;
    };

    useEffect(() => {
        // 검색어 값이 있는 경우만 api 요청
        if(text !== '') {
            requestApiBookList();
        } else { // 검색어 값이 없는 경우, 초기화
            setApiBookList([]);
            setEndPage(LAST_PAGE); 
            setCurrentPage(LAST_PAGE);

        }
    }, [text, currentPage]);

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

    return (
        <section>
            <p style={titleStyle}>카카오 도서 검색 결과</p>
            <Table hover bordered className="table">
                <thead>
                    <tr>
                        <th>도서 표지</th>
                        <th>도서 제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>도서 형태</th>
                        <th>판매상황</th>
                        <th>가격</th>
                        <th>추가하기</th>
                    </tr>
                </thead>
                <tbody>
                    {apiBookList && apiBookList.map((item:apiBookItemType) => {
                        // 도서 형태에 대한 정보가 없는 경우 isEbook = false로 초기화
                        if(!item.isEbook) {
                            item.isEbook = false;
                        }
                            
                        
                        return (
                            <ApiBookListItem
                                book={item}
                                key={`${item.title}/${item.isbn}`}
                            />
                        )
                    })}
                </tbody>
            </Table>

            <PaginationComponent endPage={endPage} currentPage={currentPage} onClickEvent={onClickPageBox}/>
        </section>
    )
};

export default ApiBookList;