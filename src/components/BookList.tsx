import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import BookListItem from './BookListItem';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const tableStyle = {
    backgroundColor: '#fff',
};
const theadStyle = {
    backgroundColor: '#cbcbcc17',
};

interface Prop {
    list: any
}
const BookList = (props:Prop) => {
    const {list} = props;
    const text = useSelector(state => state.searchReducer.text);
    const [bookList, setBookList] = useState(list);
    const [apiBookList, setApiBookList] = useState([]);

    // 카카오 오픈 api 요청
    const getBookList = async(text:string) => {
        await axios.get('https://dapi.kakao.com/v3/search/book', {
        params: {
            size: 5,
            page: 1,
            target: 'title', 
            query: text
        },
        headers: {
            Authorization: 'KakaoAK 944c0144b818850f00f4dc844d53751b',
        }
        })
        .then((res) => {
            setApiBookList(res.data.documents);
        }).catch( (error) => {console.log(error.message);});
    }; 


    useEffect(() => {
        if(text !== ''){ // 검색어 있는 경우
            const filtered = list.filter((listItem:any) => listItem.title.includes(text));
            setBookList(filtered); 
            getBookList(text); // 오픈 api 요청
            console.log(text);
        } else { // 검색어 없는 경우
            setBookList(list);
        }
    }, [text, list]); 

    return (
        <section>
            <Table hover bordered style={tableStyle}>
                <thead style={theadStyle}>
                    <tr>
                        <th>책 제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>책 형태</th>
                        <th>대출 정보</th>
                    </tr>
                </thead>
                <tbody>
                    
                {bookList.map((item:any) => { 
                    return (
                        <BookListItem 
                            key={item.id}
                            authors={item.authors}
                            isbn={item.isbn}
                            publisher={item.publisher}
                            title={item.title}
                            isEbook={false}
                            possibleRent ={true}
                        />
                    )})}
                </tbody>  
            </Table>
            { text && (JSON.stringify(apiBookList))}
        </section>
    );
};

export default React.memo(BookList);