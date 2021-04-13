import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Auth from './Auth';
import { userObjType } from 'propsTypes';
import MainComponent from './MainComponent';

interface Props {
    userObj: userObjType
};

const AppRouter = (props:Props) => {
    const {userObj} = props;
    const [isHniner, setIsHniner] = useState(false);

    useEffect(() => {
        if(userObj.email !== undefined) {
            
            const emailDomain = (userObj.email).slice(-9);
            console.log(emailDomain);

            (emailDomain === 'hnine.com') ? setIsHniner(true) : setIsHniner(false);
        }
        
    }, [userObj]);

    return (
        <BrowserRouter>
            <Switch>
                {userObj.isLoggin ? 
                    <Route exact path='/'>
                        { isHniner ? <MainComponent /> : <Auth error={'에이치나인 임직원이 아닙니다.'}/>}
                        
                    </Route>
                    :
                    <Route exact path='/'>
                        <Auth />
                    </Route>
                }
            </Switch>
        </BrowserRouter>
    );
}

export default AppRouter;