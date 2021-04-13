import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Auth from './Auth';
import { userObjType } from 'propsTypes';
import MainComponent from './MainComponent';

interface Props {
    userObj: userObjType;
    error: any;
};

const AppRouter = (props:Props) => {
    const {userObj, error} = props;
    const [isHniner, setIsHniner] = useState(false);

    useEffect(() => {
        if(userObj.email !== undefined) {
            const emailDomain = (userObj.email).slice(-9);
            (emailDomain === 'hnine.com') ? setIsHniner(true) : setIsHniner(false);
        }
        
    }, [userObj]);

    return (
        <BrowserRouter>
            <Switch>
                {userObj.isLoggin ?  // true: 로그인한 경우 false: 로그인하지 않은 경우
                    <Route exact path='/'>
                        {/* 임직원 여부 파악 후, 임직원이면 입장*/}
                        { isHniner ? <MainComponent /> : <Auth error={'에이치나인 임직원이 아닙니다.'}/>}
                    </Route>
                    :
                    <Route exact path='/'>
                        <Auth />
                        {error &&  <p>로그인에 실패하였습니다. 다시 시도해주세요.</p>} {/* 로그인에 실패한 경우 에러 메시지 출력 */}
                    </Route>
                }
            </Switch>
        </BrowserRouter>
    );
}

export default AppRouter;