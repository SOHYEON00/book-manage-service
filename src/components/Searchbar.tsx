import { SET_TEXT_REQUEST } from 'modules/types';
import React, { useCallback, useState } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';
import {searchFormStyle, searchInputTextStyle, btnStyle} from 'styleComponent';
import _ from 'lodash';


const Searchbar = () => {
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch();

    // text onChange Handler
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // console.log(value);
        setText(value);
        onDebounceChangeValue(value);
    };

    const onDebounceChangeValue = useCallback(
        _.debounce((value: string) => {
            dispatch({type: types.SET_TEXT_REQUEST, payload: value});
    }, 800),[]);

    
    // 검색 기능 submit handler
    const onSubmitText = (event:React.FormEvent)=> {
        event.preventDefault();
        // 검색 기능 위한 action dispatch
        dispatch({type: types.SET_TEXT_REQUEST, payload: text}); // db 검색
    }

    return(
        
        <Form inline onSubmit={onSubmitText} style={searchFormStyle}>
            <FormControl placeholder='책 제목' type='text' value={text} onChange={onChangeValue} style={searchInputTextStyle}/>
            <Button style={btnStyle} variant="outline-secondary" type="submit">검색</Button>
        </Form>
    );
};

export default Searchbar;