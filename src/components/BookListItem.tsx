import React from 'react';
import {Button} from 'react-bootstrap';
import {bookListItemType} from 'propsTypes';

interface Props {
    bookItem: bookListItemType
}


const BookListItem = (props: Props) => {
    // title, authors, publisher, isEbook, isRent, rentDate, checkRent
    const { bookItem } = props;

    const rentBookClick = () => {
        const result = window.confirm(`${bookItem.title} 을/를 대출하시겠습니까?`);

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
           <td onClick={() => {window.open(bookItem.url)}}>
                    <img src={bookItem.thumbnail} alt='도서 표지'/>
                </td>
                <td>{bookItem.title}</td>
                <td>{bookItem.authors}</td>
                <td>{bookItem.publisher}</td>
                <td>{bookItem.isEbook ? 'Ebook' : '출판도서'}</td>
            <td>{!bookItem.isRent 
                ? <Button onClick={rentBookClick}>대출가능</Button> 
                : <p> {bookItem.borrower} - {bookItem.borrow_date}
                    </p>}</td>
            
        </tr>
    );
};

export default BookListItem;

