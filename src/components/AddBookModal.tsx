import { apiBookItemType } from 'propsTypes';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';

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
        const newBook = [title, publisher, authors, thumbnail, url, '', '', 'FALSE', 'FALSE', isbn];
        dispatch({ type: types.ADD_BOOK_REQUEST, params:newBook});
    };

    const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        console.log(value, name);
        switch(name) {
            case 'title':
                return setTitle(value);
            case 'authors':
                return setAuthors(value.toString());
            case 'publisher':
                return setPublisher(value);
            case 'price':
                return setPrice(parseInt(value));
            case 'thumbnail':
                return setThumbnail(value);
            case 'url':
                return setUrl(value);
            case 'isbn':
                return setIsbn(value);
        };
    };

    return (
        <div>
            <form onSubmit={onAddBookSubmit}>
                <input type="text" value={title} name="title" onChange={onChangeValue}/>
                <input type="text" value={authors} name="authors" onChange={onChangeValue}/>
                <input type="text" value={publisher} name="publisher" onChange={onChangeValue}/>
                <input type="number" value={price} name="price" onChange={onChangeValue}/>
                <input type="submit" value="추가"/>
            </form>
        </div>
    );
};

export default AddBookModal;