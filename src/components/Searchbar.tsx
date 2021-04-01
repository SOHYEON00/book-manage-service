import React, { useState } from 'react';

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
        <form onSubmit={onSubmitText}>
            <input type='text' value={text} onChange={onChangeValue} placeholder='책 제목'/>
            <input type='submit' value='검색' />
        </form>
    );
};

export default Searchbar;