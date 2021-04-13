import React, { useCallback, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Button, FormControl, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';
import _ from 'lodash';


const Searchbar = () => {
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch();

    // 검색어 onChangeHandler
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
        onDebounceChangeValue(value); // 검색어 디바운싱: 입력이 멈춘 후 800ms이 지난 후 dispatch 동작
    };

    // (1)store에 검색어 저장(엔터or버튼 누르지 않은 경우)
    const onDebounceChangeValue = useCallback(
        _.debounce((value: string) => {
            dispatch({type: types.SET_TEXT_REQUEST, payload: value});
    }, 800),[]);

    
    // (2)store에 검색어 저장(엔터or버튼 누른 경우)
    const onSubmitText = (event:React.FormEvent)=> {
        event.preventDefault();
        dispatch({type: types.SET_TEXT_REQUEST, payload: text}); 
    }

    return(
        <Navbar style={{padding:'0'}}>
            <Form inline onSubmit={onSubmitText}>
                <FormControl placeholder='책 제목' type='text' value={text} onChange={onChangeValue} />
                <button type="submit">검색</button>
            </Form>
        </Navbar>
    );
};

export default Searchbar;