import React, { useEffect, useState } from 'react';
import BookListItem from 'components/BookListItem';
import Table from 'react-bootstrap/Table';
import ApiBookList from 'components/ApiBookList';
import { useDispatch, useSelector } from 'react-redux';
import {tableStyle, theadStyle} from 'styleComponent';
import {apiBookItemType, bookListItemType} from 'propsTypes';
import { RootState } from 'modules/reducers';
import * as types from 'modules/types';



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
        let objects = [];
        
        const properties = sheetsList[0];
        for(let i=1; i<sheetsList.length; i++){
            const object = arrToJson(sheetsList[i], properties);
            objects.push(object);
        };
        
        return objects;
    };

    useEffect(() => {
        const jsonBookList = makeBookListData(list);

        let filtered;

        if(text !== ''){ // 검색어 있는 경우
            filtered = jsonBookList.filter((listItem:any) => listItem.title.includes(text));
            // console.log(text);
        } else { // 검색어 없는 경우
            filtered = jsonBookList;
        }
       
        setBookList(jsonBookList); 
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
                    
                {bookList && bookList.map((item:bookListItemType) => { 
                    item.isRent = false; // 대출/반납 기능 구현 시, 여기서 값 변경
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