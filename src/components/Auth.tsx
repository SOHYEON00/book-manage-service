import React from 'react';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';

interface Props {
    error?: string;
};

const Auth = (props:Props) => {
    const {error} = props; // 임직원이 아닌 경우 error

    const dispatch = useDispatch();

    const onGoogleClick = () => {
        dispatch({type: types.LOGIN_REQUEST}); // 구글로그인
    };

    return (
        <div>
            <button onClick={onGoogleClick} name='google' >
                Google 이메일로 로그인하기
            </button>
            <h4>{error}</h4>
        </div>
    );
};

export default Auth;