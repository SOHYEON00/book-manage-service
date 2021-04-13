import React from 'react';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';

interface Props {
    error?: string
};

const Auth = (props:Props) => {
    const {error} = props;

    const dispatch = useDispatch();

    const onGoogleClick = () => {
        dispatch({type: types.LOGIN_REQUEST});
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