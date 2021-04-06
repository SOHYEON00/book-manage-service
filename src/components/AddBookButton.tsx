import React from 'react';
import {Button} from 'react-bootstrap';
import {btnStyle} from 'styleComponent';

const AddBookButton = () => {

    return (
        <Button style={btnStyle} variant="outline-secondary" type="submit" className='openModalButton'>도서 추가</Button>
    );
};

export default AddBookButton;