import React, {useState} from 'react';
import {apiBookItemType} from 'propsTypes';
import { Button } from 'react-bootstrap';
import AddBookModal from './AddBookModal';

interface Props {
    book: apiBookItemType
}

const ApiBookListItem = (props:Props) => {
    const {book} = props;
    const [modalOpen, setModalOpen] = useState(false);

    const onAddBookClick = (event:any) => {
        // const {value} = event.target;
        // const parsedValue = JSON.parse(value);
        modalHandler();
    };

    const modalHandler = () => {
        setModalOpen(prev => !prev);
    };

    return (
        <>
            {modalOpen && 
                <AddBookModal book={book} modalHandler={modalHandler}/>
            }
            <tr>
                <td onClick={() => {window.open(book.url)}}>
                    <img src={book.thumbnail} alt='도서 표지'/>
                </td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.publisher}</td>
                <td>{book.isEbook ? 'Ebook' : '출판도서'}</td>
                <td>{book.status}</td>
                <td>{book.price}</td>
                <td><Button onClick={onAddBookClick} value={JSON.stringify(book)}>도서 추가</Button></td>
            </tr> 
        </>
    );
};

export default ApiBookListItem;