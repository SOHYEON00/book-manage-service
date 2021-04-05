import { SET_TEXT_REQUEST } from 'modules/types';
import React, { useState } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';


const formStyle = {
    width: '20%',
    justifyContent: 'space-between',
};
const inputTextStyle = {
    width: '80%',
};
const btnStyle = {
    backgroundColor: '#fff',
    borderColor: '#ced4da',
};

const Searchbar = () => {
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch();

    // text onChange Handler
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
        dispatch({type: SET_TEXT_REQUEST, payload: value}); // 실시간 검색 기능위해 바로 action dispatch
    } 
    
    // 검색 기능 submit handler
    const onSubmitText = (event:React.FormEvent)=> {
        event.preventDefault();
        // 검색 기능 위한 action dispatch
        dispatch({type: types.SET_TEXT_REQUEST, payload: text}); // db 검색
    }

    return(
        
        <Form inline onSubmit={onSubmitText} style={formStyle}>
            <FormControl placeholder='책 제목' type='text' value={text} onChange={onChangeValue} style={inputTextStyle}/>
            <Button style={btnStyle} variant="outline-secondary" type="submit">검색</Button>
        </Form>
    );
};

export default Searchbar;