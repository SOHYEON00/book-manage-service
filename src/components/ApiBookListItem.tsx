import React, {useState} from 'react';
import {apiBookItemType} from 'propsTypes';
import { Button } from 'react-bootstrap';
import ModalComponent from 'modal_portal/AddBookModal';

interface Props {
    book: apiBookItemType
}

const ApiBookListItem = (props:Props) => {
    const {book} = props;
    const [modalOpen, setModalOpen] = useState(false);

    const onAddBookClick = () => {
        modalHandler();
    };

    const modalHandler = () => {
        setModalOpen(prev => !prev);
    };

    return (
        <>
            {modalOpen && 
                <ModalComponent book={book} modalHandler={modalHandler}/>
            }

            
            <tr>
                <td onClick={() => {window.open(book.url)}}>
                    <img src={book.thumbnail} alt='도서 표지'/>
                </td>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle">{book.authors}</td>
                <td className="align-middle">{book.publisher}</td>
                <td className="align-middle">{book.isEbook ? 'Ebook' : '출판도서'}</td>
                <td className="align-middle">{book.status}</td>
                <td className="align-middle">{book.price}</td>
                <td className="align-middle"><Button onClick={onAddBookClick} value={JSON.stringify(book)}>도서 추가</Button></td>
            </tr> 
        </>
    );
};

export default ApiBookListItem;