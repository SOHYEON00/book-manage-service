import React from 'react';
import {apiBookItemType} from 'components/ApiBookList';

interface Props {
    book: apiBookItemType
}

const ApiBookListItem = (props:Props) => {
    const {book} = props;

    return (
            <tr onClick={() => {window.open(book.url)}}> 
                <td>
                    <img src={book.thumbnail} alt='도서 표지'/>
                </td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.publisher}</td>
                <td>{book.isEbook ? 'Ebook' : '출판도서'}</td>
                <td>{book.status}</td>
                <td>{book.price}</td>
            </tr> 
    );
};

export default ApiBookListItem;