import { apiBookItemType } from 'propsTypes';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';
import {tdStyle} from 'styleComponent';
import { Button, Form, Modal } from 'react-bootstrap';

interface Props {
    book: apiBookItemType,
    modalHandler: any
};  
const AddBookModal = (prop:Props) => {
    const dispatch = useDispatch();
    const {book, modalHandler} = prop;
    const [title, setTitle] = useState(book.title);
    const [authors, setAuthors] = useState((book.authors).toString());
    const [publisher, setPublisher] = useState(book.publisher);
    const [price, setPrice] = useState(book.price);
    const [thumbnail, setThumbnail] = useState(book.thumbnail);
    const [url, setUrl] = useState(book.url);
    const [isbn, setIsbn] = useState(book.isbn);

    const onAddBookSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newBook = [title, publisher, authors, thumbnail, url, 'null', 'null', 'FALSE', 'FALSE', isbn];
        dispatch({ type: types.ADD_BOOK_REQUEST, params:newBook});
    };

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

    return (
        <tr>
            <td style={tdStyle} colSpan={8}>
                
            <Modal.Dialog>
                <form onSubmit={onAddBookSubmit}>
                    <h4>Add New Book Form</h4>
                    <img src={thumbnail} alt="thumnail img"/>
                    <Form.Label>책 제목</Form.Label><input type="text" value={title} name="title" onChange={onChangeValue}/>
                    <Form.Label>저자</Form.Label><input type="text" value={authors} name="authors" onChange={onChangeValue}/>
                    <Form.Label>출판사</Form.Label><input type="text" value={publisher} name="publisher" onChange={onChangeValue}/>
                    <Form.Label>가격</Form.Label><input type="number" value={price} name="price" onChange={onChangeValue}/>
                    <Form.Label>Url</Form.Label><input type="text" value={url} name="url" onChange={onChangeValue} />
                    <Button variant="primary" type="submit">도서 추가</Button>
                </form>
            </Modal.Dialog>
            </td>
        </tr>
    );
};

export default AddBookModal;