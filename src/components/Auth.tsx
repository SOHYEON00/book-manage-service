import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import * as types from 'modules/types';

const Auth = () => {
    const dispatch = useDispatch();

    const onGoogleClick = () => {
        dispatch({type: types.LOGIN_REQUEST});
    };

    return (
        <div>
            <button onClick={onGoogleClick} name='google' >
                Google 이메일로 로그인하기
            </button>
        </div>
    );
};

export default Auth;