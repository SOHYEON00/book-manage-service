import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import BookListItem from 'components/BookListItem';
import Table from 'react-bootstrap/Table';
import ApiBookList, {apiBookItemType} from 'components/ApiBookList';
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
    const [apiBookList, setApiBookList] = useState<Array<apiBookItemType>>([]);

    // 카카오 오픈 api 요청
    const getBookList = async(text:string) => {
        await axios.get('https://dapi.kakao.com/v3/search/book', {
        params: {
            size: 5,
            page: 1,
            target: 'title', 
            query: text,
            sort: 'recency'
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
        let filtered;
        if(text !== ''){ // 검색어 있는 경우
            filtered = list.filter((listItem:any) => listItem.title.includes(text));
            setTimeout(() => {getBookList(text)}, 1000);

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
        </section>
        <hr />
        <ApiBookList apiBookList={apiBookList}/>
        </>
    );
};

export default React.memo(BookList);