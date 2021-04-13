import React from 'react';
import {Button} from 'react-bootstrap';
import {bookListItemType, bookRentType} from 'propsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/reducers';
import * as types from 'modules/types';

interface Props {
    bookItem: bookListItemType;
};


const BookListItem = (props: Props) => {
    const { bookItem} = props;
    const dispatch = useDispatch();

    // 현재 로그인한 유저 정보 
    const {name} = useSelector((state:RootState) => {
        const userReducer = state.userReducer as any;
        return userReducer.userObj;
    });
    
    // 해당 도서의 대출자와 현재 유저 비교
    const chkBorrower = (user:string, bookItem:bookListItemType) => {
        if(bookItem.borrower === name) {
            return <Button variant="danger" onClick={toggleRentBookClick} name="반납">반납</Button>
        } else {
            return <p>{bookItem.borrower} - {bookItem.borrow_date}</p>
        }
    };


    // 대출/반납 버튼
    // click event를 발생시킨 버튼의 name에 따라 동작
    const toggleRentBookClick = (e:React.MouseEvent<HTMLInputElement>) => {
        const buttonName = e.currentTarget.name;
        const isRent = (buttonName==='대출') ? true : false; // 버튼 타입 구별 true:대출, false:반납
       
        const result = window.confirm(`${bookItem.title} 을/를 ${buttonName}하시겠습니까?`);

        if(result) { // 대출or반납 선택
            const today = new Date();
            const month = (today.getMonth()+1 < 10) ? `0${today.getMonth()+1}` : `${today.getMonth()+1}`;
            const day = (today.getDate() < 10) ? `0${today.getDate()}` : `${today.getDate()}`;
            
            const borrowDate = `${today.getFullYear()}-${month}-${day}`;
            
            // 시트 내용 update parameter
            const rentInfo:bookRentType = {
                rowNumber: bookItem.rowNumber,
                borrower: isRent? name : 'null',
                borrow_date: isRent? borrowDate : 'null',
                isRent: isRent
            };

            //시트 내용 update action
            dispatch({ type: types.UPDATE_BOOK_RENT_REQUEST, payload: rentInfo}); 
            
            alert(`${buttonName}이 완료되었습니다.`);
        } else { 
            alert(`${buttonName}이 취소되었습니다.`);
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
                        : chkBorrower(name, bookItem)
                    }
                </td>
            
        </tr>
    );
};

export default BookListItem;

