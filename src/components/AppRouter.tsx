import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Auth from './Auth';
import { userObjType } from 'modules/actions/user_action';
import MainComponent from './MainComponent';

interface Props {
    userObj: userObjType
};

const AppRouter = (props:Props) => {
    const {userObj} = props;

    return (
        <BrowserRouter>
            <Switch>
                {userObj.isLoggin ? 
                    <Route exact path='/'>
                        <MainComponent />
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