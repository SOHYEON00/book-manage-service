import React from 'react';

interface Props {
    authors: Array<string>,
    isbn: string,
    publisher: string,
    title: string,
    isEbook: boolean,
    possibleRent: boolean,
    rentDate: string
}

const BookListItem = (props: Props) => {
    // title, authors, publisher, isEbook, isRent, rentDate, checkRent
    const { authors, publisher, title, isEbook, possibleRent, rentDate } = props;

    return(
        <tr>
            <td>{title}</td>
            <td>{authors}</td>
            <td>{publisher}</td>           
            <td>{isEbook ? 'Ebook' : '출판도서'}</td>
            <td>{possibleRent ? '대출가능' : '대출불가'}</td>
            <td>{rentDate}</td>
            
        </tr>
    );
};

export default BookListItem;

