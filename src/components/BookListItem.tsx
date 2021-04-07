import React from 'react';
import {Button} from 'react-bootstrap';
import {bookListItemType} from 'propsTypes';

interface Props {
    bookItem: bookListItemType
}


const BookListItem = (props: Props) => {
    // title, authors, publisher, isEbook, isRent, rentDate, checkRent
    const { authors, publisher, title, isEbook, isRent } = props.bookItem;

    const rentBookClick = () => {
        const result = window.confirm(`${title} 을/를 대출하시겠습니까?`);

        if(result) { // 대출 선택
            // 대출한다
            // db에 정보 반영 - borrower, isRent
            alert('대출이 완료되었습니다.');
        } else { // 대출 취소
            alert('대출이 취소되었습니다.');
        }
    };
    

    return(
        <tr>
            <td>{title}</td>
            <td>{authors}</td>
            <td>{publisher}</td>           
            <td>{isEbook ? 'Ebook' : '출판도서'}</td>
            <td>{!isRent 
                ? <Button onClick={rentBookClick}>대출가능</Button> 
                : '대출불가'}</td>
            
        </tr>
    );
};

export default BookListItem;

