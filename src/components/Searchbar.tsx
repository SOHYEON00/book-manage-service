import React, { useState } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

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

    // text onChange Handler
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
    } 
    
    // 검색 기능 submit handler
    const onSubmitText = (event:React.FormEvent)=> {
        event.preventDefault();
        console.log(text);
        // api 검색
        // db 검색
    }

    return(
        
        <Form inline onSubmit={onSubmitText} style={formStyle}>
            <FormControl placeholder='책 제목' type='text' value={text} onChange={onChangeValue} style={inputTextStyle}/>
            <Button style={btnStyle} variant="outline-secondary" type="submit">검색</Button>
        </Form>
    );
};

export default Searchbar;