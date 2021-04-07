import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import ApiBookListItem from 'components/ApiBookListItem';
import {tableStyle, theadStyle} from 'styleComponent';
import {apiBookItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';
import {getApiBookList} from 'modules/api';
import PaginationComponent from './Pagination';


const ApiBookList = () => {
    const text = useSelector((state:RootState) => state.searchReducer.text);
    const [apiBookList, setApiBookList] = useState([]);
    const [endPage, setEndPage] = useState(1); // 마지막 페이지
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 넘버

    useEffect(() => {
        // text 값이 있는 경우만 api 요청
        if(text !== '') {
            const apiResponse = getApiBookList(text, currentPage); // promise 반환
            apiResponse
                .then((result) => { // { documents: 도서리스트, meta }
                    setApiBookList(result.documents);
                    // meta: {is_end, pageable_count}
                    setEndPage(result.meta.pageable_count);
                })
                .catch((err) => console.log(err));
        }
    }, [text]);

    const onClickPageBox = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const clickedElem = JSON.parse(id);

        if(clickedElem.type === 'page') {
            setCurrentPage(clickedElem.pageNum);
        } else if(clickedElem.type === 'next') {
            setCurrentPage(currentPage + 5);
        } else if(clickedElem.type === 'prev') {
            setCurrentPage(currentPage - 5);
        } else {
            setCurrentPage(currentPage);
        }
        
    };

    return (
        <section>
            <Table hover bordered style={tableStyle}>
                <thead style={theadStyle}>
                    <tr>
                        <th>도서 표지</th>
                        <th>도서 제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>도서 형태</th>
                        <th>판매상황</th>
                        <th>가격</th>
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
            {endPage}
            <PaginationComponent endPage={endPage} currentPage={currentPage} onClickEvent={onClickPageBox}/>
        </section>
    )
};

export default ApiBookList;