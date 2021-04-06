import React from 'react';
import { Table } from 'react-bootstrap';
import ApiBookListItem from 'components/ApiBookListItem';
import {tableStyle, theadStyle} from 'styleComponent';

export interface apiBookItemType {
    thumbnail: string,
    title: string,
    authors: Array<string>,
    publisher: string,
    isEbook: boolean,
    status: string,
    price: number,
    salePrice: number,
    isbn: string,
    url: string
};

interface Prop {
    apiBookList: Array<apiBookItemType>
};

const ApiBookList = (props:Prop) => {
    const {apiBookList} = props;
    console.log(apiBookList);

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
        </section>
    )
};

export default ApiBookList;