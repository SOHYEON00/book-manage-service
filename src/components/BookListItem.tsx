import React, { ReactEventHandler } from 'react';
import {Button} from 'react-bootstrap';
import {bookListItemType, bookRentType, userObjType} from 'propsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/reducers';
import * as types from 'modules/types';

interface Props {
    bookItem: bookListItemType,
}


const BookListItem = (props: Props) => {
    // title, authors, publisher, isEbook, isRent, rentDate, checkRent
    const { bookItem} = props;
    const dispatch = useDispatch();

    const userObj = useSelector((state:RootState) => {
        const userReducer = state.userReducer as any;
        return userReducer.userObj;
    });
    
    // 해당 도서의 대출자와 현재 유저 비교
    const chkBorrower = (user:userObjType, bookItem:bookListItemType) => {

        if(bookItem.borrower === user.name) {
            return <Button variant="danger" onClick={toggleRentBookClick} name="반납">반납</Button>
        } else {
            return <p>{bookItem.borrower} - {bookItem.borrow_date}</p>
        }
    };


    // 대출 버튼
    const toggleRentBookClick = (e:React.MouseEvent<HTMLInputElement>) => {
        const {name} = e.currentTarget;
        const isRent = (name==='대출') ? true : false;
       
        const result = window.confirm(`${bookItem.title} 을/를 ${name}하시겠습니까?`);

        if(result) { // 대출or반납 선택
            const today = new Date();
            const borrowDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
            
            // 시트 내용 update parameter
            const rentInfo:bookRentType = {
                rowNumber: bookItem.rowNumber,
                borrower: isRent? userObj.name : 'null',
                borrow_date: isRent? borrowDate : 'null',
                isRent: isRent
            };

            //시트 내용 update action
            dispatch({ type: types.UPDATE_BOOK_RENT_REQUEST, payload: rentInfo}); 
            
            alert(`${name}이 완료되었습니다.`);
        } else { // 대출or반납 취소
            alert(`${name}이 취소되었습니다.`);
        }
    };
    

    return(
        <tr>
           <td onClick={() => {window.open(bookItem.url)}}>
                    <img src={bookItem.thumbnail} alt='도서 표지'/>
                </td>
                <td className="align-middle">{bookItem.title}</td>
                <td className="align-middle">{bookItem.authors}</td>
                <td className="align-middle"> {bookItem.publisher}</td>
                <td className="align-middle">{bookItem.isEbook ? 'Ebook' : '출판도서'}</td>
                <td className="align-middle">
                    {!bookItem.isRent 
                        ? <Button onClick={toggleRentBookClick} name="대출">대출가능</Button> 
                        : chkBorrower(userObj, bookItem)
                    }
                </td>
            
        </tr>
    );
};

export default BookListItem;

