import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { apiBookItemType } from 'propsTypes';
import { Button, Form, Modal } from 'react-bootstrap';
import * as types from 'modules/types';
import { useDispatch } from 'react-redux';

interface Props {
    book: apiBookItemType,
    modalHandler: any
};  

const ModalComponent = (props:Props) =>  {

    // book item 정보
    const {book, modalHandler} = props;
    const [title, setTitle] = useState(book.title);
    const [authors, setAuthors] = useState((book.authors).toString());
    const [publisher, setPublisher] = useState(book.publisher);
    const [price, setPrice] = useState(book.price);
    const [url, setUrl] = useState(book.url);

    // 
    const rootModal = document.getElementById('root-modal') as Element;
    const dispatch = useDispatch();

    const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;

        switch(name) {
            case 'title':
                return setTitle(value);
            case 'authors':
                return setAuthors(value.toString());
            case 'publisher':
                return setPublisher(value);
            case 'price':
                return setPrice(parseInt(value));
            case 'url':
                return setUrl(value);
        };
    };

    const onAddBookSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isbn = book.isbn;
        const thumbnail = book.thumbnail;

        const newBook = [title, publisher, authors, thumbnail, url, 'null', 'null', 'FALSE', 'FALSE', isbn];
        dispatch({ type: types.ADD_BOOK_REQUEST, params:newBook});
    };


    const renderModalContent = 
    <div className="modalContainer">
        
    <Modal.Dialog className="modalDiv">
        <Modal.Header closeButton onClick={modalHandler}>
            <h4>Add New Book Form</h4>
        </Modal.Header>
        <form onSubmit={onAddBookSubmit}>
            <img src={book.thumbnail} alt="thumnail img"/>
            <Form.Label>책 제목</Form.Label><input type="text" value={title} name="title" onChange={onChangeValue}/>
            <Form.Label>저자</Form.Label><input type="text" value={authors} name="authors" onChange={onChangeValue}/>
            <Form.Label>출판사</Form.Label><input type="text" value={publisher} name="publisher" onChange={onChangeValue}/>
            <Form.Label>가격</Form.Label><input type="number" value={price} name="price" onChange={onChangeValue}/>
            <Form.Label>Url</Form.Label><input type="text" value={url} name="url" onChange={onChangeValue} />
            <Button variant="primary" type="submit">도서 추가</Button>
        </form>
    </Modal.Dialog></div>
    ;

    return ReactDOM.createPortal(renderModalContent, rootModal);
}

export default ModalComponent;