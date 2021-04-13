import React, {useState} from 'react';
import {apiBookItemType} from 'propsTypes';
import { Button } from 'react-bootstrap';
import ModalComponent from 'modal_portal/AddBookModal';
import sliceAuthorArray from 'utilities/sliceArray';

interface Props {
    book: apiBookItemType;
};

const ApiBookListItem = (props:Props) => {
    const {book} = props;
    const [modalOpen, setModalOpen] = useState(false);
    const isSell = (book.status==='정상판매') ? true : false;

    const modalHandler = () => {
        setModalOpen(prev => !prev);
    };
    
    return (
        <>
            {modalOpen && 
                <ModalComponent book={book} modalHandler={modalHandler}/>
            }
 
            <tr>
                <td onClick={() => {window.open(book.url)}} className="hoverThumbnail">
                    <img src={book.thumbnail} alt='도서 표지'/>
                </td>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle">{sliceAuthorArray(book.authors)}</td>
                <td className="align-middle">{book.publisher}</td>
                <td className="align-middle">{book.isEbook ? 'Ebook' : '출판도서'}</td>
                <td className="align-middle">{isSell ? book.status : '판매 중지'}</td>
                <td className="align-middle">{isSell ? book.sale_price : book.price}</td>
                <td className="align-middle">
                    { isSell
                        ? <Button onClick={modalHandler} value={JSON.stringify(book)}>도서 추가</Button>
                        : <span>판매 중지</span>
                    }
                </td>
            </tr> 
        </>
    );
};

export default ApiBookListItem;