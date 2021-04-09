import { apiBookItemType } from 'propsTypes';
import React, { useState } from 'react';

interface Props {
    book: apiBookItemType,
    modalHandler: any
};  
const AddBookModal = (prop:Props) => {
    const {book, modalHandler} = prop;
    const [title, setTitle] = useState(book.title);
    const [authors, setAuthors] = useState((book.authors).toString());
    const [publisher, setPublisher] = useState(book.publisher);
    const [price, setPrice] = useState(book.price);

    const onAddBookSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { value } = event.target;
        console.log(value);
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
        }
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