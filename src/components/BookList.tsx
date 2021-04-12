import React, { useEffect, useState } from 'react';
import BookListItem from 'components/BookListItem';
import Table from 'react-bootstrap/Table';
import ApiBookList from 'components/ApiBookList';
import { useDispatch, useSelector } from 'react-redux';
import {tableStyle, theadStyle} from 'styleComponent';
import {bookListItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';
import { propTypes } from 'react-bootstrap/esm/Image';


const BookList = () => {
    const dispatch = useDispatch();
    const list = useSelector((state:RootState) => state.bookReducer.books);
    const text = useSelector((state:RootState) => state.searchReducer.text);
    const [bookList, setBookList] = useState(list);

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
    }

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
       
        setBookList(filtered); 
    }, [text, list]); 

    return (
        <>
        <section>
            <Table hover bordered style={tableStyle}>
                <thead style={theadStyle}>
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
        </section>
        <hr />
        <ApiBookList />
        </>
    );
};

export default React.memo(BookList);